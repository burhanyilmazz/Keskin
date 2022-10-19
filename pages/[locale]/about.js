/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { Layout } from '../../layout'
import { getI18nPaths } from '../../getI18nPaths'
import fetch from 'isomorphic-unfetch'

import styles from '../../assets/styles/About.module.scss'

import { TopBar, Newsletter } from '../../components';
import Image from 'next/image'
import classNames from 'classnames';

export default function About({products}) {
  const { t, i18n } = useTranslation('common');

  const pageUrl = i18n.language === 'tr' ? '/hakkimizda' : '/about';

  const breadcrumbs = [
    {
      title: 'Corparate',
      href: pageUrl
    },
    {
      title: "About Us",
      href: pageUrl
    }
  ]

  return (
    <>
      <Head>
        <title>Keskin Yapı | About</title>
        <meta name="description" content="Since 1969..." />
      </Head>
      
      <Layout products={products}>
        <TopBar 
          img={"/images/content/about/head.jpg"}
          title={"About Us"}
          breadcrumbs={breadcrumbs}
        />
        <div className='content text'>
          <div className={classNames('container', styles['about'])}>
            <div className='min-title'>About Us</div>
            <div className={styles['content']}>
              <h2>Since 1969...</h2>
              <div>
                <p>Keskin Yapı, which we laid the foundations of as a modest company in 1969, is the distributor of dozens of national and international brands and offers rich content for your living spaces with more than 1000 product range. It is proud of being one of the leading companies in the sector by providing accurate and fast delivery thanks to its logistics fleet of 20 vehicles, along with a total of 10.000m2 store and storage area.</p> <p>As Keskin Yapı, we are the main dealer of NG Kütahya Seramik in Bakırköy and provide you with impressive solutions for your living spaces in a closed area of 1,500 m2. With the dynamism of our continuous development of our product range; We offer a wide range of services from ceramic and bathroom products to paint products, from rough construction materials to electrical materials.</p><p>We continue to move forward with strong steps in the sector by offering a wide range of products, reaching 20,000 varieties, to the dealers or dealers of many different domestic and foreign companies that have proven themselves in the world.</p><p>We have an active presence in the market by serving nationally and internationally, with our strong logistics fleet of 20 vehicles, our experienced staff of 60, and our years of experience. </p><p>Working in integration with Geyik Architecture, which was founded in 2019 by Ahmet Geyik`s grandchildren, we produce modern and useful solutions for our customers.</p>
              </div>
            </div>
            <div className={classNames(styles['image'], 'image')}>
              <Image src='/images/content/about/about.jpg' width={442} height={480} layout={'responsive'} />
            </div>
          </div>
          
          <div className={classNames('container', styles['quality'])}>
            <div className='min-title'>Our Quality Policy</div>
            <div className={styles['content']}>
              <h2>We are a company that respects the environment and society!</h2>
                
              <div className={styles['policy']}>
                <div className={classNames(styles['image'], 'image')}>
                  <Image src='/images/content/about/quality.jpg' width={572} height={480} layout={'responsive'} />
                </div>
                <p>By providing sustainability in product and service quality, it is an exemplary company for the environment and society, and we continue our processes within the framework of values such as making decisions for customer satisfaction in trust with our business partners, providing services, and ensuring continuous development and progress with dynamic solution partnership, respect for ethical values, and never compromising on education. We aim to make it more efficient.</p>            
              </div>
            </div>
          </div>

          <section className={classNames(styles['newsletter'], 'white-bg')}>
            <Newsletter type='joinUs' title="Join Our Team" text="All of our candidates are very valuable to us in the recruitment processes!" />
          </section>
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