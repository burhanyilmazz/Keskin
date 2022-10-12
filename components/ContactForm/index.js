import { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {API_URL} from '../../utils/env'

import {FormInput, FormTextarea, LinkButton, FileInput, Modal, Icon} from "../"
import styles from './ContactForm.module.scss';

export const ContactForm = (props) => { 
  const { className, title, type, pid } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const { t } = useTranslation('common');

  const contactSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('VALIDATION.FORMAT'))
      .required(t('VALIDATION.GENERAL')),
    namesurname: Yup.string()
      .required(t('VALIDATION.GENERAL')),
  })

  const [contact] = useState({
    namesurname: '',
    email: '',
    phone: '',
    subject: '',
    cv: {},
    message: '',
    product_id: pid
  })

  const formik = useFormik({
    initialValues: contact,
    validationSchema: contactSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      let res;

      if (type == 'contact') {
        res =  await fetch(`${API_URL}/contact_form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }).then(r => r.json()).then(data => data);
      }

      if (type == 'product') {
        res =  await fetch(`${API_URL}/product_info_form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }).then(r => r.json()).then(data => data);
      }

      console.log(res)

      if (res.Success) {
        setModalOpen(true)
      }
    },
  })
  
  return (
    <>
      <div className={classNames(styles['contact-form'], styles[className])}>
        <h3>{title}</h3>
        <form onSubmit={formik.handleSubmit} noValidate encType="multipart/form-data">
          <div className='form-group'>
            <FormInput 
              field={t('FORM.NAME')}
              name={'namesurname'}
              required={true}
              errorMessage={formik.errors.namesurname}
              {...formik.getFieldProps('namesurname')}
              className={classNames({'is-invalid': formik.touched.namesurname && formik.errors.namesurname})}
            />
            <FormInput 
              field={t('FORM.EMAIL')} 
              name={'email'} 
              type="email" 
              required={true}
              errorMessage={formik.errors.email}
              {...formik.getFieldProps('email')}
              className={classNames({'is-invalid': formik.touched.email && formik.errors.email})}
            />
          </div>
          <div className='form-group'>
            <FormInput 
              field={t('FORM.PHONE')}
              name={'phone'}
              {...formik.getFieldProps('phone')}
            />
            {type === 'contact' && <FormInput 
                                      field={t('FORM.SUBJECT')}
                                      name={'subject'}
                                      {...formik.getFieldProps('subject')}
                                    /> }
            {type === 'hr' && <FileInput 
                                field={t('FORM.CHOOSE')}
                                name={'cv'}
                                onChange={(event) => formik.setFieldValue('cv', event.currentTarget.files[0])}
                                accept="image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              /> }
          </div>
          <div className='form-group'>
            <FormTextarea 
              field={t('FORM.MESSAGE')} 
              rows={5}
              name={'message'}
              {...formik.getFieldProps('message')}
            />
          </div>
          <p>{t('AGREEMENT_INFO')}</p>
          <LinkButton className={styles['send']} button text={t('SEND')}/>
        </form>
      </div>

      {modalOpen && <Modal onClose={() => setModalOpen(false)}>
          <div className='success-modal'>
            <div className='success-modal__icon'><Icon icon='check' /></div>
            <div className='success-modal__title'>{t('MODAL.TITLE')}</div>
            <div className='success-modal__text'>{t('MODAL.TEXT')}</div>
          </div>
        </Modal> }
    </>
  )
}

ContactForm.propTypes = {
	title: PropTypes.string,
  type: PropTypes.string
};