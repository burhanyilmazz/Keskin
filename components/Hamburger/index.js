import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Hamburger.module.scss';

export const Hamburger = (props) => { 
  const { onClick, transparent, isOpen, isCloseImportant } = props;
  const [isChecked, setIsChecked] = useState(isOpen);

  const handleClick = () => {
    setIsChecked(!isChecked)
    onClick && onClick(!isChecked);
  }

  useEffect(() => {
    setIsChecked(isOpen)
  }, [isOpen])
  
  return (
    <div className={classNames(styles['menu-icon'], {[styles['active']] : isChecked, [styles['menu-icon--transparent']] : transparent, [styles['important']] : isCloseImportant }, 'menu-sticky' )} onClick={handleClick}>
      <div>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

Hamburger.propTypes = {
	onClick: PropTypes.func,
  transparent: PropTypes.bool,
  isOpen: PropTypes.bool,
  isCloseImportant: PropTypes.bool,
};

Hamburger.defaultProps = {
	isOpen: false,
	isCloseImportant: false,
}
