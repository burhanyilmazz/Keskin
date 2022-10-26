/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react';

import {useRouter} from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'
import fetch from 'isomorphic-unfetch'
import slug from 'slug'
import {API_URL} from '../../utils/env'

import styles from '../../assets/styles/Search.module.scss'

import { TopBar, Search, Card } from '../../components';

export default function SearchPage({products}) {
  const [data, setData] = useState();
  const { i18n } = useTranslation('common');
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const language = i18n.language;
    const keyword = router.query.keyword || params.get('keyword');

    if (!keyword) return

    fetch(`${API_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({language, keyword})
    }).then(r => r.json()).then(data => setData(data.Result));
  }, [])
  
  const blogUrl = i18n.language === 'tr' ? '/blog-detay' : '/blog-detail';
  const productUrl = i18n.language === 'tr' ? '/urun-detay' : '/product-detail';

  return (
    <>
      <Layout products={products}>
        <TopBar title={i18n.language === 'tr' ? 'Arama Sonuçları' : 'Search Results'} />
        <div className='content'>
         <div className={styles['search']}>

          <div className={styles['search-box']}>
            <div className='container'>
              <Search />
            </div>
          </div>

          {data?.products && <div className={styles['search-list']}>
            <div className='container'>
              <div className='min-title'>{i18n.language === 'tr' ? 'Ürün Grupları' : 'Product Groups'}</div>

              <div className={styles['product-list']}>
                {
                  data.products.map((item, index) => <div key={index} className={styles['products__item']}><Card title={item.title} src={item.listing} href={`${productUrl}/${slug(item.title)}-${item.id}-${item.subcat_id}-${item.cat_id}`} /></div> )
                }
              </div>
            </div>
          </div> }

          {data?.blogs && <div className={styles['search-list']}>
            <div className='container'>
              <div className='min-title'>Blog</div>

              <div className={styles['blog-list']}>
                {
                  data.blogs.map((item, index) => <div key={index} className={styles['products__item']}> <Card title={item.title} desc={item.description} href={`${blogUrl}/${slug(item.title)}-${item.id}-${item.cat_id}`} src={item.listing} /></div>)
                }
              </div>
            </div>
          </div> }
            
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