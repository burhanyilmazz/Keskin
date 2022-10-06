import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {LinkButton, FormInput, Modal, Icon} from "../"
import * as Yup from 'yup'
import {useFormik} from 'formik'

import { useTranslation } from 'next-i18next';

import styles from './Newsletter.module.scss';

export const Newsletter = (props) => { 
  const { className, title, type, text } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const { t } = useTranslation('common');

  const newsletterSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('VALIDATION.FORMAT'))
      .required(t('VALIDATION.GENERAL')),
  })

  const [newsletter] = useState({
    email: '',
  })

  const formik = useFormik({
    initialValues: newsletter,
    validationSchema: newsletterSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      setModalOpen(true)
    },
  })
  
  return (
    <>
      <div className="container">
        <div className={classNames(styles['newsletter'], {[styles['newsletter--hr']]: type === 'joinUs'}, className)}>
          <form className={styles['content']} onSubmit={formik.handleSubmit} noValidate>
            <h3>{title}</h3>
            <p>{text}</p>
            {type === 'subscription' && <FormInput 
                                          field={t('FORM.EMAIL')} 
                                          name={'email'} 
                                          type="email" 
                                          required={true}
                                          errorMessage={formik.errors.email}
                                          {...formik.getFieldProps('email')}
                                          className={classNames({'is-invalid': formik.touched.email && formik.errors.email})}
                                        /> }
            {type === 'subscription' &&<span>{t('AGREEMENT_INFO')}</span>}
            {type === 'joinUs' && <LinkButton text={t('MORE_INFO')} href='/career' /> }
            {type === 'subscription' && <LinkButton text={t('NEWSLETTER_BUTTON')} button transparent />}
          </form>
        </div>
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

Newsletter.propTypes = {
	title: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string
};