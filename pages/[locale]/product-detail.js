/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'
import Image from 'next/image'

import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from '../../assets/styles/ProductDetail.module.scss'

import { products } from '../../utils/Products';
import { LinkButton, TopBar, SeniorContact, Modal, FormInput, FormTextarea, Icon, Card, ContactForm } from '../../components';
import classNames from 'classnames';

export default function ProductDetail() {
  const [modalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation('common');

  const breadcrumbs = [
    {
      title: 'Ürünler',
      href: '/product'
    },
    {
      title: 'Parke Ürünleri',
      href: '/product'
    },
    {
      title: 'AGT Parke',
      href: '/product'
    },
    {
      title: 'Effect Altay 8mm AC4 Laminant Parke',
      href: '/product'
    }
  ]

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content={products[0].children[0].products[0].description} />
      </Head>
      
      <Layout products={products} className='white-bg'>
        <TopBar 
          img={products[0].children[0].products[0].images.head}
          title={products[0].children[0].products[0].title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content'>
          <div className={classNames('container', styles['product-detail'])}>
            <div className={styles['text']}>
              <h2>{products[0].children[0].products[0].title}</h2>
              <p dangerouslySetInnerHTML={{__html: products[0].children[0].products[0].description}} />
              <LinkButton href='#' text='TDS İndir' icon={'download'} className={styles['button']}/>
            </div>
            <div className={styles['image']}>
              <Image src={products[0].children[0].products[0].images.medium} width={'100%'} height={'100%'} layout={'responsive'} objectFit={'cover'} objectPosition={'center'} /> 
            </div>
          </div>
        </div>

        <section className={classNames(styles['section'])}>
          <SeniorContact onClick={() => setModalOpen(true)} />
        </section>

        <section className={classNames(styles['section'], styles['white'], styles['recommended'])}>
          <div className='container'>
            <div className={styles['content']}>
              <h2>
                {products[0].children[0].products[0].title}
                <br />
                {t('RECOMMEND_PRODUCT')}
              </h2>
            </div>
          </div>

          <div className={styles['recommended-list']}>
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
              className={styles['recommended__slider']}
            >
              {
                products?.map((item, index) => {
                  return <SwiperSlide key={index} className={styles['recommended__slide']}><Card title={item.title} desc={item.description} href={'/product'} /></SwiperSlide>
                })
              }
            </Swiper>
          </div>
        </section>

        {modalOpen && <Modal onClose={() => setModalOpen(false)}>
          <div className={styles['modal']}>
            <ContactForm title={t('CONTACT_FORM')} />
          </div>
        </Modal> }
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