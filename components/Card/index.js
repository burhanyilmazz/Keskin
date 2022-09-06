/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image'

import {Icon, StaticI18nLink} from "../"
import styles from './Card.module.scss';

export const Card = (props) => { 
  const { className, src, title, desc, href } = props;
  
  return (
      <div className={classNames(styles['card'], className)}>
        <StaticI18nLink href={href}>
          <a>
            <div className={styles['head']}>
              <Image src={src} width={'100%'} height={'100%'} layout={'fixed'} />
              <div className={styles['arrow']}><Icon icon={'arrow'} /></div>
            </div>
            <div className={styles['foot']}>
              <h2>{title}</h2>
              { desc && <p>{desc}</p> }
            </div>
          </a>
        </StaticI18nLink>
      </div>
  )
}

Card.propTypes = {
	className: PropTypes.string,
	src: PropTypes.string,
	href: PropTypes.string,
	title: PropTypes.string,
	desc: PropTypes.string,
};

Card.defaultProps = {
	src: "/images/dummy/card.jpg",
}