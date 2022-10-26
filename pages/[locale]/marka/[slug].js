/* eslint-disable jsx-a11y/alt-text */

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nextConfig from '../../../next-i18next.config'
import { useTranslation } from 'next-i18next';
import { Layout } from '../../../layout'

import styles from '../../../assets/styles/ProductList.module.scss'

import fetch from 'isomorphic-unfetch'
import slug from 'slug'

import { LeftNav, TopBar, Card, BackButton } from '../../../components';
import classNames from 'classnames';

export default function Product({products, category, subcategories}) {
  const { i18n } = useTranslation('common');

  const catUrl = i18n.language === 'tr' ? '/urunler' : '/products';
  const brandsUrl = i18n.language === 'tr' ? '/marka' : '/brands';
  const productsUrl = i18n.language === 'tr' ? '/urun-detay' : '/product-detail';

  const breadcrumbs = [
    {
      title: category.category.title,
      href: `${catUrl}/${slug(category.category.title)}-${category.category.id}`
    },
    {
      title: subcategories.category.title,
      href: `${brandsUrl}/${slug(subcategories.category.title)}-${subcategories.category.id}-${category.category.id}`
    }
  ]

  return (
    <>
      <Layout products={products}>
        <TopBar 
          img={subcategories?.category?.headerImage}
          title={subcategories?.category?.title}
          breadcrumbs={breadcrumbs}
          standart
        />
        <div className='content'>
          <div className={classNames('container', styles['product-list'])}>
            <BackButton />
            <LeftNav products={products} />
            <div className={styles['products']}>
              {
                subcategories?.products?.map((item, index) => {
                  const url = `${productsUrl}/${slug(item.title)}-${item.id}-${subcategories.category.id}-${category.category.id}`
                  return (
                    <div key={index} className={styles['products__item']}><Card title={item.title} src={item.image} href={url} /></div>
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
  const productListTr = []
  const productListEn = []

  const optionsTr = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language: 'tr' })
  }

  const productsTr = await fetch(`${process.env.API_URL}/products/aio`, optionsTr).then(r => r.json()).then(data => data.Result);

  productsTr?.map(cat => cat?.subcategories?.map(subcategories => {
    subcategories['catid'] = cat.category.id
    productListTr.push(subcategories)
  }))

  productListTr?.map(item => {
    paths.push({ params: { "locale": 'tr', "slug": `${slug(item.category.title)}-${item.category.id}-${item.catid}` }})
  })

  const optionsEn = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language: 'en' })
  }

  const productsEn = await fetch(`${process.env.API_URL}/products/aio`, optionsEn).then(r => r.json()).then(data => data.Result);

  productsEn?.map(cat => cat?.subcategories?.map(subcategories => {
    subcategories['catid'] = cat.category.id
    productListEn.push(subcategories)
  }))

  productListEn?.map(item => {
    paths.push({ params: { "locale": 'en', "slug": `${slug(item.category.title)}-${item.category.id}-${item.catid}` }})
  })

  return {
    paths,
    fallback: "blocking"
  }
}

export async function getStaticProps(ctx) {
  const catid = ctx.params.slug.split('-').slice(-1)[0]
  const id = ctx.params.slug.split('-').slice(-2)[0]
  const language = ctx.params.locale;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language })
  }

  const products = await fetch(`${process.env.API_URL}/products/aio`, options).then(r => r.json()).then(data => data.Result);
  const category = products?.find(item => item?.category?.id == catid);
  const subcategories = category?.subcategories?.find(item => item?.category?.id == id )

  return {
    props: {
      products,
      category,
      subcategories,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    },
    revalidate: 10,
  }
}