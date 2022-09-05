/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'
import { Carousel, LinkButton, Card } from '../../components/';
import Image from 'next/image'

import styles from '../../assets/styles/Home.module.scss'

import { products } from '../../utils/Products';

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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout type={'transparent'} products={products}>
        <Carousel data={carousel}/>

        <section className={classNames(styles['section'], styles['white'])}>
          <div className='container'>
            <h6>Hakkımızda</h6>
            <div className={styles['content']}>
              <h2>1969 yılından bu yana yaşam alanlarınız için zarif çözümler sunuyoruz.</h2>
              <p>1969 yılında mütevazi bir şirket olarak temellerini attığımız Keskin Yapı, bugün onlarca ulusal ve uluslararası markanın distribütörlüğünü yaparken, 1000’den fazla ürün çeşitliliğiyle yaşam alanlarınız için zengin içeriği sunuyor. Toplamda 10.000m2 mağaza ve depolama alanıyla birlikte, 20 araçlık lojistik filosu sayesinde doğru ve hızlı teslimat sağlayarak sektörün lider firmalarından biri olmanın gururunu yaşamaktadır. </p>
              <LinkButton href='/about' text={t('MORE_INFO')} locale/>
            </div>
            <div className={styles['image']}>
              <Image src='/images/content/homepage/about.png' width={485} height={431} layout={'responsive'} />
            </div>
          </div>
        </section>

        <section className={classNames(styles['section'])}>
          <div className='container'>
            <h6>Ürün Grupları</h6>
            <div className={styles['content']}>
              <h2>11 farklı kategoride Ulusal ve Uluslararası binlerce ürüne kolay ulaşma imkanı!</h2>
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

        <section className={classNames(styles['section'], styles['white'])}>
          <div className='container'>
            <h6>Hizmetler</h6>
            <div className={styles['content']}>
              <h2>Kaliteli ve güvenilir hizmet!</h2>
              <p>Geniş ürün yelpazemiz ile satış ve satış sonrası destek ekibimizle birlikte, kaliteli ve güvenilir hizmet anlayışını tüm müşterilerimizle buluşturuyoruz.</p>
            </div>
            
          </div>
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