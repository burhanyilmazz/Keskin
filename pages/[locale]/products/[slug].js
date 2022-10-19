/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nextConfig from '../../../next-i18next.config'
import { useTranslation } from 'next-i18next';
import { Layout } from '../../../layout'

import styles from '../../../assets/styles/ProductList.module.scss'

import fetch from 'isomorphic-unfetch'
import slug from 'slug'

import { LeftNav, TopBar, Card } from '../../../components';
import classNames from 'classnames';

export default function Product({products, category}) {
  const { i18n } = useTranslation('common');
  const brandsUrl = i18n.language === 'tr' ? '/marka' : '/brands';

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content='' />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={category?.category.headerImage}
          title={category?.category.title}
        />
        <div className='content'>
          <div className={classNames('container', styles['product-list'])}>
            <LeftNav products={products} />
            <div className={styles['products']}>
              {
                category?.subcategories?.map((item, index) => {
                  const url = `${brandsUrl}/${slug(item.category.title)}-${item.category.id}-${category.category.id}`
                  return (
                    <div key={index} className={styles['products__item']}><Card title={item.category.title} src={item.category.image} href={url} /></div>
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


export async function getStaticPaths() {
  let paths = [];
  const optionsTr = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language: 'tr' })
  }

  const productsTr = await fetch(`${process.env.API_URL}/products/aio`, optionsTr).then(r => r.json()).then(data => data.Result);

  productsTr?.map(cat => {
    paths.push({ params: { locale: 'tr', slug: `${slug(cat.category.title)}-${cat.category.id}` } })
  })

  const optionsEn = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language: 'en' })
  }

  const productsEn = await fetch(`${process.env.API_URL}/products/aio`, optionsEn).then(r => r.json()).then(data => data.Result);

  productsEn?.map(cat => {
    paths.push({ params: { locale: 'en', slug: `${slug(cat.category.title)}-${cat.category.id}` } })
  })

  return {
    paths,
    fallback: "blocking"
  }
}

export async function getStaticProps(ctx) {
  const id = ctx.params.slug.split('-').slice(-1)[0]
  const language = ctx.params.locale;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language })
  }

  const products = await fetch(`${process.env.API_URL}/products/aio`, options).then(r => r.json()).then(data => data.Result);
  const category = products.find(item => item.category.id == id);

  return {
    props: {
      products,
      category,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    },
    revalidate: 10,
  }
}