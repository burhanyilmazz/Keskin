import Head from 'next/head'
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import * as Yup from 'yup'
import {useFormik} from 'formik'
//import Recaptcha from "react-recaptcha";

import {API_URL} from '../../utils/env'

import {FormInput, FormTextarea, LinkButton, FileInput, Modal, Icon} from "../"
import styles from './ContactForm.module.scss';

export const ContactForm = (props) => { 
  const { className, title, type, pid } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const { i18n } = useTranslation('common');

  const contactSchema = Yup.object().shape({
    email: Yup.string()
      .email(i18n.language === 'tr' ? 'Geçerli bir format girin.' : 'Wrong format.')
      .required(i18n.language === 'tr' ? 'Bu alan boş bırakılamaz.' : 'This field cannot be left blank.'),
    namesurname: Yup.string().required(i18n.language === 'tr' ? 'Bu alan boş bırakılamaz.' : 'This field cannot be left blank.'),
    recaptcha: Yup.string().required(i18n.language === 'tr' ? 'Bu alan boş bırakılamaz.' : 'This field cannot be left blank.'),
  })

  const [contact] = useState({
    namesurname: '',
    email: '',
    phone: '',
    subject: '',
    cv: {},
    message: '',
    product_id: pid,
    recaptcha: ''
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

      if (type == 'hr') {
        res =  await fetch(`${API_URL}/hr_form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: values
        }).then(r => r.json()).then(data => data);
      }

      if (res.Success) {
        setModalOpen(true)
      }
    },
  })

  const verifyCallback = (response) => formik.setFieldValue('recaptcha', response);

  useEffect(() => {
    window.onloadCallback = () => {
      try {
        window.grecaptcha.render('captcha', {
          'sitekey' : '6LdUkLkiAAAAAK4MXrk7MXmUbxhiEWoUV8C8GxQ7',
          'callback' : verifyCallback,
        });
      } catch (error) {
        console.log(error)
      }
    };
  }, [])
  
  
  return (
    <>
      <Head>
        <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>
      </Head>

      <div className={classNames(styles['contact-form'], styles[className])}>
        <h3>{title}</h3>
        <form onSubmit={formik.handleSubmit} noValidate encType="multipart/form-data">
          <div className='form-group'>
            <FormInput 
              field={i18n.language === 'tr' ? 'Adınız Soyadınız' : 'Name Surname'}
              name={'namesurname'}
              required={true}
              errorMessage={formik.errors.namesurname}
              {...formik.getFieldProps('namesurname')}
              className={classNames({'is-invalid': formik.touched.namesurname && formik.errors.namesurname})}
            />
            <FormInput 
              field={i18n.language === 'tr' ? 'E-Posta' : 'E-Mail'} 
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
              field={i18n.language === 'tr' ? 'Telefon' : 'Phone'}
              name={'phone'}
              {...formik.getFieldProps('phone')}
            />
            {type === 'contact' && <FormInput 
                                      field={i18n.language === 'tr' ? 'Konu' : 'Subject'}
                                      name={'subject'}
                                      {...formik.getFieldProps('subject')}
                                    /> }
            {type === 'hr' && <FileInput 
                                field={i18n.language === 'tr' ? 'Dosya Seçin' : 'Choose File'}
                                name={'cv'}
                                onChange={(event) => formik.setFieldValue('cv', event.currentTarget.files[0])}
                                accept="image/*,.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              /> }
          </div>
          <div className='form-group'>
            <FormTextarea 
              field={i18n.language === 'tr' ? 'Mesaj' : 'Message'} 
              rows={5}
              name={'message'}
              {...formik.getFieldProps('message')}
            />
          </div>
          <p>{i18n.language === 'tr' ? 'Gönder butonuna bastığınızda Kişisel verilerin korunması kapsamında aydınlatma metnini kabul etmiş olursunuz.' : 'By clicking the Sign-Up button, you accept the clarification text within the scope of the protection of personal data.'}</p>
          <div className='form-group-buttons'>
            <div className={classNames('captcha', {'is-invalid': formik.touched.recaptcha && formik.errors.recaptcha})}>
              <div id="captcha"></div>
              <pre>{formik.errors.recaptcha}</pre>
            </div>
            
            <LinkButton className={styles['send']} button text={i18n.language === 'tr' ? 'Gönder' : 'Send'}/>
          </div>
        </form>
      </div>

      {modalOpen && <Modal onClose={() => setModalOpen(false)}>
          <div className='success-modal'>
            <div className='success-modal__icon'><Icon icon='check' /></div>
            <div className='success-modal__title'>{i18n.language === 'tr' ? 'Tebrikler' : 'Congratulations'}</div>
            <div className='success-modal__text'>{i18n.language === 'tr' ? 'Kaydınız başarılı bir şekilde gerçekleşti.' : 'Your registration has been successful. You will be contacted as soon as possible.'}</div>
            <div className='success-modal__desc'>{i18n.language === 'tr' ? 'Kaydınız veri tabanımıza başarılı bir şekilde gerçekleşti. Teşekkürler.' : 'Your registration has been successful in our database. Thank you.'}</div>
          </div>
        </Modal> }
    </>
  )
}

ContactForm.propTypes = {
	title: PropTypes.string,
  type: PropTypes.string
};