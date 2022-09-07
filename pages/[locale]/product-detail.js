/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'
import Image from 'next/image'

import styles from '../../assets/styles/ProductDetail.module.scss'

import { products } from '../../utils/Products';
import { LinkButton, TopBar, Card } from '../../components';
import classNames from 'classnames';

export default function ProductDetail() {
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
        <title>Keskin Yapı</title>
        <meta name="description" content="Keskin Yapı" />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={products[0].children[0].products[0].images.head}
          title={products[0].children[0].products[0].title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content'>
          <div className={classNames('container', styles['product-detail'])}>
            <div className={styles['text']}>
              <h2>{products[0].children[0].products[0].title}</h2>
              <p dangerouslySetInnerHTML={{__html: products[0].children[0].products[0].description}} />
              <LinkButton href='#' text='TDS İndir' icon={'download'} className={styles['button']}/>
            </div>
            <div className={styles['image']}>
              <Image src={products[0].children[0].products[0].images.medium} width={32} height={32} layout={'responsive'} /> 
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