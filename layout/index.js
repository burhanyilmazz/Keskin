import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Header, Hamburger, Footer, SearchIcon, SearchBar } from '../components/';

export const Layout = (props) => { 
  const { transparent, products, className } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerTransparent, setHeaderTransparent] = useState(false);

  useEffect(() => {
    document.querySelector('html').classList.remove('disable-scroll')
  }, [])
  
  const handleOnClickNav = (event) => {
    event 
      ? document.querySelector('html').classList.add('disable-scroll') 
      : document.querySelector('html').classList.remove('disable-scroll')
    setSidebarOpen(event)
    setSearchOpen(false)
    setHeaderTransparent(event)
  }

  const handleOnClickSearch = (event) => {
    event 
      ? document.querySelector('html').classList.add('disable-scroll') 
      : document.querySelector('html').classList.remove('disable-scroll')
    setSidebarOpen(false)
    setSearchOpen(event)
    setHeaderTransparent(event)
  }
  
  return (
    <>
      <Head>
        <title>Keskin Yapı Çözümleri - Yapı malzemelerinde 1000`den fazla ürün çeşidi</title>
        <meta name="description" content="1969 yılından bu yana ulusal ve uluslararası onlarca markanın distribütörlüğü ile yaşam alanlarınız için zarif çözümler sunuyoruz." />
      </Head>

      <Header transparent={transparent} isChange={headerTransparent} />
      <SearchIcon transparent={transparent} onClick={(event) => handleOnClickSearch(event)} isOpen={searchOpen} />
      <SearchBar isShow={searchOpen} />
      <Hamburger transparent={transparent} onClick={(event) => handleOnClickNav(event)} isOpen={sidebarOpen} />
      <Sidebar isShow={sidebarOpen} products={products} outsideClick={(event) => handleOnClickNav(event)} />
      <main className={className}>
        {props.children}
      </main>
      <Footer products={products} />
    </>
  )
}

Layout.propTypes = {
	type: PropTypes.string,
	className: PropTypes.string,
};

Layout.defaultProps = {
	type: "default",
}