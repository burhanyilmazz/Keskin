/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Icon} from "../"
import Image from 'next/image'
import { useTranslation } from 'next-i18next';

import styles from './ContactCard.module.scss';

export const ContactCard = (props) => { 
  const { data } = props;

  const { i18n } = useTranslation('common');
  
  return (
    <div className={styles['contact-card']}>
      <div className={styles['directions']}>
        <a 
          href={`https://www.google.com/maps/dir//${data.coordinate.lat},${data.coordinate.lng}`} 
          target={'_blank'} 
          rel="noreferrer" 
          className={styles['map-btn']}
        >
          <span>{i18n.language === 'tr' ? 'Yol Tarifi' : 'Directions'}</span> <Icon icon={'map'} />
        </a>
        <Image src={data.image} width={'100%'} height={'100%'} layout={'responsive'} alt='' /> 
        <div className={styles['text']}>{data.title}</div>
      </div>
      <div className={styles['information']}>

        {data.address && <div className={classNames(styles['item'], styles['item--borderless'])}>
          <div>
            <h2>{i18n.language === 'tr' ? 'Adres' : 'Address'}</h2>
            <span>{data.address}</span>
          </div>
        </div> }

        {data.phone && <div className={styles['item']}>
          <div>
            <h2>{i18n.language === 'tr' ? 'Telefon' : 'Phone'}</h2>
            <span>{data.phone}</span>
          </div>
          <div>
            <h2>{i18n.language === 'tr' ? 'Faks' : 'Fax'}</h2>
            <span>{data.fax}</span>
          </div>
        </div> }

        { data.email && <div className={styles['item']}>
          <div>
            <h2>{i18n.language === 'tr' ? 'E-posta' : 'E-mail'}</h2>
            <span>{data.email}</span>
          </div>
          <div>
            <Icon icon={'mail'} />
          </div>
        </div> }
      </div>
    </div>
  )
}

ContactCard.propTypes = {
  data: PropTypes.object
};