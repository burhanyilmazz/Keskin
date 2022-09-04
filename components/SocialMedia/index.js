import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Icon} from "../"
import styles from './SocialMedia.module.scss';

export const SocialMedia = (props) => { 
  const { className, type } = props;
  
  return (
    <ul className={classNames(styles['social-media'], {[styles['social-media--vertical']]: type === 'vertical'}, className)}>
      <li><a href="#" target="_blank"><Icon icon="instagram" /></a></li>
      <li><a href="#" target="_blank"><Icon icon="facebook" /></a></li>
      <li><a href="#" target="_blank"><Icon icon="linkedin" /></a></li>
      <li><a href="#" target="_blank"><Icon icon="youtube" /></a></li>
    </ul>
  )
}

SocialMedia.propTypes = {
	className: PropTypes.string,
  type: PropTypes.string
};