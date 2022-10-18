/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'
import fetch from 'isomorphic-unfetch'

import styles from '../../assets/styles/Dealership.module.scss'

import { TopBar } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Dealership({products, dealer}) {
  const { t } = useTranslation('common');

  const breadcrumbs = [
    {
      title: t('DEALER.TITLE'),
      href: '/dealership'
    }
  ]

  return (
    <>
      <Head>
        <title>Keskin Yapı | Dealership</title>
        <meta name="description" content="Keskin Yapı" />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={"/images/content/dealership/head.jpg"}
          title={t('DEALER.TITLE')}
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['dealership'])}>
						<div className='min-title'>{t('DEALER.TITLE')}</div>
            <div className={styles['content']}>
							<h2>{t('DEALER.SUBTITLE')}</h2>
							<ul className={styles['list']}>
								{ dealer.map((item, index) => <li key={index}><Image alt={item?.title} src={item.logo} width={76} height={30} layout={'responsive'} /></li> )}
							</ul>
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
  const dealer = await fetch(`${process.env.API_URL}/dealer_logos`, options).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      products,
      dealer,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    },
  }
}