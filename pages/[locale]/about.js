/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'

import styles from '../../assets/styles/About.module.scss'

import { products } from '../../utils/Products';
import { TopBar, Newsletter } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function About() {
  const { t } = useTranslation('common');

  const breadcrumbs = [
    {
      title: 'Ürünler',
      href: '/product'
    },
    {
      title: 'Parke Ürünleri',
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
          img={"/images/content/about/head.jpg"}
          title={products[0].title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content'>
         <div className={classNames('container', styles['about'])}>
               <h6>Hakkımızda</h6>
               <div className={styles['content']}>
                  <h2>1969 yılından bu yana...</h2>
                  <p>1969 yılında mütevazi bir şirket olarak temellerini attığımız Keskin Yapı, bugün onlarca ulusal ve uluslararası markanın distribütörlüğünü yaparken, 1000’den fazla ürün çeşitliliğiyle yaşam alanlarınız için zengin içeriği sunuyor. Toplamda 10.000m2 mağaza ve depolama alanıyla birlikte, 20 araçlık lojistik filosu sayesinde doğru ve hızlı teslimat sağlayarak sektörün lider firmalarından biri olmanın gururunu yaşamaktadır.</p>

                  <p>Keskin Yapı olarak Bakırköy’de NG Kütahya Seramik ana bayisi konumunda olup, 1.500 m2 kapalı alanda yaşam alanlarınız için etkileyici çözümlere ulaşmanızı sağlıyoruz. Ürün çeşitliliğimizi sürekli geliştiriyor olmamızın verdiği dinamiklikle; seramik ve banyo ürünlerinden boya ürünlerine, kaba inşaat malzemesinden elektrik malzemelerine kadar geniş yelpazelerde hizmet sunuyoruz.</p>

                  <p>20.000 çeşide ulaşan geniş̧ ürün yelpazesini, dünyada kendini ispat etmiş̧ yerli ve yabancı birçok farklı firmanın bayisine veya satıcısına sunarak sektörde güçlü adımlarla ilerlemeye devam ediyoruz.</p>

                  <p>20 araçlık güçlü lojistik filomuz, 60 kişilik deneyimli personelimiz, yılların getirmiş olduğu deneyimimiz ile ulusal ve uluslararası olarak hizmet vererek, pazarda etkin varlık gösteriyoruz. </p>
                  <p>Ahmet Geyik’in torunları tarafından 2019 yılında kurulan Geyik Mimarlık ile entegre çalışarak, müşterilerimize modern ve kullanışlı çözümler üretiyoruz.</p>
               </div>
               <div className={styles['image']}>
                  <Image src='/images/content/about/about.png' width={485} height={431} layout={'responsive'} />
               </div>
         </div>
         <div className={classNames('container', styles['quality'])}>
               <h6>Kalite Politikamız</h6>
               <div className={styles['content']}>
                  <h2>Çevreye ve topluma saygılı bir firmayız!</h2>
                  <div className={classNames('policy', styles['policy'])}>
                     <div className={styles['image']}>
                           <Image src='/images/content/about/quality.png' width={485} height={431} layout={'responsive'} />
                     </div>
                     <p>Ürün ve hizmet kalitesinde sürdürülebilirliği sağlayarak, çevreye ve topluma örnek bir firma olup, iş ortaklarımızla güven içerisinde müşteri memnuniyetine yönelik karar alma, hizmet üretme ve dinamik çözüm ortaklığı ile sürekli gelişim ve ilerlemeyi sağlamak, etik değerlere saygı, eğitimden asla taviz vermeme gibi değerler çerçevesinde süreçlerimizi daha verimli hale getirmeyi hedefliyoruz.</p>
                  </div>
               </div>
         </div>
        <section className={classNames(styles['section'], styles['newsletter'])}>
            <Newsletter type='joinUs' title={'Ekibimize Katıl'} text={'İşe alım süreçlerimizde tüm adaylarımız bizim için çok değerli!'} />
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