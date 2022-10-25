/* eslint-disable jsx-a11y/alt-text */

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'
import fetch from 'isomorphic-unfetch'

import styles from '../../assets/styles/Export.module.scss'

import { TopBar } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Export({products}) {
  const { t, i18n } = useTranslation('common');

  const pageUrl = i18n.language === 'tr' ? '/ihracat' : '/export';

  const breadcrumbs = [
    {
      title: 'Corparate',
      href: pageUrl
    },
    {
      title: t('EXPORT.TITLE'),
      href: pageUrl
    }
  ]

  return (
    <>
      <Layout products={products}>
        <TopBar 
          img={"/images/content/export/head.jpg"}
          title="Export"
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['export'])}>
            <div className='min-title'>Export</div>
            <div className={styles['content']}>
              <h2>We export to 3 continents and 28 different countries!</h2>
              <div>
                <p>As Keskin Yapı, we proudly represent our country abroad and export to 28 different countries on 3 continents, primarily Europe. </p>
                <p>Our company, which brings the manufacturers and the world together, aims to deliver many products and brands such as ceramics, sanitary ware, sanitary ware and electrical materials to our customers with a quality above world standards. </p>
                <p>We make sure that we take responsibility for the trust and belief that our customers show in us, with timely delivery and a transparent work. While doing this, we hope that we add value to both our internal and external stakeholders by believing in every step we take. </p>
              </div>
            </div>
            <div className={classNames(styles['image'], 'image')}>
              <Image alt='Export' src='/images/content/export/export.jpg' width={485} height={431} layout={'responsive'} />
            </div>
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