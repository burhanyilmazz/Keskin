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

        <section className={classNames(styles['section'], 'white-bg')}>
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

        <section className={classNames(styles['section'], 'white-bg')}>
          <div className='container'>
            <h6>Hizmetler</h6>
            <div className={styles['wrap']}>
              <div className={styles['content']}>
                <h2>Kaliteli ve güvenilir hizmet!</h2>
                <p>Geniş ürün yelpazemiz ile satış ve satış sonrası destek ekibimizle birlikte, kaliteli ve güvenilir hizmet anlayışını tüm müşterilerimizle buluşturuyoruz.</p>
              </div>
              <div className={styles['icon-boxes']}>
                <div className={styles['icon-box']}><CardIcon icon={'pin'} title={'Kolay Ulaşım'} desc={'Birçok lokasyona maksimum "30 dakika" uzaklıkta!'} /></div>
                <div className={styles['icon-box']}><CardIcon icon={'park'} title={'Otopark'} desc={'Mağazamızda gelen müşterilerimiz için özel otopark alanı mevcuttur.'} /></div>
                <div className={styles['icon-box']}><CardIcon icon={'qr'} title={'QR Ödeme'} desc={'20.000’nin üzerinde ürün çeşidi ile, seçtiğiniz ürünler için QR ile ödeme yapma kolaylığı ilk kez Keskin Yapı’da!'} /></div>
                <div className={styles['icon-box']}><CardIcon vertical icon={'trasnport'} title={'Sevkiyat'} desc={'Geniş araç filomuz ve hızlı teslimat ilkemiz ile ihtiyacınız olan her şey anında kapınızda…'} /></div>
                <div className={styles['icon-box']}><CardIcon vertical icon={'credit-card'} title={'Taksit İmkanı'} desc={'Tüm kredi kartlarında geçerli taksit imkanları ile bütçenizi zorlamadan alışveriş fırsatı sizi bekliyor.'} /></div>
              </div>
            </div>
          </div>
        </section>

        <section className={classNames(styles['section'])}>
          <div className='container'>
            <h6>Kalite Politikamız</h6>
            <div className={styles['content']}>
              <h2>Çevreye ve topluma saygılı bir firmayız!</h2>
              <p>Ürün ve hizmet kalitesinde sürdürülebilirliği sağlayarak, çevreye ve topluma örnek bir firma olup, iş ortaklarımızla güven içerisinde müşteri memnuniyetine yönelik karar alma, hizmet üretme ve dinamik çözüm ortaklığı ile sürekli gelişim ve ilerlemeyi sağlamak, etik değerlere saygı, eğitimden asla taviz vermeme gibi değerler çerçevesinde süreçlerimizi daha verimli hale getirmeyi hedefliyoruz.</p>
              <LinkButton href='/about' text={t('MORE_INFO')} locale/>
            </div>
            <div className={styles['image']}>
              <Image src='/images/content/homepage/quality.png' width={485} height={431} layout={'responsive'} />
            </div>
          </div>
        </section>

        <section className={classNames(styles['section'], 'white-bg', styles['blog'])}>
          <div className='container'>
            <h6>Blog ve Haberler</h6>
            <div className={styles['content']}>
              <h2>Güncel haberler ve gelişmelerden haberdar olun!</h2>
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
          <Newsletter />
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