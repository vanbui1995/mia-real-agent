import httpStatus from 'http-status';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import moment from 'moment';
import UserModel from '../user/user.model';
import UserService from '../user/user.service';
import check from '../../utils/validate';
import { VALIDATION_TYPE } from '../../../common/enums';
import { hashFunc } from '../../utils/bcrypt';
// import {
//   sendUserRegisterSuccessMail,
// } from '../../mail';
import Logger from '../../logger';

const loginErrorMsg = 'Something is wrong';

class AuthController {
  handlePassportStrategy(accessToken, refreshToken, profile, done) {
    const condition = { $or: [], deletedAt: null };
    let email;
    const provider = {
      id: profile.id,
      name: profile.provider,
    };
    if (_.has(profile, 'emails.0.value')) {
      email = _.get(profile, 'emails.0.value');
      condition.$or.push({ email });
    }

    condition.$or.push({
      provider: {
        $elemMatch: provider,
      },
    });

    UserModel.findOne(condition).exec(async (err, user) => {
      if (err) {
        return done(err, false, { message: loginErrorMsg });
      }

      if (!user) {
        const newUser = {
          verifiedAt: moment().utc().format(),
          provider: [provider],
        };

        if (email) {
          newUser.email = email;
        }
        const {
          name: { familyName, givenName },
          gender,
        } = profile;
        newUser.profile = {
          firstName: givenName,
          lastName: familyName,
          gender,
        };

        const userDoc = await UserService.insert(newUser);
        const { _id } = userDoc;
        const token = jwt.sign({ _id }, process.env.SECRET_KEY_JWT);
        userDoc.set({ token });
        await userDoc.save();

        if (email) {
          // sendUserRegisterSuccessMail(user);
        }
        return done(false, userDoc, { message: 'Logged In Successfully' });
      }
      // update user if user doesn't have email or provider
      const updateUser = {};
      if (!user.email && email) {
        updateUser.email = email;
      }

      if (!user.provider) {
        updateUser.provider = [provider];
      }

      // check the provider is exist in user.provider
      const providerExist = () => _.findIndex(user.provider, item => item.id === _.get(profile, 'id'))
        === -1;

      if (user.provider && providerExist()) {
        // update the user.provider array
        updateUser.provider = _.union(user.provider, [provider]);
      }

      if (_.keys(updateUser).length > 0) {
        _.assign(user, updateUser);

        await user.save();
      }

      return done(false, user, { message: 'Logged In Successfully' });
    });
  }

  async register(req, res) {
    try {
      const { data } = req.body;
      const {
        email, password, username, role, profile,
      } = data;
      await check(email, VALIDATION_TYPE.EMAIL);
      await check(password, VALIDATION_TYPE.PASSWORD);
      const hash = await hashFunc(password);
      const user = {
        email,
        password: hash,
        role,
        username,
        profile,
      };
      const userDoc = await UserService.insert(user);
      const { _id } = userDoc;
      const token = jwt.sign({ _id }, process.env.SECRET_KEY_JWT);
      userDoc.set({ token });
      await userDoc.save();
      UserService.sendVericationEmail(email);

      return res.status(httpStatus.OK).json(userDoc);
    } catch (error) {
      Logger.error(error.message);
      const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
      return res.status(status).send(error);
    }
  }

  // by returning an anonymous function, this will hurt the performance
  // REFACTOR NEEDED
  handlePassportLocalLogin = (req, res) => async (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message:
          info && info.message ? info.message : loginErrorMsg,
      });
    }

    const {
      _id, email, username, role, verifiedAt, token,
    } = user;
    const userProfile = await UserService.getUserProfile(user);
    return res
      .status(200)
      .json({
        token, userId: _id, email, username, role, verifiedAt, userProfile,
      });
  }

  // this controller is used for login with email and password
  login = (req, res) => {
    passport.authenticate(
      'local',
      { session: false },
      this.handlePassportLocalLogin(req, res),
    )(req, res);
  }

  // by returning an anonymous function, this will hurt the performance
  // REFACTOR NEEDED
  handlePassportOAuthLogin = (req, res) => async (err, user, info) => {
    if (err) {
      return res.status(400).json({
        message:
          info && info.message ? info.message : loginErrorMsg,
      });
    }

    const {
      _id, email, verifiedAt, token,
    } = user;
    return res
      .status(200)
      .redirect(`/login/callback/${token}/${_id}/${email}/${Number(verifiedAt)}`);
  }

  // this controller is used by google login
  loginWithGoogleCallback = (req, res) => {
    passport.authenticate(
      'google',
      {
        session: false,
      },
      this.handlePassportOAuthLogin(req, res),
    )(req, res);
  }

  // this controller is used by facebook login
  loginWithFacebookCallback = (req, res) => {
    passport.authenticate(
      'facebook',
      {
        session: false,
      },
      this.handlePassportOAuthLogin(req, res),
    )(req, res);
  }

  sendVericationEmail = async (req, res) => {
    try {
      const {
        params: { email },
      } = req;
      await UserService.sendVericationEmail(email);
      return res.status(httpStatus.OK).send();
    } catch (error) {
      error.status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
      return res.status(error.status).send({
        error,
      });
    }
  }

  verifyAccount = async (req, res) => {
    try {
      const {
        params: { token },
      } = req;
      await UserService.verifyAccount(token);
      return res.status(httpStatus.OK).redirect('/login');
    } catch (error) {
      error.status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
      return res.status(error.status).send({
        error,
      });
    }
  }
}

export default new AuthController();
