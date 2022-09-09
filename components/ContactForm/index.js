import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import {FormInput, FormTextarea, LinkButton, FileInput} from "../"
import styles from './ContactForm.module.scss';

export const ContactForm = (props) => { 
  const { className, title, type } = props;

  const { t } = useTranslation('common');
  
  return (
    <div className={classNames(styles['contact-form'], styles[className])}>
      <h3>{title}</h3>
      <form>
        <div className='form-group'>
          <FormInput field={t('FORM.NAME')}  />
          <FormInput field={t('FORM.EMAIL')}  />
        </div>
        <div className='form-group'>
          <FormInput field={t('FORM.PHONE')} />
          {type === 'contact' && <FormInput field={t('FORM.SUBJECT')} /> }
          {type === 'hr' && <FileInput field={t('FORM.CHOOSE')} /> }
        </div>
        <div className='form-group'>
          <FormTextarea field={t('FORM.MESSAGE')} rows={5} />
        </div>
        <p>{t('AGREEMENT_INFO')}</p>
        <LinkButton className={styles['send']} button text={t('SEND')}/>
      </form>
		</div>
  )
}

ContactForm.propTypes = {
	title: PropTypes.string,
  type: PropTypes.string
};