/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image'

import {StaticI18nLink} from "../"
import styles from './Header.module.scss';

export const Header = (props) => { 
  const { transparent, searchBox } = props;
  const [colorLogo, setColorLogo] = useState(transparent);
  const [search, setSearch] = useState(searchBox);

  useEffect(() => {
    setColorLogo(transparent && searchBox ? false : transparent)
    setSearch(searchBox)
  }, [transparent, searchBox])
  
  return (
      <header className={classNames(styles['header'], {[styles['header--transparent']] : transparent, [styles['header--search']] : search })}>
        <div className='container-fluid'>
          <StaticI18nLink href='/'>
            <a>
              { !colorLogo && <Image src={'/images/content/logo/logo.svg'} width={'181'} height={'36'} layout={'fixed'} alt={'Keskin Yapı'} /> }
              { colorLogo && <Image src={'/images/content/logo/logo-white.svg'} width={'181'} height={'36'} layout={'fixed'} alt={'Keskin Yapı'} /> }
            </a>
          </StaticI18nLink>
        </div>
      </header>
  )
}

Header.propTypes = {
	transparent: PropTypes.bool,
	searchBox: PropTypes.bool
};

Header.defaultProps = {
	transparent: false,
	searchBox: false
}