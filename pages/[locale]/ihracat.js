/* eslint-disable jsx-a11y/alt-text */

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'
import fetch from 'isomorphic-unfetch'

import styles from '../../assets/styles/Export.module.scss'

import { TopBar } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Export({products}) {
  const { t, i18n } = useTranslation('common');

  const pageUrl = i18n.language === 'tr' ? '/ihracat' : '/export';

  const breadcrumbs = [
    {
      title: 'Kurumsal',
      href: pageUrl
    },
    {
      title: 'İhracat',
      href: pageUrl
    }
  ]

  return (
    <>
      <Layout products={products}>
        <TopBar 
          img={"/images/content/export/head.jpg"}
          title='İhracat'
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['export'])}>
            <div className='min-title'> İhracat</div>
            <div className={styles['content']}>
              <h2>3 kıta, 28 farklı ülkede ihracatımızı gerçekleştiriyoruz!</h2>
              <div>
                <p>Keskin Yapı olarak yurtdışında da ülkemizi gururla temsil ederek başta Avrupa olmak üzere 3 kıta 28 farklı ülkeye ihracatımızı gerçekleştirmekteyiz. </p>
                <p>Üreticiler ile dünyayı buluşturan firmamız, müşterilerimize dünya standartlarının üzerinde bir kalite ile seramik, vitrifiye, sıhhi tesisat ve elektrik malzemeleri gibi pek çok ürünü ve markayı ulaştırmayı hedeflemektedir. </p>
                <p>Zamanında sevkiyat ve şeffaf bir çalışma ile müşterilerimizin bize gösterdiği güven ve inancın sorumluluğunu üstlendiğimizden emin oluruz. Bunu yaparken her adımımıza inanarak hem iç̧ hem de dış̧ paydaşlarımıza değer kattığımızı ümit ediyoruz. </p>
              </div>
            </div>
            <div className={classNames(styles['image'], 'image')}>
              <Image alt=' İhracat' src='/images/content/export/export.jpg' width={485} height={431} layout={'responsive'} />
            </div>
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