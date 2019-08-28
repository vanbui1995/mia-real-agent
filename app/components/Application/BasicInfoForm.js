import React, { Component } from 'react';
import {
  Row, Col, Form,
} from 'antd';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { func } from 'prop-types';
import FormInput from '../FormInput/FormInput';
import { toI18n } from '../../utils/func-utils';
import { ButtonCancel, ButtonSubmit } from '../../stylesheets/Button.style';
import { ActionFormRegister } from './styles';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  postcode: '',
  address: '',
  phoneNumber: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required('Required'),
  lastName: Yup.string().trim().required('Required'),
  email: Yup.string().email('Invalid Email').trim().required('Required'),
  country: Yup.string().trim().required('Required'),
  postcode: Yup.string().trim().required('Required'),
  address: Yup.string().trim().required('Required'),
  phoneNumber: Yup.string().trim().required('Required'),
});

export class BasicInfoForm extends Component {
  static propTypes = {
    onSubmit: func.isRequired,
    onCancel: func.isRequired,
  }

  renderRegisterBtn = () => (
    <ActionFormRegister>
      <ButtonCancel
        onClick={this.handleCancel}
      >
        <i className="mia-chevron-left" />
        <span>{toI18n('FORM_BACK')}</span>
      </ButtonCancel>
      <ButtonSubmit>
        <span>{toI18n('FORM_NEXT')}</span>
        <i className="mia-chevron-right" />
      </ButtonSubmit>
    </ActionFormRegister>
  )

  handleCancel = () => {
    const { onCancel } = this.props;
    console.log('ad');
    onCancel();
  }

  handleSubmit = (values) => {
    const { onSubmit } = this.props;
    onSubmit(values);
  }

  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="firstName"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_FIRST_NAME')}
                  login={1}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="lastName"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_LASTNAME')}
                  login={1}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="email"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_EMAIL')}
                  login={1}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="phoneNumber"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_PHONE')}
                  login={1}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={12} xs={24}>
                <FormInput
                  name="country"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_COUNTRY')}
                  login={1}
                />
              </Col>
              <Col sm={12} xs={24}>
                <FormInput
                  name="postcode"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_POSTCODE')}
                  login={1}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={24} xs={24}>
                <FormInput
                  name="address"
                  type="text"
                  label={toI18n('APPLICATION_BASIC_INFO_FORM_ADDRESS')}
                  login={1}
                />
              </Col>
            </Row>
            <Row gutter={32}>
              <Col sm={24} xs={24}>
                {this.renderRegisterBtn()}
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}

export default BasicInfoForm;
