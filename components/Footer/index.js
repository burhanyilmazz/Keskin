/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image'
import { useTranslation } from 'next-i18next';
import { StaticI18nLink, SocialMedia, Icon } from '../';
import slug from 'slug'

import { navlist } from '../../utils/Nav'

import styles from './Footer.module.scss';

export const Footer = (props) => {
  const { products } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { t, i18n } = useTranslation('common')

  const catUrl = i18n.language === 'tr' ? '/urunler' : '/products';
  
  return (
    <div className={styles['footer']}>
      <div className='container'>
        <div className={styles['top']}>
          <div className={styles['logo']}>
            <StaticI18nLink href='/'><a><Image src={'/images/content/logo/logo-vertical.svg'} width={'113'} height={'64'} layout={'fixed'} alt={'Keskin Yapı'} /></a></StaticI18nLink>
          </div>
          <div className={styles['menu']}>
            <ul>
              {
                navlist?.map((item, index) => {
                  if (item?.children) {
                    return (
                      item.children.map((children, child) => {
                        return <li key={child}><StaticI18nLink href={i18n.language === 'tr' ? children.tr : children.en}>{t(children.title)}</StaticI18nLink></li>
                      })
                    )
                  }

                  return <li key={index} ><StaticI18nLink href={i18n.language === 'tr' ? item.tr : item.en}>{t(item.title)}</StaticI18nLink></li>
                })
              }
            </ul>
          </div>
          <div className={classNames(styles['products'], {[styles['products--open']]: isOpen})}>
            <h3 onClick={() => setIsOpen(!isOpen)}>{t('HOME.PRODUCTS.TITLE')}</h3>
            <ul>
              {
                products?.map((item, index) => {
                  return <li key={index}><StaticI18nLink href={`${catUrl}/${slug(item.category.title)}-${item.category.id}`}>{item?.category?.title}</StaticI18nLink></li>
                })
              }
            </ul>
          </div>
          <div className={styles['social-media']}>
            <SocialMedia type={'vertical'} />
          </div>
          <div className={styles['fikirmod']}>
            <a href='https://wwww.fikirmod.com.tr' target='_blank' rel="noreferrer"><Image src={'/images/content/logo/fikirmod.svg'} width={'65'} height={'14'} layout={'fixed'} alt={'Fikirmod'} /></a>
          </div>
          <div className={styles['up']} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Icon icon='arrow' />
          </div>
        </div>
      </div>
      <div className={styles['bottom']}>
        <div className={classNames('container', styles['container'])}>
          <span>&copy; {t('FOOTER.COPYRIGHT')}</span>
          <span>{t('FOOTER.IMAGE')}</span>
        </div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  products: PropTypes.array
};