/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'

import styles from '../../assets/styles/BlogDetail.module.scss'

import { products } from '../../utils/Products';
import { blogNav } from '../../utils/BlogNav';
import { blogs } from '../../utils/Blog';

import { TopBar, Card, RightNav, SocialMedia, Icon } from '../../components';
import Image from 'next/image'
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';

export default function Blogetail() {
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
      title: 'Effect Altay 8mm AC4 Laminant Parke',
      href: '/product'
    }
  ]

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content="Keskin Yapı" />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={"/images/content/blog/head-detail.jpg"}
          title={products[0].title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content'>
          <div className={classNames('container', styles['blog-detail'])}>
            <div className={styles['blog-post']}>
              <div className={styles['desc']}>
                <h3>24.08.2022</h3>
                <h2>Mantar Şiltenin ses yalıtımındaki rolü</h2>
                <p>Zemin Ses İzolasyon Malzemeleri- Mantar Esaslı Şilte Kauçuk katkılı mantar levhalar, granül mantarların kauçuk ile karıştırılması sonucu hazırlanan bloklarından dilimlenmesiyle istenilen kalınlıklarda elde edilmektedir. Kauçuk mantar levhalar ses izolasyonunu kusursuza indirgemesi dolayısıyla inşaat alanında duvar, zemin ve çatılarda tercih edilmektedir. Ayrıca makine temellerinde vibrasyon emici olarak da kullanılmaktadır.</p>
              </div>

              <div className={styles['images']}>
                  <Image src='/images/content/blog/blog-detail.jpg' width={745} height={344} layout={'responsive'} />
              </div>

              <div className={styles['content']}>
                <p>Kauçuk katkılı mantar levhalar, granül mantarların kauçuk ile karıştırılması sonucu hazırlanan bloklarından dilimlenmesiyle istenilen kalınlıklarda elde edilmektedir. Kauçuk mantar levhalar ses ve ısı izolasyonunu kusursuz yapması dolayısıyla inşaat sektöründe duvar, zemin ve çatılarda tercih edilmektedir. Ayrıca makine temellerinde vibrasyon emici olarak da kullanılmaktadır.</p>
                <p>Hammaddesi Mantar Meşesi ağacının kabuğu olan granül mantardan işlenerek elde edilen blok ve silindirlerden dilimlemek ve soyulmak suretiyle istenilen kalınlıklarda mantar şilte, mantar levha, mantar levhalar ve mantar rulolar elde edilir. Mantar şilte, Mantar levhalar ve mantar rulolar ses yalıtım, vibrasyon ve titreşim amaçlı oup genişkullanım alanlarına sahip malzemelerdir. Mantar şilteler ayrıca zemin altı, parke altı, şap altı uygulamalarında ses, ısı ve darbe emici özelliği sayesinde mükemmel bir yalıtım sağlar.</p>
                <p>Zemin Ses İzolasyon Malzemeleri- Mantar Esaslı Şilte Kauçuk katkılı mantar levhalar, granül mantarların kauçuk ile karıştırılması sonucu hazırlanan bloklarından dilimlenmesiyle istenilen kalınlıklarda elde edilmektedir. Kauçuk mantar levhalar ses izolasyonunu kusursuza indirgemesi dolayısıyla inşaat alanında duvar, zemin ve çatılarda tercih edilmektedir. Ayrıca makine temellerinde vibrasyon emici olarak da kullanılmaktadır.</p>
              </div>

              <div className={styles['social-media']}>
                <span>{t('SHARE')}</span>
                <SocialMedia />
              </div>
            </div>
            <RightNav categories={blogNav} popular={blogs} />
          </div>
          
          <section className={classNames(styles['section'], styles['white'], styles['recommended'])}>
            <div className='container'>
              <div className={styles['content']}>
                <h2>
                  {t('INTERESTED')}
                  <br />
                  {t('OTHER_POSTS')}
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
        </div>
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