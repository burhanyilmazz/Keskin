import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Header, Hamburger, Footer, SearchIcon, SearchBar } from '../components/';

export const Layout = (props) => { 
  const { transparent, products, className } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerTransparent, setHeaderTransparent] = useState(transparent);

  useEffect(() => {
    document.querySelector('html').classList.remove('disable-scroll')
  }, [])
  
 /*  useEffect(() => {
    setHeaderTransparent(!headerTransparent)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchOpen]) */

  const handleOnClickNav = (event) => {
    event 
      ? document.querySelector('html').classList.add('disable-scroll') 
      : document.querySelector('html').classList.remove('disable-scroll')
    setSidebarOpen(event)
    setSearchOpen(false)
  }

  const handleOnClickSearch = (event) => {
    event 
      ? document.querySelector('html').classList.add('disable-scroll') 
      : document.querySelector('html').classList.remove('disable-scroll')
    setSidebarOpen(false)
    setSearchOpen(event)
    setHeaderTransparent(!event)
  }

  
  return (
    <>
      <Header transparent={headerTransparent} search={headerTransparent} />
      <SearchIcon transparent={headerTransparent} onClick={(event) => handleOnClickSearch(event)} isOpen={searchOpen} />
      <SearchBar isShow={searchOpen} />
      <Hamburger transparent={headerTransparent} onClick={(event) => handleOnClickNav(event)} isOpen={sidebarOpen} />
      <Sidebar isShow={sidebarOpen} products={products} />
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