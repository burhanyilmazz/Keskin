/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import Image from 'next/image'
import classNames from 'classnames';
import {StaticI18nLink, Icon} from ".."

import { useTranslation } from 'next-i18next';

import styles from './RightNav.module.scss';

export const RightNav = (props) => { 
  const { className, mainTitle, subTitle, title, type, text, piece, src } = props;

  const { t } = useTranslation('common');
  
  return (
    <div className={styles['right-nav']}>
    <h6>{mainTitle}</h6>
    <ul>
      <li><StaticI18nLink href="#"><a>{title} <span>{piece}</span></a></StaticI18nLink></li>
      <li><StaticI18nLink href="#"><a>{title} <span>{piece}</span></a></StaticI18nLink></li>
      <li><StaticI18nLink href="#"><a>{title} <span>{piece}</span></a></StaticI18nLink></li>
      <li><StaticI18nLink href="#"><a>{title} <span>{piece}</span></a></StaticI18nLink></li>
    </ul>
    <h6>{subTitle}</h6>
    <ul className={classNames('menu', styles['menu'])}>
        <li>
          <StaticI18nLink href="#">
            <a>
              <div className={classNames('list', styles['list'])}>
                <Image src={src} width={'64px'} height={'48px'} layout={'fixed'} alt={title} />
                <div className={classNames('desc', styles['desc'])}>
                  <h6>{title}</h6>
                  <p>{text}</p>
                </div>
              </div>
              <Icon icon='arrow' />
            </a>
          </StaticI18nLink>
        </li>
        <li>
          <StaticI18nLink href="#">
            <a>
              <div className={classNames('list', styles['list'])}>
                <Image src={src} width={'64px'} height={'48px'} layout={'fixed'} alt={title} />
                <div className={classNames('desc', styles['desc'])}>
                  <h6>{title}</h6>
                  <p>{text}</p>
                </div>
              </div>
              <Icon icon='arrow' />
            </a>
          </StaticI18nLink>
        </li>
        <li>
          <StaticI18nLink href="#">
            <a>
              <div className={classNames('list', styles['list'])}>
                <Image src={src} width={'64px'} height={'48px'} layout={'fixed'} alt={title} />
                <div className={classNames('desc', styles['desc'])}>
                  <h6>{title}</h6>
                  <p>{text}</p>
                </div>
              </div>
              <Icon icon='arrow' />
            </a>
          </StaticI18nLink>
        </li>
    </ul>
</div>
  )
}

RightNav.propTypes = {
	title: PropTypes.string,
  titles: PropTypes.string,
  mainTitle: PropTypes.string,
  subMainTitle: PropTypes.string,
  piece: PropTypes.string,
	src: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string
};
RightNav.defaultProps = {
	src: "/images/dummy/architect.jpg",
}