import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './Sidebar.module.scss';
import { StaticI18nLink, SocialMedia, LinkButton, Card } from '../';

export const Sidebar = () => {
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
            <li>
              <span>Kurumsal</span>
              <ul>
                <li><StaticI18nLink href='/product'>Hakkımızda</StaticI18nLink></li>
                <li><StaticI18nLink href='/product'>İhracat</StaticI18nLink></li>
              </ul>
            </li>
            <li>
              <span>Bayilikler</span>
              <ul>
                <li><StaticI18nLink href='/product'>Hakkımızda</StaticI18nLink></li>
                <li><StaticI18nLink href='/product'>İhracat</StaticI18nLink></li>
              </ul>
            </li>
            <li><StaticI18nLink href='/product'>Blog</StaticI18nLink></li>
            <li><StaticI18nLink href='/product'>Kariyer</StaticI18nLink></li>
            <li><StaticI18nLink href='/product'>İletişim</StaticI18nLink></li>
          </ul>
        </nav>
        <div className={styles['social-media']}>
          <SocialMedia />
        </div>
      </div>
    </aside>
  )
}