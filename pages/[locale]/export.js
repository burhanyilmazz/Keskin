/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'

import styles from '../../assets/styles/Export.module.scss'

import { products } from '../../utils/Products';
import { TopBar } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Export() {
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
          img={"/images/content/export/head.jpg"}
          title={products[0].title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content'>
          <div className={classNames('container', styles['export'])}>
          <h6>İhracat</h6>
          <div className={styles['content']}>
            <h2> 3 kıta, 28 farklı ülkede ihracatımızı gerçekleştiriyoruz!</h2>
            <p>Keskin Yapı olarak yurtdışında da ülkemizi gururla temsil ederek başta Avrupa olmak üzere 3 kıta 28 farklı ülkeye ihracatımızı gerçekleştirmekteyiz. </p>

            <p>Üreticiler ile dünyayı buluşturan firmamız, müşterilerimize dünya standartlarının üzerinde bir kalite ile seramik, vitrifiye, sıhhi tesisat ve elektrik malzemeleri gibi pek çok ürünü ve markayı ulaştırmayı hedeflemektedir. </p>

            <p>Zamanında sevkiyat ve şeffaf bir çalışma ile müşterilerimizin bize gösterdiği güven ve inancın sorumluluğunu üstlendiğimizden emin oluruz. Bunu yaparken her adımımıza inanarak hem iç̧ hem de dış̧ paydaşlarımıza değer kattığımızı ümit ediyoruz. </p>
          </div>
          <div className={styles['image']}>
            <Image src='/images/content/export/export.jpg' width={485} height={431} layout={'responsive'} />
          </div>
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