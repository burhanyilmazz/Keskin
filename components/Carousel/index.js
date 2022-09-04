/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
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
  
  const { t } = useTranslation('common');

  return (
    <div className={styles['carousel']}>
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
            return (
              <SwiperSlide key={index}>
                <Image src='/images/dummy/carousel.jpg' layout={'fill'} />
                <div className={styles['carousel__slide']}>
                  <h1>{item.title}</h1>
                  <p>{item.desc}</p>
                  <LinkButton href={item.href} text={t('MORE_INFO')} locale transparent/>
                </div>
              </SwiperSlide>
            )
          })
        }

        <div className={styles['box']}>
          <div className={styles['box__image']}> <Image src={nextItem?.thumb} width={80} height={80} layout={'responsive'} /></div>
          <div className={styles['box__text']}>
            <h6>{nextItem?.cat} </h6>
            <h5>{nextItem?.title} </h5>
          </div>
        </div>
      </Swiper>
    </div>
  )
}

Carousel.propTypes = {
	data: PropTypes.array
};