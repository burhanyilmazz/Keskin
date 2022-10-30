/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigation, A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image'

import styles from './Carousel.module.scss';
import { LinkButton } from '../';

export const Carousel = (props) => {
  const { data } = props;
  const [nextItem, setNextItem] = useState(data[1])
  const [windowWidth, setWindowWidth] = useState()
  
  const { i18n } = useTranslation('common');

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    if (!windowWidth) setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize, false);
  }, [])
  
  return (
    <section className={styles['carousel']}>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        navigation
        loop
        className={'carousel__slider'}
        pagination={{
          type: "fraction",
          formatFractionCurrent: (number) => {
            return '0' + number;
          },
          formatFractionTotal: (number) => {
            return '0' + number;
          }
        }}
        onActiveIndexChange={(swiper) => {
          setNextItem(data.length == swiper.realIndex + 1 ? data[0] : data[swiper.realIndex + 1 ])
        }}
      >
        {
          data?.map((item, index) => {
            const mobile_image = item.mobile_image || item.image;
            return (
              <SwiperSlide key={index}>
                {windowWidth < 769 && <Image src={mobile_image} layout={'fill'} alt={item.title} objectFit={'cover'} /> }
                {windowWidth > 767 && <Image src={item.image} layout={'fill'} alt={item.title} objectFit={'cover'} /> }
                <div className={styles['carousel__slide']}>
                  <h1>{item.title}</h1>
                  <p>{item.miniTitle}</p>
                  {item.url && <LinkButton target={'_self'} href={item.url} text={i18n.language === 'tr' ? 'Daha Fazla Bilgi' : 'Detail'} transparent/> }
                </div>
              </SwiperSlide>
            )
          })
        }

        <div className={styles['box']}>
          <div className={styles['box__image']}> {nextItem && <Image src={nextItem?.thumb} width={80} height={80} layout={'responsive'} objectFit={'cover'} alt={nextItem?.title} />}</div>
          <div className={styles['box__text']}>
            <div>{nextItem?.title} </div>
          </div>
        </div>
      </Swiper>
    </section>
  )
}

Carousel.propTypes = {
	data: PropTypes.array
};