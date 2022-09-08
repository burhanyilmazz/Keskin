import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Header, Hamburger, Footer } from '../components/';
import styles from './Layout.module.scss';

export const Layout = (props) => { 
  const { transparent, products, className } = props;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOnClick = (event) => {
    event 
      ? document.querySelector('html').classList.add('disable-scroll') 
      : document.querySelector('html').classList.remove('disable-scroll')
    setSidebarOpen(event)
  }
  
  return (
    <>
      <Header transparent={transparent} />
      <Hamburger transparent={transparent} onClick={(event) => handleOnClick(event)} />
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