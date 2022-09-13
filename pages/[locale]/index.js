/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'
import { Carousel, LinkButton, Card, Icon, Newsletter, CardIcon } from '../../components/';
import Image from 'next/image'

import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from '../../assets/styles/Home.module.scss'

import { products } from '../../utils/Products';
import { blogs } from '../../utils/Blog';

export default function Homepage() {
  const { t } = useTranslation('common');

  const carousel = [
    {
      title: 'NG Kütahya Seramik, şık ve estetik çizgisi ile yaşam alanlarına farklı bir boyut kazandırıyor.',
      desc: 'Doğayı tüm gerçekliği ile dijital baskı tekniği kullanarak seramiği işleyen NG Kütahya Seramik, yepyeni teknolojileri kullanarak, evlerinize yeni bir ışıltı katıyor.',
      href: '/product',
      image: '/images/dummy/carousel.jpg',
      thumb: '/images/dummy/carousel.jpg',
      category: 'Banyo / Seramik',
    },
    {
      title: '2NG Kütahya Seramik, şık ve estetik çizgisi ile yaşam alanlarına farklı bir boyut kazandırıyor.',
      desc: 'Doğayı tüm gerçekliği ile dijital baskı tekniği kullanarak seramiği işleyen NG Kütahya Seramik, yepyeni teknolojileri kullanarak, evlerinize yeni bir ışıltı katıyor.',
      href: '/product',
      image: '/images/dummy/carousel.jpg',
      thumb: '/images/dummy/carousel.jpg',
      category: 'Banyo / Seramik2',
    },
    {
      title: '3NG Kütahya Seramik, şık ve estetik çizgisi ile yaşam alanlarına farklı bir boyut kazandırıyor.',
      desc: 'Doğayı tüm gerçekliği ile dijital baskı tekniği kullanarak seramiği işleyen NG Kütahya Seramik, yepyeni teknolojileri kullanarak, evlerinize yeni bir ışıltı katıyor.',
      href: '/product',
      image: '/images/dummy/carousel.jpg',
      thumb: '/images/dummy/carousel.jpg',
      category: 'Banyo / Seramik3',
    }
  ]

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content="Keskin Yapı" />
      </Head>
      
      <Layout transparent products={products}>
        <Carousel data={carousel}/>

        <section className={classNames('text', styles['section'], 'white-bg',)}>
          <div className='container'>
            <div className='min-title'>{t('HOME.ABOUT.TITLE')}</div>
            <div className={styles['content']}>
              <h2>{t('HOME.ABOUT.SUBTITLE')}</h2>
              <p>{t('HOME.ABOUT.DESC')}</p>
              <LinkButton href='/about' text={t('MORE_INFO')} locale/>
            </div>
            <div className={classNames(styles['image'], 'image')}>
              <Image src='/images/content/homepage/about.jpg' width={485} height={431} layout={'responsive'} alt={t('HOME.ABOUT.TITLE')} />
            </div>
          </div>
        </section>

        <section className={classNames('text', styles['section'])}>
          <div className='container'>
            <div className='min-title'>{t('HOME.PRODUCTS.TITLE')}</div>
            <div className={styles['content']}>
              <h2>{t('HOME.PRODUCTS.SUBTITLE')}</h2>
            </div>
            <div className={styles['products']}>
              {
                products?.map((item, index) => {
                  return <div key={index} className={styles['products__item']}><Card title={item.title} href={'/product'} /></div>
                })
              }
            </div>
          </div>
        </section>

        <section className={classNames('text', styles['section'], 'white-bg')}>
          <div className='container'>
            <div className='min-title'>{t('HOME.SERVICES.TITLE')}</div>
            <div className={styles['wrap']}>
              <div className={styles['content']}>
                <h2>{t('HOME.SERVICES.SUBTITLE')}</h2>
                <p>{t('HOME.SERVICES.DESC')}</p>
              </div>
              <div className={styles['icon-boxes']}>
                <div className={styles['icon-box']}><CardIcon icon={'pin'} title={t('HOME.SERVICES.ITEMS.TITLE1')} desc={t('HOME.SERVICES.ITEMS.DESC1')} /></div>
                <div className={styles['icon-box']}><CardIcon icon={'park'} title={t('HOME.SERVICES.ITEMS.TITLE2')} desc={t('HOME.SERVICES.ITEMS.DESC2')} /></div>
                <div className={styles['icon-box']}><CardIcon icon={'qr'} title={t('HOME.SERVICES.ITEMS.TITLE3')} desc={t('HOME.SERVICES.ITEMS.DESC3')} /></div>
                <div className={styles['icon-box']}><CardIcon icon={'trasnport'} title={t('HOME.SERVICES.ITEMS.TITLE4')} desc={t('HOME.SERVICES.ITEMS.DESC4')} vertical /></div>
                <div className={styles['icon-box']}><CardIcon icon={'credit-card'} title={t('HOME.SERVICES.ITEMS.TITLE5')} desc={t('HOME.SERVICES.ITEMS.DESC5')} vertical /></div>
              </div>
            </div>
          </div>
        </section>

        <section className={classNames('text', styles['section'])}>
          <div className='container'>
            <div className='min-title'>{t('HOME.QUALITY.TITLE')}</div>
            <div className={styles['content']}>
              <h2>{t('HOME.QUALITY.SUBTITLE')}</h2>
              <p>{t('HOME.QUALITY.DESC')}</p>
              <LinkButton href='/about' text={t('MORE_INFO')} locale/>
            </div>
            <div className={classNames(styles['image'], 'image')}>
              <Image src='/images/content/homepage/quality.jpg' width={485} height={431} layout={'responsive'} alt={t('HOME.QUALITY.TITLE')} />
            </div>
          </div>
        </section>

        <section className={classNames('text', styles['section'], 'white-bg', styles['blog'])}>
          <div className='container'>
            <div className='min-title'>{t('HOME.BLOG.TITLE')}</div>
            <div className={styles['content']}>
              <h2>{t('HOME.BLOG.SUBTITLE')}</h2>
              <LinkButton href='/about' text={t('MORE_INFO')} locale />
            </div>
          </div>

          <div className={styles['blogs']}>
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
              className={styles['blogs__slider']}
            >
              {
                blogs?.map((item, index) => {
                  return <SwiperSlide key={index} className={styles['blogs__slide']}><Card title={item.title} desc={item.description} href={'/product'} /></SwiperSlide>
                })
              }
            </Swiper>
          </div>
        </section>


        <section className={classNames(styles['section'], styles['newsletter'], 'white-bg')}>
          <Newsletter title={t('NEWSLETTER.NEWS_TITLE')} text={t('NEWSLETTER.NEWS_DESC')} type='subscription'/>
        </section>
        
      </Layout>
    </>
  )
}

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
})

export const getStaticProps = async (ctx) => ({
  props: {
    ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
  },
})