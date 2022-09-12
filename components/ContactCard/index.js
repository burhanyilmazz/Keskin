/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Icon} from "../"
import Image from 'next/image'
import { useTranslation } from 'next-i18next';

import styles from './ContactCard.module.scss';

export const ContactCard = (props) => { 
  const { data, onClick } = props;

  const handleOnClick = (coord) => {
    onClick && onClick(coord);
  }

  const { t } = useTranslation('common');
  
  return (
    <div className={styles['contact-card']}>
      <div className={styles['directions']}>
        <div className={styles['map-btn']} onClick={(event) => handleOnClick(data.coordinant)}><span>{t('DIRECTIONS')}</span> <Icon icon={'map'} /></div>
        <Image src={data.image} width={'100%'} height={'100%'} layout={'responsive'} alt='' /> 
        <div className={styles['text']}>{data.title}</div>
      </div>
      <div className={styles['information']}>

        {data.address && <div className={classNames(styles['item'], styles['item--borderless'])}>
          <div>
            <h2>{t('FORM.ADDRESS')}</h2>
            <span>{data.address}</span>
          </div>
        </div> }

        {data.phone && <div className={styles['item']}>
          <div>
            <h2>{t('FORM.PHONE')}</h2>
            <span>{data.phone}</span>
          </div>
          <div>
            <h2>{t('FORM.FAX')}</h2>
            <span>{data.fax}</span>
          </div>
        </div> }

        { data.email && <div className={styles['item']}>
          <div>
            <h2>{t('FORM.EMAIL')}</h2>
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
  onClick: PropTypes.func,
  data: PropTypes.object
};