import classNames from 'classnames';
import PropTypes from 'prop-types';

import {Icon, StaticI18nLink} from "../"
import styles from './LinkButton.module.scss';

export const LinkButton = (props) => { 
  const { className, text, locale, href, target, transparent, button } = props;
  
  return (
    <div className={classNames(styles['link-button'], className, {[styles['link-button--transparent']]: transparent})}>
      {locale && <StaticI18nLink href={href}><a>{text} <span><Icon icon='arrow' /></span></a></StaticI18nLink> }
      {!locale && !button && <a href={href} target={target}>{text} <span><Icon icon='arrow' /></span></a> }
      {button && !locale && <button target={target}>{text} <span><Icon icon='arrow' /></span></button> }
    </div>
  )
}

LinkButton.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	href: PropTypes.string,
	target: PropTypes.string,
	locale: PropTypes.bool,
  transparent: PropTypes.bool,
  button: PropTypes.bool,
};

LinkButton.defaultProps = {
	target: "_blank",
}