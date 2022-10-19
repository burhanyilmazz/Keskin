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

import fetch from 'isomorphic-unfetch'
import slug from 'slug'

import styles from '../../assets/styles/Home.module.scss'

export default function Homepage({carousel, products, popular}) {
  const { i18n } = useTranslation('common');

  const blogDetailUrl = i18n.language === 'tr' ? '/blog-detay' : '/blog-detail';
  const productUrl = i18n.language === 'tr' ? '/urunler' : '/products';

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
            <div className='min-title'>{i18n.language === 'tr' ? 'Hakkımızda' : 'About Us'}</div>
            <div className={styles['content']}>
              <h2>{i18n.language === 'tr' ? '1969 yılından bu yana yaşam alanlarınız için zarif çözümler sunuyoruz.' : 'Since 1969, we offer elegant solutions for your living spaces.'}</h2>
              <p>{i18n.language === 'tr' ? '1969 yılında mütevazi bir şirket olarak temellerini attığımız Keskin Yapı, bugün onlarca ulusal ve uluslararası markanın distribütörlüğünü yaparken, 1000’den fazla ürün çeşitliliğiyle yaşam alanlarınız için zengin içeriği sunuyor. Toplamda 10.000m2 mağaza ve depolama alanıyla birlikte, 20 araçlık lojistik filosu sayesinde doğru ve hızlı teslimat sağlayarak sektörün lider firmalarından biri olmanın gururunu yaşamaktadır.' : 'Keskin Yapı, which we laid the foundations of as a modest company in 1969, is the distributor of dozens of national and international brands and offers rich content for your living spaces with more than 1000 product range.It is proud of being one of the leading companies in the sector by providing accurate and fast delivery thanks to its logistics fleet of 20 vehicles, along with a total of 10.000m2 store and storage area.'}</p>
              <LinkButton href={i18n.language === 'tr' ? '/hakkimizda' : '/about'} text={i18n.language === 'tr' ? 'Daha Fazla Bilgi' : 'Detail'} locale/>
            </div>
            <div className={classNames(styles['image'], 'image')}>
              <Image src='/images/content/homepage/about.jpg' width={485} height={431} layout={'responsive'} alt={i18n.language === 'tr' ? 'Hakkımızda' : 'About Us'} />
            </div>
          </div>
        </section>

        <section className={classNames('text', styles['section'])}>
          <div className='container'>
            <div className='min-title'>{i18n.language === 'tr' ? 'Ürün Grupları' : 'Product Groups'}</div>
            <div className={styles['content']}>
              <h2>{i18n.language === 'tr' ? '11 farklı kategoride Ulusal ve Uluslararası binlerce ürüne kolay ulaşma imkanı!' : 'Easy access to thousands of national and international products in 11 different categories!'}</h2>
            </div>
            <div className={styles['products']}>
              {
                products?.map((item, index) => {
                  return <div key={index} className={styles['products__item']}><Card title={item.category.title} src={item.category.image} href={`${productUrl}/${slug(item.category.title)}-${item.category.id}`} /></div>
                })
              }
            </div>
          </div>
        </section>

        <section className={classNames('text', styles['section'], 'white-bg')}>
          <div className='container'>
            <div className='min-title'>{i18n.language === 'tr' ? 'Hizmetler' : 'Services'}</div>
            <div className={styles['wrap']}>
              <div className={styles['content']}>
                <h2>{i18n.language === 'tr' ? 'Kaliteli ve güvenilir hizmet!' : 'Quality and reliable service!'}</h2>
                <p>{i18n.language === 'tr' ? 'Geniş ürün yelpazemiz ile satış ve satış sonrası destek ekibimizle birlikte, kaliteli ve güvenilir hizmet anlayışını tüm müşterilerimizle buluşturuyoruz.' : 'Together with our wide product range and our sales and after-sales support team, we bring together the understanding of quality and reliable service with all our customers.'}</p>
              </div>
              <div className={styles['icon-boxes']}>
                <div className={styles['icon-box']}>
                  <CardIcon 
                    icon={'pin'} 
                    title={i18n.language === 'tr' ? 'Kolay Ulaşım' : 'Easy Access'} 
                    desc={i18n.language === 'tr' ? 'Birçok lokasyona maksimum "30 dakika" uzaklıkta!' : 'Maximum "30 minutes" away from many locations!'} 
                  />
                </div>
                <div className={styles['icon-box']}>
                  <CardIcon 
                    icon={'park'} 
                    title={i18n.language === 'tr' ? 'Otopark' : 'Car Park'} 
                    desc={i18n.language === 'tr' ? 'Mağazamızda gelen müşterilerimiz için özel otopark alanı mevcuttur.' : 'There is a private parking area for our customers who come to our store.'} 
                  />
                </div>
                <div className={styles['icon-box']}>
                  <CardIcon 
                    icon={'qr'} 
                    title={i18n.language === 'tr' ? 'QR Ödeme' : 'QR Payment'} 
                    desc={i18n.language === 'tr' ? '20.000’nin üzerinde ürün çeşidi ile, seçtiğiniz ürünler için QR ile ödeme yapma kolaylığı ilk kez Keskin Yapı’da!' : 'With more than 20,000 product types, the ease of paying with QR for the products you choose is at Keskin Yapı for the first time!'} 
                  />
                </div>
                <div className={styles['icon-box']}>
                  <CardIcon 
                    icon={'trasnport'} 
                    title={i18n.language === 'tr' ? 'Sevkiyat' : 'Delivery'} 
                    desc={i18n.language === 'tr' ? 'Geniş araç filomuz ve hızlı teslimat ilkemiz ile ihtiyacınız olan her şey anında kapınızda...' : 'With our wide vehicle fleet and fast delivery policy, everything you need is at your doorstep...'} 
                    vertical 
                  />
                </div>
                <div className={styles['icon-box']}>
                  <CardIcon 
                    icon={'credit-card'} 
                    title={i18n.language === 'tr' ? 'Taksit İmkanı' : 'Installment Opportunity'} 
                    desc={i18n.language === 'tr' ? 'Tüm kredi kartlarında geçerli taksit imkanları ile bütçenizi zorlamadan alışveriş fırsatı sizi bekliyor.' : 'The opportunity to shop without straining your budget is waiting for you with installment opportunities available on all credit cards.'} 
                    vertical 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={classNames('text', styles['section'])}>
          <div className='container'>
            <div className='min-title'>{i18n.language === 'tr' ? 'Kalite Politikamız' : 'Our Quality Policy'}</div>
            <div className={styles['content']}>
              <h2>{i18n.language === 'tr' ? 'Çevreye ve topluma saygılı bir firmayız!' : 'We are a company that respects the environment and society!'}</h2>
              <p>{i18n.language === 'tr' ? 'Ürün ve hizmet kalitesinde sürdürülebilirliği sağlayarak, çevreye ve topluma örnek bir firma olup, iş ortaklarımızla güven içerisinde müşteri memnuniyetine yönelik karar alma, hizmet üretme ve dinamik çözüm ortaklığı ile sürekli gelişim ve ilerlemeyi sağlamak, etik değerlere saygı, eğitimden asla taviz vermeme gibi değerler çerçevesinde süreçlerimizi daha verimli hale getirmeyi hedefliyoruz.' : 'By providing sustainability in product and service quality, it is an exemplary company for the environment and society, and we continue our processes within the framework of values such as making decisions for customer satisfaction in trust with our business partners, providing services, and ensuring continuous development and progress with dynamic solution partnership, respect for ethical values, and never compromising on education. We aim to make it more efficient.'}</p>
              <LinkButton href={i18n.language === 'tr' ? '/hakkimizda' : '/about'} text={i18n.language === 'tr' ? 'Daha Fazla Bilgi' : 'Detail'} locale/>
            </div>
            <div className={classNames(styles['image'], 'image')}>
              <Image src='/images/content/homepage/quality.jpg' width={485} height={431} layout={'responsive'} alt={i18n.language === 'tr' ? 'Kalite Politikamız' : 'Our Quality Policy'} />
            </div>
          </div>
        </section>

        <section className={classNames('text', styles['section'], 'white-bg', styles['blog'])}>
          <div className='container'>
            <div className='min-title'>{i18n.language === 'tr' ? 'Blog ve Haberler' : 'Blog and News'}</div>
            <div className={styles['content']}>
              <h2>{i18n.language === 'tr' ? 'Güncel haberler ve gelişmelerden haberdar olun!' : 'Be informed about current news and developments!'}</h2>
              <LinkButton href='/blog' text={i18n.language === 'tr' ? 'Daha Fazla Bilgi' : 'Detail'} locale />
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
                popular?.map((item, index) => {
                  return <SwiperSlide key={index} className={styles['blogs__slide']}><Card src={item.listing} title={item.title} desc={item.description} href={`${blogDetailUrl}/${slug(item.title)}-${item.id}-${item.cat_id}`} /></SwiperSlide>
                })
              }
            </Swiper>
          </div>
        </section>


        <section className={classNames(styles['section'], styles['newsletter'], 'white-bg')}>
          <Newsletter title={i18n.language === 'tr' ? 'E-Bülten' : 'E-Newsletter'} text={i18n.language === 'tr' ? 'Kampanya ve duyurulardan haberdar olmak için e-bültene abone olun.' : 'Subscribe to the e-newsletter to be informed about campaigns and announcements.'} type='subscription'/>
        </section>
        
      </Layout>
    </>
  )
}

export const getStaticPaths = () => ({
  fallback: "blocking",
  paths: getI18nPaths(),
}) 

export async function getStaticProps(ctx) {
  const language = ctx.params.locale;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language })
  }

  const carousel = await fetch(`${process.env.API_URL}/sliders`, options).then(r => r.json()).then(data => data.Result);
  const products = await fetch(`${process.env.API_URL}/products/aio`, options).then(r => r.json()).then(data => data.Result);
  const popular = await fetch(`${process.env.API_URL}/blogs/populer`, options).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      carousel,
      products,
      popular,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    },
    revalidate: 10,
  }
}