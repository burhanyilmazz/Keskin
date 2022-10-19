/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../../next-i18next.config'
import { Layout } from '../../../layout'

import styles from '../../../assets/styles/BlogDetail.module.scss'

import { TopBar, Card, RightNav, SocialMedia, Icon } from '../../../components';
import Image from 'next/image'
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';

import fetch from 'isomorphic-unfetch'
import slug from 'slug'

export default function Blogetail({products, blogs, popular, blog, blogCat}) {
  const { t, i18n } = useTranslation('common');

  const detailUrl = i18n.language === 'tr' ? '/blog-detay' : '/blog-detail';

  const date = new Date(blog.created_at);
  const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`
  const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`

  const breadcrumbs = [
    {
      title: 'Blog',
      href: '/blog'
    },
    {
      title: blogCat.category.title,
      href: `/blog/${slug(blogCat.category.title)}-${blogCat.category.id}`
    },
    {
      title: blog.title,
      href: `${detailUrl}/${slug(blog.title)}-${blog.id}-${blogCat.category.id}`
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
          img={blog.headerImage}
          title={blog.title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content'>
          <div className={classNames('container', styles['blog-detail'])}>
            <div className={styles['blog-post']}>
              <div className={styles['desc']}>
                <h3>{day}.{month}.{date.getFullYear()}</h3>
                <h2>{blog.title}</h2>
                <div dangerouslySetInnerHTML={{__html: blog.description}} />
              </div>

              <div className={styles['images']}>
                <Image src={blog.image} width={745} height={344} layout={'responsive'} />
              </div>

              <div className={styles['content']} dangerouslySetInnerHTML={{__html: blog.content}} />

              <div className={styles['social-media']}>
                <span>Share Post</span>
                <SocialMedia />
              </div>
            </div>
            <RightNav categories={blogs} popular={popular} />
          </div>
          
          <section className={classNames(styles['section'], styles['white'], styles['recommended'])}>
            <div className='container'>
              <div className={styles['content']}>
                <h2>
                You May Be Interested
                  <br />
                  Other Posts
                </h2>
              </div>
            </div>

            <div className={styles['recommended-list']}>
              <div className={styles['navigation']}>
                <div className='button-next'><Icon icon='arrow' /></div>
                <div className='button-prev'><Icon icon='arrow' /></div>
              </div>
              <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={24}
                slidesPerView={'auto'}
                navigation={{
                  nextEl: '.button-next',
                  prevEl: '.button-prev',
                }}
                className={styles['recommended__slider']}
              >
                {
                  blogCat.blogs?.map((item, index) => {
                    return <SwiperSlide key={index} className={styles['recommended__slide']}><Card src={item.listing} title={item.title} desc={item.description} href={`${detailUrl}/${slug(item.title)}-${item.id}-${blogCat.category.id}`}  /></SwiperSlide>
                  })
                }
              </Swiper>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  let paths = [];
  const blogListTr = []
  const blogListEn = []

  const optionsTr = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language: 'tr' })
  }

  const blogsTr = await fetch(`${process.env.API_URL}/blogs/aio`, optionsTr).then(r => r.json()).then(data => data.Result);

  blogsTr?.map(cat => cat?.blogs?.map(blog => {
    blog['catid'] = cat.category.id
    blogListTr.push(blog)
  }))

  blogListTr?.map(item => {
    paths.push({ params: { "locale": 'tr', "slug": `${slug(item.title)}-${item.id}-${item.catid}` }})
  })

  const optionsEn = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language: 'en' })
  }

  const blogsEn = await fetch(`${process.env.API_URL}/blogs/aio`, optionsEn).then(r => r.json()).then(data => data.Result);

  blogsEn?.map(cat => cat?.blogs?.map(blog => {
    blog['catid'] = cat.category.id
    blogListEn.push(blog)
  }))

  blogListEn?.map(item => {
    paths.push({ params: { "locale": 'tr', "slug": `${slug(item.title)}-${item.id}-${item.catid}` }})
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
  const blogs = await fetch(`${process.env.API_URL}/blogs/aio`, options).then(r => r.json()).then(data => data.Result);
  const popular = await fetch(`${process.env.API_URL}/blogs/populer`, options).then(r => r.json()).then(data => data.Result);
  const blogCat = blogs.find(item => item?.category?.id == catid);
  const blog = blogCat?.blogs?.find(item => item?.id == id )

  await fetch(`${process.env.API_URL}/blogs/counter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language, blog_id: id })
  })

  return {
    props: {
      products,
      blogs,
      popular,
      blog,
      blogCat,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    },
    revalidate: 10,
  }
}