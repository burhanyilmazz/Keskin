/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { Layout } from '../../layout'
import { getI18nPaths } from '../../getI18nPaths'
import fetch from 'isomorphic-unfetch'

import styles from '../../assets/styles/Career.module.scss'

import { TopBar, ContactForm } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Career({products}) {
  const { t, i18n } = useTranslation('common');

  const pageUrl = i18n.language === 'tr' ? '/kariyer' : '/career';

  const breadcrumbs = [
    {
      title: t('CAREER.TITLE'),
      href: pageUrl
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
          img={"/images/content/career/head.jpg"}
          title={t('CAREER.TITLE')}
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['career'])}>
            <div className='min-title'>{t('CAREER.TITLE')}</div>
            <div className={styles['content']}>
              <h2>{t('CAREER.SUBTITLE')}</h2>
              <div dangerouslySetInnerHTML={{__html: t('CAREER.DESC')}} />
            </div>

            <div className={classNames(styles['image'], 'image')}>
              <Image src='/images/content/career/career.jpg' width={442} height={480} layout={'responsive'} />
            </div>
          </div>
          <div className={classNames('container', 'contact', styles['contact'])}>
            <ContactForm title={t('CAREER_FORM')} type = 'hr'/>
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
    }
  }
}