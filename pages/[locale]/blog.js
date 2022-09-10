/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'

import styles from '../../assets/styles/Blog.module.scss'

import { products } from '../../utils/Products';
import { TopBar, StaticI18nLink, Card, Icon, RightNav } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Blog() {
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
          img={"/images/content/blog/head.jpg"}
          title={products[0].title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content'>
         <div className={classNames('container', styles['blog'])}>
            <div className={styles['list']}>
              <Card 
                src="/images/content/blog/blog.jpg" 
                title='Duvar Ses Yalıtımı'  
                desc='Duvar ses yalıtımı iki duvar arası ses geçişleri veya dışarıdan içeriye içeriden dışarıya geçiş yapan ses frekanslarını önleyebilmek amacıyla yüksek ses kesim...' 
              />
              <Card 
                src="/images/content/blog/blog.jpg" 
                title='Duvar Ses Yalıtımı'  
                desc='Duvar ses yalıtımı iki duvar arası ses geçişleri veya dışarıdan içeriye içeriden dışarıya geçiş yapan ses frekanslarını önleyebilmek amacıyla yüksek ses kesim...' 
              />
              <Card 
                src="/images/content/blog/blog.jpg" 
                title='Duvar Ses Yalıtımı'  
                desc='Duvar ses yalıtımı iki duvar arası ses geçişleri veya dışarıdan içeriye içeriden dışarıya geçiş yapan ses frekanslarını önleyebilmek amacıyla yüksek ses kesim...' 
              />
              <Card 
                src="/images/content/blog/blog.jpg" 
                title='Duvar Ses Yalıtımı'  
                desc='Duvar ses yalıtımı iki duvar arası ses geçişleri veya dışarıdan içeriye içeriden dışarıya geçiş yapan ses frekanslarını önleyebilmek amacıyla yüksek ses kesim...' 
              />
            </div>

            <RightNav mainTitle='Kategoriler' subTitle='Popüler Makaleler' title='Su Yalıtımı' text='24.08.2022' piece='3' />
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