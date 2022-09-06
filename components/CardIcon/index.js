/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Icon} from ".."
import styles from './CardIcon.module.scss';

export const CardIcon = (props) => { 
  const { className, vertical, title, icon, desc } = props;
  
  return (
      <div className={classNames(styles['card-icon'], {[styles['card-icon--vertical']] : vertical }, className)}>
        <div className={styles['icon']}>
          <Icon icon={icon} />
        </div>
        <div className={styles['content']}>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </div>
  )
}

CardIcon.propTypes = {
	className: PropTypes.string,
	vertical: PropTypes.bool,
	icon: PropTypes.string,
	title: PropTypes.string,
	desc: PropTypes.string,
};