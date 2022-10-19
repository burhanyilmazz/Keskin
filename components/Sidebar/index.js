import React, { useState } from 'react';
import { useRouter } from "next/router";
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import styles from './Sidebar.module.scss';
import { StaticI18nLink, SocialMedia, LinkButton, Card, Icon } from '../';
import slug from 'slug'

import { navlist } from '../../utils/Nav';

export const Sidebar = (props) => {
  const { isShow, products } = props;
  const [list, setList] = useState(navlist)

  const onClick = (event, index) => {
    list[index].isOpen = !list[index].isOpen;
    list.map((item, i) => {
        if (i !== index) list[i].isOpen = false
    })
    
    setList([...list])
  }

  const router = useRouter();
  const route = `/${router.asPath.split('/')[2]}`;

  const { t, i18n } = useTranslation('common')
  const catUrl = i18n.language === 'tr' ? '/urunler' : '/products';
  
  return (
    <aside className={classNames(styles['sidebar'], {[styles['sidebar--open']] : isShow })}>
      <div className={styles['main']}>
        <div className={styles['main__head']}>
          <span>{i18n.language === 'tr' ? 'Ürün Grupları' : 'Product Groups'}</span>
          <p>{i18n.language === 'tr' ? '11 farklı kategoride Ulusal ve Uluslararası binlerce ürüne kolay ulaşma imkanı!' : 'Easy access to thousands of national and international products in 11 different categories!'}</p>
        </div>
        <div className={styles['main__body']}>
          <div className={styles['navigation']}>
            <div className='button-next'><Icon icon='arrow' /></div>
            <div className='button-prev'><Icon icon='arrow' /></div>
          </div>
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={24}
            slidesPerView={'auto'}
            navigation={{
              nextEl: '.button-next',
              prevEl: '.button-prev',
            }}
            className={'sidebar__slider'}
          >
            { 
              products?.map((item, index) => {
                return <SwiperSlide key={index} className={styles['main__slide']}><Card title={item?.category?.title} src={item?.category?.image} href={`${catUrl}/${slug(item.category.title)}-${item.category.id}`} /></SwiperSlide>
              }) 
            }
          </Swiper>
        </div>
        <div className={styles['main__foot']}>
          <h3>{i18n.language === 'tr' ? 'E-Katalog' : 'E-Catalog'}</h3>
          <p>{i18n.language === 'tr' ? 'Güncel ürün kataloğumuz için lütfen aşağıdaki butona tıklayınız.' : 'Please click the button below for our current product catalog.'}</p>
          <LinkButton href='/pdf/E-Katalog.pdf' text={i18n.language === 'tr' ? 'İndir' : 'Download'} icon={'download'} className={styles['download']} />
        </div>
      </div>
      <div className={styles['nav']}>
        <nav>
          <ul>
            {
              list?.map((item, index) => {
                if (item?.children) {
                  return (
                    <li 
                      className={classNames({[styles['nav--active']] : item.isActive, [styles['nav--open']] : item.isOpen })} 
                      onClick={(event) => onClick(event, index)}
                      key = {index}
                    >
                      <span>{i18n.language === 'tr' ? item.title : item.title_en}</span>
                      <ul>
                        {
                          item.children.map((children, child) => {
                            if (route == children.tr || route == children.en) item.isActive = true;
                            const langItem = i18n.language === 'tr' ? children.tr : children.en;
                            const title = i18n.language === 'tr' ? children.title : children.title_en;
                            
                            return <li key={child} className={classNames({[styles['nav--active']] : children.isActive || route == langItem })} ><StaticI18nLink href={i18n.language === 'tr' ? children.tr : children.en}>{title}</StaticI18nLink></li>
                          })
                        }
                      </ul>
                    </li>
                  )
                }

                return <li key={index} className={classNames({[styles['nav--active']] : (route == item.tr || route == item.en) ? true : false })} ><StaticI18nLink href={i18n.language === 'tr' ? item.tr : item.en}>{i18n.language === 'tr' ? item.title : item.title_en}</StaticI18nLink></li>
              })
            }
          </ul>
        </nav>
        <div className={styles['social-media']}>
          <SocialMedia />
        </div>
        
        <div className={styles['language']}>
          <StaticI18nLink href='/' locale={'tr'}><a className={classNames({[styles['lang-active']] : i18n.language === 'tr' ? true : '' })}>TR</a></StaticI18nLink>
          <StaticI18nLink href='/' locale={'en'}><a className={classNames({[styles['lang-active']] : i18n.language === 'en' ? true : '' })}>EN</a></StaticI18nLink>
        </div>

        <div className={styles['mobile-download']}>
          <LinkButton href='#' text={i18n.language === 'tr' ? 'E-Katalog' : 'E-Catalog'} icon={'download'} className={styles['download']} />
        </div>
      </div>
    </aside>
  )
}

Sidebar.propTypes = {
	isShow: PropTypes.bool,
  products: PropTypes.array
};

Sidebar.defaultProps = {
	isShow: false,
}