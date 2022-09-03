import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Icon} from "../"
import styles from './SocialMedia.module.scss';

export const SocialMedia = (props) => { 
  const { className } = props;
  
  return (
    <ul className={classNames(styles['social-media'], className)}>
      <li><a href="#" target="_blank"><Icon icon="instagram" /></a></li>
      <li><a href="#" target="_blank"><Icon icon="facebook" /></a></li>
      <li><a href="#" target="_blank"><Icon icon="linkedin" /></a></li>
      <li><a href="#" target="_blank"><Icon icon="youtube" /></a></li>
    </ul>
  )
}

SocialMedia.propTypes = {
	className: PropTypes.string
};