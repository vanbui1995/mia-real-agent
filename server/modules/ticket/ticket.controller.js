import httpStatus from 'http-status';
import _get from 'lodash/get';
import BaseController from '../base/base.controller';
import TicketService from './ticket.service';
import APIError, { ERROR_MESSAGE } from '../../utils/APIError';

const emptyObjString = '{}';

class TicketController extends BaseController {
  constructor() {
    super(TicketService);
  }

  insert = async (req, res) => {
    try {
      const { user, body: data } = req;

      if (!user) {
        throw new APIError(ERROR_MESSAGE.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }

      const { _id } = user;
      const condition = { owner: _id };
      const totalCount = await this.service.countDocument(condition);

      const newData = {
        ...data,
        ticketId: totalCount + 1,
        owner: _id,
      };

      const result = await this.service.insert(newData);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  getAll = async (req, res) => {
    try {
      const {
        user, body: {
          skip, limit, sort, ...params
        },
      } = req;

      if (!user) {
        throw new APIError(ERROR_MESSAGE.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }
      const { _id } = user;

      const option = { skip, limit };
      if (sort) {
        const sortObj = JSON.parse(sort);
        option.sort = sortObj;
      }

      const query = JSON.parse(_get(params, 'query', emptyObjString));
      const newQuery = {
        ...query,
        owner: _id,
      };

      console.log('newQuery', newQuery);

      const result = await this.service.getAll(newQuery, option);
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return this.handleError(res, error);
    }
  }
}

export default new TicketController(TicketService);
