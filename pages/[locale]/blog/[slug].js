/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../../next-i18next.config'
import { Layout } from '../../../layout'

import styles from '../../../assets/styles/Blog.module.scss'
import { TopBar, Card,  RightNav } from '../../../components';
import classNames from 'classnames';

import fetch from 'isomorphic-unfetch'
import slug from 'slug'

export default function Blog({products, blogs, popular, category}) {

  const { i18n } = useTranslation('common');
  const detailUrl = i18n.language === 'tr' ? '/blog-detay' : '/blog-detail';

  const breadcrumbs = [
    {
      title: 'Blog',
      href: '/blog'
    },
    {
      title: category.category.title,
      href: `/blog/${slug(category.category.title)}`
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
          img={category.category.headerImage}
          title={category.category.title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content'>
          <div className={classNames('container', styles['blog'])}>
            <div className={styles['list']}>
              {
                category?.blogs?.map((item, index) => <Card 
                  key={index}
                  title={item.title} 
                  desc={item.description} 
                  href={`${detailUrl}/${slug(item.title)}-${item.id}-${category.category.id}`} 
                  src={item.listing}                
                />
              )
              }
            </div>

            <RightNav categories={blogs} popular={popular} />
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

  const blogsTr = await fetch(`${process.env.API_URL}/blogs/aio`, optionsTr).then(r => r.json()).then(data => data.Result);

  blogsTr?.map(cat => {
    paths.push({ params: { locale: 'tr', slug: `${slug(cat.category.title)}-${cat.category.id}` } })
  })

  const optionsEn = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language: 'en' })
  }

  const blogsEn = await fetch(`${process.env.API_URL}/blogs/aio`, optionsEn).then(r => r.json()).then(data => data.Result);

  blogsEn?.map(cat => {
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
  const blogs = await fetch(`${process.env.API_URL}/blogs/aio`, options).then(r => r.json()).then(data => data.Result);
  const category = blogs.find(item => item?.category?.id == id);
  const popular = await fetch(`${process.env.API_URL}/blogs/populer`, options).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      products,
      blogs,
      category,
      popular,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    },
    revalidate: 10,
  }
}