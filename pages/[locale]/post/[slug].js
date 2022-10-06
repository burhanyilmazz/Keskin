/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../../next-i18next.config'

import unfetch from 'isomorphic-unfetch'
import slug from 'slug'

import { Layout } from '../../../layout'

import styles from '../../../assets/styles/About.module.scss'

import { products } from '../../../utils/Products';
import { TopBar, Newsletter } from '../../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Post({ character }) {
  const { t } = useTranslation('common');

  const breadcrumbs = [
    {
      title: t('SIDEBAR.CORPARATE'),
      href: '/about'
    },
    {
      title: t('ABOUT.TITLE'),
      href: '/about'
    }
  ]

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content={t('ABOUT.SUBTITLE')} />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={"/images/content/about/head.jpg"}
          title={t('ABOUT.TITLE')}
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['about'])}>
            <div className='min-title'>{character.name}</div>
            <div className={styles['content']}>
              <h2>{t('ABOUT.SUBTITLE')}</h2>
              <div dangerouslySetInnerHTML={{__html: t('ABOUT.DESC')}} />
            </div>
          </div>
          
        </div>
      </Layout>
    </>
  )
}


export async function getStaticPaths() {
  const data = await unfetch('https://rickandmortyapi.com/api/character/')
  const characters = await data.json()
  const lang = ['tr', 'en'];

  const paths = characters.results.map(character => {
    return (
      lang.map((lng) => {
        return { params: { locale: lng, slug: `${slug(character.name)}-${character.id}` } }
      })
    )
  })

  const newPath = [];
  paths.map(item => {
    return item.map(t => {
      newPath.push(t)
    })
  })

  return {
    paths: newPath,
    fallback: false
  }
}

export async function getStaticProps(ctx) {
  const id = ctx.params.slug.split('-').slice(-1)[0]
  const data = await unfetch('https://rickandmortyapi.com/api/character/' + id)
  const character = await data.json()

  return {
    props: {
      character,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    }
  }
}