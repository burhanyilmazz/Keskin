/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';

import styles from './TopBar.module.scss';
import { Breadcrumb } from '../';
import classNames from 'classnames';

export const TopBar = (props) => { 
  const { img, title, breadcrumbs } = props;
  
  return (
    <div className={classNames(styles['topbar'], {[styles['topbar--nonimg']]: !img})}>
      { img && <div className={styles['image']}><img src={img} alt='' /></div> }
      <div className={styles['content']}>
        <div className='container'>
          <h1>{title}</h1>
          {breadcrumbs && <Breadcrumb data={breadcrumbs} /> }
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