/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'

import styles from '../../assets/styles/Career.module.scss'

import { products } from '../../utils/Products';
import { TopBar, ContactForm } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Career() {
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
          img={"/images/content/career/head.jpg"}
          title={products[0].title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content'>
          <div className={classNames('container', styles['career'])}>
                <h6>Kariyer</h6>
                <div className={styles['content']}>
                    <h2>İşe alım süreçlerimizde tüm adaylarımız bizim için çok değerli!</h2>
                    <p>Şirketimizi geleceğe taşıyacak, kurumsal değerlerimize sahip, işe en uygun nitelikteki adayları seçmek ve yerleştirmek amaçlanmaktadır. Bu sayede uzun vadeli, verimli ve etkin bir çalışma hayatı oluşturulacağına inanmaktayız. </p>

                    <p>İşe alım sürecimizde, şirket gelişim ve organizasyonel ihtiyaçlar doğrultusunda her yıl düzenli olarak planlanmaktadır. İşe alım sürecimiz, şirketimize ulaştırılan başvuruların değerlendirilmesi ile başlar. Özgeçmiş üzerinden yapılacak ön elemelerin ardından belirlenen kriterlere sahip adaylarımız iş görüşmelerine davet edilirler.</p>

                    <p>Görüşmeye davet edilen adaylarımız, yetkinlikleri ve ilgili pozisyon için gerekli ise deneyimleri doğrultusunda değerlendirilirler. İlgili süreç, ihtiyaçlar doğrultusunda farklı ölçme ve değerlendirme araçları ile de desteklenir. Süreç uygun aday ile tamamlanır.</p>

                    <p>Her çalışanın değer olarak kabul edildiği Keskin Yapı’da tüm adaylarımız da aynı şekilde bizler için değerlidir.</p>
                </div>
                <div className={styles['image']}>
                    <Image src='/images/content/career/career.png' width={485} height={431} layout={'responsive'} />
                </div>
          </div>
          <div className={classNames('contact', styles['contact'])}>
            <ContactForm title={'Kariyer Formu'} type = 'hr'/>
          </div>
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