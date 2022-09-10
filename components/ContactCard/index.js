/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Icon, LinkButton} from "../"
import Image from 'next/image'
import { useTranslation } from 'next-i18next';

import styles from './ContactCard.module.scss';

export const ContactCard = (props) => { 
  const { className, type, src } = props;

  const { t } = useTranslation('common');
  
  return (
    <div className={styles['contact-card']}>
      <div className={styles['directions']}>
        <div className={styles['map-btn']}><span>Yol Tarifi</span> <Icon icon={'map'} /></div>
        <Image src={src} width={'100%'} height={'100%'} layout={'responsive'} alt='' /> 
        <div className={styles['text']}>Showroom / Bakırköy Merkez Şube</div>
      </div>
      <div className={styles['information']}>
        <div className={styles['address']}>
          <h2>Adres</h2>
          <span>Kartaltepe Mah. Aksu Cad. No:5/1 Bakırköy/İstanbul</span>
        </div>
        <div className={styles['phone']}>
          <div className={styles['left']}>
            <h2>Telefon</h2>
            <span>+90 (212) 542 40 61</span>
          </div>
          <div className={styles['right']}>
            <h2>Fax</h2>
            <span>+90 (212) 542 40 62</span>
          </div>
        </div>
        <div className={styles['email']}>
          <div className={styles['left']}>
            <h2>E-mail</h2>
            <span>info@keskinyapimarket.com.tr</span>
          </div>
          <div className={styles['right']}>
            <Icon icon={'mail'} />
          </div>
        </div>
      </div>
    </div>
  )
}

ContactCard.propTypes = {
  src: PropTypes.string,
  type: PropTypes.string
};

ContactCard.defaultProps = {
	src: "/images/dummy/contact.jpg",
}