/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nextConfig from '../../../next-i18next.config'
import { useTranslation } from 'next-i18next';
import { Layout } from '../../../layout'
import { getI18nPaths } from '../../../getI18nPaths';

import styles from '../../../assets/styles/Blog.module.scss'

import { TopBar, Card,  RightNav } from '../../../components';
import classNames from 'classnames';

import fetch from 'isomorphic-unfetch'
import slug from 'slug'

export default function Blog({products, blogs, popular}) {
  const { i18n } = useTranslation('common');
  const detailUrl = i18n.language === 'tr' ? '/blog-detay' : '/blog-detail';

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content="Keskin Yapı" />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={"/images/content/blog/head.jpg"}
          title={'Blog'}
        />
        <div className='content'>
         <div className={classNames('container', styles['blog'])}>
            <div className={styles['list']}>
              {
                blogs.map(item => {
                  if (item.blogs) {
                    return (
                      item.blogs.map((blog, i) => <Card 
                        key={i}
                        title={blog.title} 
                        desc={blog.description} 
                        href={`${detailUrl}/${slug(blog.title)}-${blog.id}-${item.category.id}`} 
                        src={blog.listing}                
                      />)
                    )
                  }
                }
              )}
            </div>

            <RightNav categories={blogs} popular={popular} />
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
  const blogs = await fetch(`${process.env.API_URL}/blogs/aio`, options).then(r => r.json()).then(data => data.Result);
  const popular = await fetch(`${process.env.API_URL}/blogs/populer`, options).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      products,
      blogs,
      popular,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    },
    revalidate: 10
  }
}