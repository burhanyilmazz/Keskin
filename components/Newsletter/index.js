import PropTypes from 'prop-types';
import classNames from 'classnames';
import {LinkButton, FormInput} from "../"

import { useTranslation } from 'next-i18next';

import styles from './Newsletter.module.scss';

export const Newsletter = (props) => { 
  const { className, title, type, text } = props;

  const { t } = useTranslation('common');
  
  return (
    <div className="container">
      <div className={classNames(styles['newsletter'], {[styles['newsletter--hr']]: type === 'joinUs'}, className)}>
        <div className={styles['content']}>
          <h3>{title}</h3>
          <p>{text}</p>
          {type === 'subscription' && <FormInput field={t('FORM.EMAIL')} name={'email'} /> }
          {type === 'subscription' &&<span>{t('AGREEMENT_INFO')}</span>}
          {type === 'joinUs' && <LinkButton text={t('MORE_INFO')} href='/career' /> }
          {type === 'subscription' && <LinkButton text={t('NEWSLETTER_BUTTON')} button transparent />}
        </div>
      </div>
    </div>
  )
}

Newsletter.propTypes = {
	title: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string
};