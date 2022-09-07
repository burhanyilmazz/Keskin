/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import Image from 'next/image'

import styles from './TopBar.module.scss';
import { Breadcrumb } from '../';

export const TopBar = (props) => { 
  const { img, title, breadcrumbs } = props;
  
  return (
    <div className={styles['topbar']}>
      <div className={styles['image']}><Image src={img}  layout={'fill'} /></div>
      <div className={styles['content']}>
        <div className='container'>
          <h1>{title}</h1>
          <Breadcrumb data={breadcrumbs} />
        </div>
      </div>
    </div>
  )
}

TopBar.propTypes = {
	img: PropTypes.string,
  title: PropTypes.string,
  breadcrumbs: PropTypes.array
};