/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image'
import { useTranslation } from 'next-i18next';
import { StaticI18nLink, SocialMedia, Icon } from '../';

import { navlist } from '../../utils/Nav'

import styles from './Footer.module.scss';

export const Footer = (props) => {
  const { products } = props;

  const { t } = useTranslation('common')
  
  return (
    <div className={styles['footer']}>
      <div className='container'>
        <div className={styles['top']}>
          <div className={styles['logo']}>
            <StaticI18nLink href='/'><a><Image src={'/images/content/logo/logo-vertical.svg'} width={'113'} height={'64'} layout={'fixed'} /></a></StaticI18nLink>
          </div>
          <div className={styles['menu']}>
            <ul>
              {
                navlist.map((item, index) => {
                  if (item?.children) {
                    return (
                      item.children.map((children, child) => {
                        return <li key={child}><StaticI18nLink href={children.href}>{t(children.title)}</StaticI18nLink></li>
                      })
                    )
                  }

                  return <li key={index} ><StaticI18nLink href={item.href}>{t(item.title)}</StaticI18nLink></li>
                })
              }
            </ul>
          </div>
          <div className={styles['products']}>
            <h3>Ürün Grupları</h3>
            <ul>
              {
                products.map((item, index) => {
                  return <li key={index}><StaticI18nLink href='/products'>{item.title}</StaticI18nLink></li>
                })
              }
            </ul>
          </div>
          <div className={styles['social-media']}>
            <SocialMedia type={'vertical'} />
          </div>
          <div className={styles['fikirmod']}>
            <Image src={'/images/content/logo/fikirmod.svg'} width={'65'} height={'14'} layout={'fixed'} />
          </div>
          <div className={styles['up']} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Icon icon='arrow' />
          </div>
        </div>
      </div>
      <div className={styles['bottom']}>
        <div className={classNames('container', styles['container'])}>
          <span>&copy; 2022 Keskinyapı Tüm Hakları Saklıdır</span>
          <span>Sitedeki görsel materyaller izinsiz kullanılamaz.</span>
        </div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  products: PropTypes.array
};