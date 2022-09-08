/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';

import styles from './TopBar.module.scss';
import { Breadcrumb } from '../';

export const TopBar = (props) => { 
  const { img, title, breadcrumbs } = props;
  
  return (
    <div className={styles['topbar']}>
      <div className={styles['image']}><img src={img} alt='' /></div>
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