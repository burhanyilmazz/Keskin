/* eslint-disable jsx-a11y/alt-text */
import {useEffect, useRef} from 'react'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import i18nextConfig from '../../next-i18next.config'
import { getI18nPaths } from '../../getI18nPaths'
import classNames from 'classnames';
import fetch from 'isomorphic-unfetch'

import {Loader} from '@googlemaps/js-api-loader';

import { Layout } from '../../layout'
import { ContactCard, ContactForm, Newsletter } from '../../components';

import styles from '../../assets/styles/Contact.module.scss'

import { contact } from '../../utils/Contact';
import { mapOptions } from '../../utils/Map';

export default function Contact({products}) {
  const { t } = useTranslation('common');

  const googlemap = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyALsmBLvMeKOlK2M5SHs2_jgYeJM-6UdBU",
      sensor: false,
      language: 'tr'
    });
    let map;

    loader.load().then(() => {
      const google = window.google;
      const bounds = new google.maps.LatLngBounds();
      const image = "/images/content/contact/pin.png";

      map = new google.maps.Map(googlemap.current, mapOptions);

      contact.map((item, index) => {
        const marker = new google.maps.Marker({
          position: {lat: item.coordinate.lat, lng: item.coordinate.lng},
          map: map,
          icon: image
        });

        bounds.extend(marker.position);
      })

      map.fitBounds(bounds);
    });
  });

  return (
    <>
      <Head>
        <title>Keskin Yapı</title>
        <meta name="description" content={t('CONTACT.SUBTITLE')} />
      </Head>
      
      <Layout products={products}>
        <div id="map" ref={googlemap} />
        <div className={classNames('content', styles['contact'])}>
          <div className='container'>
            <div className={styles['list']}>
              { contact.map((item, index) => <ContactCard key={index} data={item} /> )}
            </div>

            <div className={styles['form']}>
              <div className={styles['text']}>
                <div className='min-title'>{t('SIDEBAR.CONTACT')}</div>
                <h3>{t('CONTACT_FORM.TEXT')}</h3>
              </div>
              <div className={styles['box']}>
                <ContactForm title={t('CONTACT_FORM')} />
              </div>
            </div>
          </div>
        </div>

        <section className={styles['newsletter']}>
          <Newsletter title={t('NEWSLETTER.NEWS_TITLE')} text={t('NEWSLETTER.NEWS_DESC')} type='subscription'/>
        </section>
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
    },
    revalidate: 10
  }
}