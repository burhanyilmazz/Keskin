import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Hamburger.module.scss';

export const Hamburger = (props) => { 
  const { onClick } = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked)
    onClick && onClick(!isChecked);
  }
  
  return (
    <div className={classNames(styles['menu-icon'], {[styles['active']] : isChecked } )} onClick={handleClick}>
      <div>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

Hamburger.propTypes = {
	onClick: PropTypes.func,
};
