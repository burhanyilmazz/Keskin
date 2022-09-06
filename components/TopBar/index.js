/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image'

import styles from './TopBar.module.scss';

export const TopBar = (props) => { 
  const { img, title, breadcrumbs } = props;
  
  return (
      <div className={styles['topbar']}>
        <div className='container'>
          topbar
        </div>
      </div>
  )
}

TopBar.propTypes = {
	img: PropTypes.string,
  title: PropTypes.string,
  breadcrumbs: PropTypes.array
};

TopBar.defaultProps = {
	transparent: false
}