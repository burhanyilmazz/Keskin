import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {LinkButton, FormInput, Modal, Icon} from "../"
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {API_URL} from '../../utils/env'

import { useTranslation } from 'next-i18next';

import styles from './Newsletter.module.scss';

export const Newsletter = (props) => { 
  const { className, title, type, text } = props;
  const [modalOpen, setModalOpen] = useState(false);

  const { i18n } = useTranslation('common');

  const career = i18n.language === 'tr' ? '/kariyer' : '/career'

  const newsletterSchema = Yup.object().shape({
    email: Yup.string()
      .email(i18n.language === 'tr' ? 'Geçerli bir format girin.' : 'Wrong format.')
      .required(i18n.language === 'tr' ? 'Bu alan boş bırakılamaz.' : 'This field cannot be left blank.'),
  })

  const [newsletter] = useState({
    email: '',
  })

  const formik = useFormik({
    initialValues: newsletter,
    validationSchema: newsletterSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      const newsletter =  await fetch(`${API_URL}/bulten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(r => r.json()).then(data => data);

      if (newsletter.Success) setModalOpen(true)
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
                                          field={i18n.language === 'tr' ? 'E-Posta' : 'E-Mail'} 
                                          name={'email'} 
                                          type="email" 
                                          required={true}
                                          errorMessage={formik.errors.email}
                                          {...formik.getFieldProps('email')}
                                          className={classNames({'is-invalid': formik.touched.email && formik.errors.email})}
                                        /> }
            {type === 'subscription' &&<span>{i18n.language === 'tr' ? 'Üye Olun Butonuna bastığınızda Kişisel verilerin korunması kapsamında aydınlatma metnini kabul etmiş olursunuz.' : 'By clicking the Sign-Up button, you accept the clarification text within the scope of the protection of personal data.'}</span>}
            {type === 'joinUs' && <LinkButton text={i18n.language === 'tr' ? 'Daha Fazla Bilgi' : 'Detail'} href={career} locale /> }
            {type === 'subscription' && <LinkButton text={i18n.language === 'tr' ? 'Kaydol' : 'Subscribe'} button transparent />}
          </form>
        </div>
      </div>

      {modalOpen && <Modal onClose={() => setModalOpen(false)}>
          <div className='success-modal'>
            <div className='success-modal__icon'><Icon icon='check' /></div>
            <div className='success-modal__title'>{i18n.language === 'tr' ? 'Başarılı' : 'Success'}</div>
            <div className='success-modal__text'>{i18n.language === 'tr' ? 'Kaydınız başarılı bir şekilde gerçekleşti. En kısa sürede sizinle irtibata geçilecektir.' : 'Your registration has been successful. You will be contacted as soon as possible.'}</div>
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