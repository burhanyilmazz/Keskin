import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './SearchIcon.module.scss';

export const SearchIcon = (props) => { 
  const { onClick, transparent, isOpen } = props;
  const [isChecked, setIsChecked] = useState(isOpen);

  const handleClick = () => {
    setIsChecked(!isChecked)
    onClick && onClick(!isChecked);
  }

  useEffect(() => {
    setIsChecked(isOpen)
  }, [isOpen])
  
  return (
    <div className={classNames(styles['search-icon'], {[styles['active']] : isChecked, [styles['search-icon--transparent']] : transparent } )} onClick={handleClick}>
      <div>
        <span className={classNames({[styles['close']] : isChecked} )}></span>
      </div>
    </div>
  )
}

SearchIcon.propTypes = {
	onClick: PropTypes.func,
  transparent: PropTypes.bool,
  isOpen: PropTypes.bool
};

SearchIcon.defaultProps = {
	isOpen: false
}
