import React, { useState } from 'react';
import { useRouter } from "next/router";
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import styles from './Sidebar.module.scss';
import { StaticI18nLink, SocialMedia, LinkButton, Card, Icon } from '../';

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

  const { t } = useTranslation('common')

  return (
    <aside className={classNames(styles['sidebar'], {[styles['sidebar--open']] : isShow })}>
      <div className={styles['main']}>
        <div className={styles['main__head']}>
          <h6>Ürün Grupları</h6>
          <p>11 farklı kategoride Ulusal ve Uluslararası binlerce ürüne kolay ulaşma imkanı!</p>
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
                return <SwiperSlide key={index} className={styles['main__slide']}><Card title={item.title} href={'/product'} /></SwiperSlide>
              })
            }
            
          </Swiper>
        </div>
        <div className={styles['main__foot']}>
          <h3>E-Katalog</h3>
          <p>Güncel ürün kataloğumuz için lütfen aşağıdaki butona tıklayınız.</p>
          <LinkButton href='#' text='İndir'/>
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
                      <span>{t(item.title)}</span>
                      <ul>
                        {
                          item.children.map((children, child) => {
                            if (route == children.href) item.isActive = true;
                            
                            return <li key={child} className={classNames({[styles['nav--active']] : children.isActive || route == children.href })} ><StaticI18nLink href={children.href}>{t(children.title)}</StaticI18nLink></li>
                          })
                        }
                      </ul>
                    </li>
                  )
                }

                return <li key={index} className={classNames({[styles['nav--active']] : item.isActive || route == item.href })} ><StaticI18nLink href={item.href}>{t(item.title)}</StaticI18nLink></li>
              })
            }
          </ul>
        </nav>
        <div className={styles['social-media']}>
          <SocialMedia />
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