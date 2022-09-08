import PropTypes from 'prop-types';
import classNames from 'classnames';
import {LinkButton, FormInput} from "../"
import styles from './Newsletter.module.scss';

export const Newsletter = (props) => { 

  const { className, title, type, text } = props;
  
  return (
    <div className="container">
      <div className={classNames(styles['newsletter'], {[styles['newsletter--bg']]: type === 'joinUs'}, className)}>
        <div className={styles['content']}>
          <h3>{title}</h3>
           <p>{text}</p>
          {type === 'subscription' && <FormInput field='E-posta adresiniz'  /> }
          {type === 'subscription' &&<span>Üye Olun Butonuna bastığınızda Kişisel verilerin korunması kapsamında aydınlatma metnini kabul etmiş olursunuz.</span>}
          {type === 'joinUs' && <LinkButton text={'Daha Fazla Bilgi'} button /> }
          {type === 'subscription' && <LinkButton text={'Bültene Kaydol'} button transparent />}
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