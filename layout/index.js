import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Header, Hamburger, Footer, SearchIcon } from '../components/';
import styles from './Layout.module.scss';

export const Layout = (props) => { 
  const { transparent, products, className } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.querySelector('html').classList.remove('disable-scroll')
  }, [])
  

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
  }
  
  return (
    <>
      <Header transparent={transparent} />
      <SearchIcon transparent={transparent} onClick={(event) => handleOnClickSearch(event)} isOpen={searchOpen} />
      <Hamburger transparent={transparent} onClick={(event) => handleOnClickNav(event)} isOpen={sidebarOpen} />
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