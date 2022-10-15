import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Icon} from "../"
import styles from './SocialMedia.module.scss';

export const SocialMedia = (props) => { 
  const { className, type } = props;
  
  return (
    <ul className={classNames(styles['social-media'], {[styles['social-media--vertical']]: type === 'vertical'}, className)}>
      <li><a href="https://www.instagram.com/keskinyapicozumleri" target="_blank" aria-label='Keskin Yapı Instagram' rel="noreferrer"><Icon icon="instagram" /></a></li>
      <li><a href="https://www.facebook.com/keskinyapicozumleri" target="_blank" aria-label='Keskin Yapı Facebook' rel="noreferrer"><Icon icon="facebook" /></a></li>
      <li><a href="https://www.linkedin.com/company/keskinyapicozumleri/?viewAsMember=true" target="_blank" aria-label='Keskin Yapı Linkedin' rel="noreferrer"><Icon icon="linkedin" /></a></li>
      {/* <li><a href="#" target="_blank" aria-label='Keskin Yapı Youtebe'><Icon icon="youtube" /></a></li> */}
    </ul>
  )
}

SocialMedia.propTypes = {
	className: PropTypes.string,
  type: PropTypes.string
};