/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'
import fetch from 'isomorphic-unfetch'

import styles from '../../assets/styles/Search.module.scss'

import { blogs } from '../../utils/Blog';
import { TopBar, Search, Card } from '../../components';

export default function SearchPage({products}) {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content="Keskin Yapı" />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          title={t('SEARCH.TITLE')}
        />
        <div className='content'>
         <div className={styles['search']}>

          <div className={styles['search-box']}>
            <div className='container'>
              <Search />
            </div>
          </div>

          <div className={styles['search-list']}>
            <div className='container'>
              <div className='min-title'>{t('HOME.PRODUCTS.TITLE')}</div>

              <div className={styles['product-list']}>
                {
                  products.map((item, index) => <div key={index} className={styles['products__item']}><Card title={item.title} href={'/product-detail'} /></div> )
                }
              </div>
            </div>
          </div>

          <div className={styles['search-list']}>
            <div className='container'>
              <div className='min-title'>{t('SIDEBAR.BLOG')}</div>

              <div className={styles['blog-list']}>
                {
                  blogs.map((item, index) => <div key={index} className={styles['products__item']}> <Card title={item.title}  desc={item.description}  href={'/blog-detail'}  src={item.images.medium} /></div>)
                }
              </div>
            </div>
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
    revalidate: 10
  }
}