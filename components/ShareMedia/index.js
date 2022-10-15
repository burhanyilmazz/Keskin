import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Icon} from ".."
import styles from './ShareMedia.module.scss';

export const ShareMedia = (props) => { 
  const { className } = props;

  const pageUrl = window.location.href;
  
  return (
    <ul className={classNames(styles['social-media'], className)}>
      <li><a href={`https://facebook.com/sharer/sharer.php?u=${pageUrl}`} target="_blank" aria-label='Keskin Yapı Facebook' rel="noreferrer"><Icon icon="facebook" /></a></li>
      <li><a href={`https://twitter.com/intent/tweet/?text=${pageUrl}`} target="_blank" aria-label='Keskin Yapı Twitter' rel="noreferrer"><Icon icon="twitter" /></a></li>
      <li><a href={`https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`} target="_blank" aria-label='Keskin Yapı Linkedin' rel="noreferrer"><Icon icon="linkedin" /></a></li>
    </ul>
  )
}

ShareMedia.propTypes = {
	className: PropTypes.string,
	pageUrl: PropTypes.string,
};