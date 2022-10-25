/* eslint-disable jsx-a11y/alt-text */

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { Layout } from '../../layout'
import { getI18nPaths } from '../../getI18nPaths'
import fetch from 'isomorphic-unfetch'

import styles from '../../assets/styles/Career.module.scss'

import { TopBar, ContactForm } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Career({products}) {
  const { i18n } = useTranslation('common');

  const pageUrl = i18n.language === 'tr' ? '/kariyer' : '/career';

  const breadcrumbs = [
    {
      title: 'Kariyer',
      href: pageUrl
    }
  ]

  return (
    <>
      <Layout products={products}>
        <TopBar 
          img={"/images/content/career/head.jpg"}
          title='Kariyer'
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['career'])}>
            <div className='min-title'>Kariyer</div>
            <div className={styles['content']}>
              <h2>İşe alım süreçlerimizde tüm adaylarımız bizim için çok değerli!</h2>
              <div>
                <p>Şirketimizi geleceğe taşıyacak, kurumsal değerlerimize sahip, işe en uygun nitelikteki adayları seçmek ve yerleştirmek amaçlanmaktadır. Bu sayede uzun vadeli, verimli ve etkin bir çalışma hayatı oluşturulacağına inanmaktayız.</p>
                <p>İşe alım sürecimizde, şirket gelişim ve organizasyonel ihtiyaçlar doğrultusunda her yıl düzenli olarak planlanmaktadır. İşe alım sürecimiz, şirketimize ulaştırılan başvuruların değerlendirilmesi ile başlar. Özgeçmiş üzerinden yapılacak ön elemelerin ardından belirlenen kriterlere sahip adaylarımız iş görüşmelerine davet edilirler.</p>
                <p>Görüşmeye davet edilen adaylarımız, yetkinlikleri ve ilgili pozisyon için gerekli ise deneyimleri doğrultusunda değerlendirilirler. İlgili süreç, ihtiyaçlar doğrultusunda farklı ölçme ve değerlendirme araçları ile de desteklenir. Süreç uygun aday ile tamamlanır.</p>
                <p>Her çalışanın değer olarak kabul edildiği Keskin Yapı’da tüm adaylarımız da aynı şekilde bizler için değerlidir.</p>
              </div>
            </div>

            <div className={classNames(styles['image'], 'image')}>
              <Image src='/images/content/career/career.jpg' width={442} height={480} layout={'responsive'} />
            </div>
          </div>
          <div className={classNames('container', 'contact', styles['contact'])}>
            <ContactForm title='Kariyer Formu' type='hr'/>
          </div>
        </div>
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

  const products = await fetch(`${process.env.API_URL}/products/aio`, options).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      products,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    },
    revalidate: 10,
  }
}