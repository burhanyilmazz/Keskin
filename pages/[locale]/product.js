/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'

import styles from '../../assets/styles/ProductList.module.scss'

import { products } from '../../utils/Products';
import { LeftNav, TopBar, Card } from '../../components';
import classNames from 'classnames';

export default function Product() {

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
        <title>Keskin Yapı | {products[0].title}</title>
        <meta name="description" content={products[0].title} />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={products[0].images.head}
          title={products[0].title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content'>
          <div className={classNames('container', styles['product-list'])}>
            <LeftNav products={products} />
            <div className={styles['products']}>
              {
                products.map((item, index) => {
                  return (
                    <div key={index} className={styles['products__item']}><Card title={item.title} href={'/product-detail'} /></div>
                  )
                })
              }
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