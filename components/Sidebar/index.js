import React, { useState } from 'react';
import { useRouter } from "next/router";
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import styles from './Sidebar.module.scss';
import { StaticI18nLink, SocialMedia, LinkButton, Card } from '../';

export const Sidebar = () => {
  const [list, setList] = useState([
    {
      title: "SIDEBAR.CORPARATE",
      children: [
        {
          title: "SIDEBAR.CORPARATE.ABOUT",
          href: '/about'
        },
        {
          title: "SIDEBAR.CORPARATE.EXPORT",
          href: '/product'
        }
      ]
    },
    {
      title: "SIDEBAR.DEALER",
      children: [
        {
          title: "SIDEBAR.CORPARATE.ABOUT",
          href: '/about'
        },
        {
          title: "SIDEBAR.CORPARATE.EXPORT",
          href: '/product'
        }
      ]
    },
    {
      title: "SIDEBAR.BLOG",
      href: '/product4',
    },
    {
      title: "SIDEBAR.CAREER",
      href: '/product5'
    },
    {
      title: "SIDEBAR.CONTACT",
      href: '/product6'
    },
  ])

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
    <aside className={styles['sidebar']}>
      <div className={styles['main']}>
        <div className={styles['main__head']}>
          <h6>Ürün Grupları</h6>
          <p>11 farklı kategoride Ulusal ve Uluslararası binlerce ürüne kolay ulaşma imkanı!</p>
        </div>
        <div className={styles['main__body']}>
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={24}
            slidesPerView={'auto'}
            navigation
            scrollbar={{ draggable: true }}
            className={'sidebar__slider'}
          >
            <SwiperSlide className={styles['main__slide']}><Card title={'Seramik ve Banyo Ürünleri'} href={'/product'} /></SwiperSlide>
            <SwiperSlide className={styles['main__slide']}><Card title={'Parke Ürünleri'} href={'/product'} /></SwiperSlide>
            <SwiperSlide className={styles['main__slide']}><Card title={'Boya Ürünleri'} href={'/product'} /></SwiperSlide>
            <SwiperSlide className={styles['main__slide']}><Card title={'Seramik Ürünleri'} href={'/product'} /></SwiperSlide>
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
              list.map((item, index) => {
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
