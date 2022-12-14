/* eslint-disable jsx-a11y/alt-text */

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import { Layout } from '../../layout'
import fetch from 'isomorphic-unfetch'

import styles from '../../assets/styles/Dealership.module.scss'

import { TopBar } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function Dealership({products, dealer}) {
  return (
    <>
      <Layout products={products}>
        <TopBar 
          img={"/images/content/dealership/head.jpg"}
          title="Bayilikler"
        />
        <div className='content text'>
          <div className={classNames('container', styles['dealership'])}>
						<div className='min-title'>Bayilikler</div>
            <div className={styles['content']}>
							<h2>Dürüstük ve güven ilkelerine bağlı kalarak, her daim alanında en büyük markalarla çözüm ortaklığını devam ettirerek büyümeye devam ediyoruz!</h2>
							<ul className={styles['list']}>
								{ dealer.map((item, index) => <li key={index}><Image alt={item?.title} src={item.logo} width={140} height={32} layout={'responsive'} /></li> )}
							</ul>
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
  const dealer = await fetch(`${process.env.API_URL}/dealer_logos`, options).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      products,
      dealer,
      ...await serverSideTranslations(ctx?.params?.locale, ['common'], i18nextConfig),
    },
    revalidate: 10,
  }
}