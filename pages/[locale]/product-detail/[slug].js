/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../../next-i18next.config'
import { getI18nPaths } from '../../../getI18nPaths'
import { Layout } from '../../../layout'
import Image from 'next/image'

import fetch from 'isomorphic-unfetch'
import slug from 'slug'

import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from '../../../assets/styles/ProductDetail.module.scss'

import { LinkButton, TopBar, SeniorContact, Modal, Icon, Card, ContactForm } from '../../../components';
import classNames from 'classnames';

export default function ProductDetail({products, category, subcategories, product}) {
  const [modalOpen, setModalOpen] = useState(false);
  const { t, i18n } = useTranslation('common');

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
    },
    {
      title: product.title,
      href: `${productsUrl}/${slug(product.title)}-${product.id}-${subcategories.category.id}-${category.category.id}`
    }
  ]

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content='' />
      </Head>
      
      <Layout products={products} className='white-bg'>
         <TopBar 
          img={product.headerImage}
          title={product.title}
          breadcrumbs={breadcrumbs}
        />
        <div className='content'>
          <div className={classNames('container', styles['product-detail'])}>
            <div className={styles['text']}>
              <h2>{product.title}</h2>
              <div className={styles['pd-content']} dangerouslySetInnerHTML={{__html: product.content}} />
              {product.pdfFile && <LinkButton href={product.pdfFile} text={t('TDS')} icon={'download'} className={styles['button']}/> }
            </div>
            <div className={styles['image']}>
              <Image src={product.image} width={'100%'} height={'100%'} layout={'responsive'} objectFit={'cover'} objectPosition={'center'} /> 
            </div>
          </div>
        </div>

        <section className={classNames(styles['section'])}>
          <SeniorContact onClick={() => setModalOpen(true)} />
        </section>

        <section className={classNames(styles['section'], styles['white'], styles['recommended'])}>
          <div className='container'>
            <div className={styles['content']}>
              <h2>
                {product.title}
                <br />
                {t('RECOMMEND_PRODUCT')}
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
                subcategories.products?.map((item, index) => {
                  const url = `${productsUrl}/${slug(item.title)}-${item.id}-${subcategories.category.id}-${category.category.id}`
                  return <SwiperSlide key={index} className={styles['recommended__slide']}><Card title={item.title} src={item.listing} desc={item.content} href={url} /></SwiperSlide>
                })
              }
            </Swiper>
          </div>
        </section>

        {modalOpen && <Modal onClose={() => setModalOpen(false)}>
          <div className={styles['modal']}>
            <ContactForm type={'product'} title={t('CONTACT_FORM')} pid={product.id} />
          </div>
        </Modal> }
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

  productsTr?.map(cat => cat?.subcategories?.map(subcategories => subcategories.products?.map(products => {
    products['catid'] = cat.category.id;
    products['subcatid'] = subcategories.category.id;
    productListTr.push(products)
  })))
  
  productListTr?.map(item => {
    paths.push({ params: { "locale": 'tr', "slug": `${slug(item.title)}-${item.id}-${item.subcatid}-${item.catid}` }})
  })

  const optionsEn = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language: 'en' })
  }

  const productsEn = await fetch(`${process.env.API_URL}/products/aio`, optionsEn).then(r => r.json()).then(data => data.Result);

  productsEn?.map(cat => cat.subcategories.map(subcategories => subcategories.products.map(products => {
    products['catid'] = cat.category.id;
    products['subcatid'] = subcategories.category.id;
    productListEn.push(products)
  })))
  
  productListEn?.map(item => {
    paths.push({ params: { "locale": 'tr', "slug": `${slug(item.title)}-${item.id}-${item.subcatid}-${item.catid}` }})
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(ctx) {
  const catid = ctx.params.slug.split('-').slice(-1)[0]
  const subcatid = ctx.params.slug.split('-').slice(-2)[0]
  const id = ctx.params.slug.split('-').slice(-3)[0]

  const language = ctx.params.locale;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ language })
  }

  const products = await fetch(`${process.env.API_URL}/products/aio`, options).then(r => r.json()).then(data => data.Result);
  const category = products?.find(item => item.category.id == catid);
  const subcategories = category?.subcategories.find(item => item.category.id == subcatid )
  const product = subcategories?.products.find(item => item.id == id )

  return {
    props: {
      products,
      category,
      subcategories,
      product,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    }
  }
}