/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image'

import {StaticI18nLink} from "../"
import styles from './Header.module.scss';

export const Header = (props) => { 
  const { type } = props;
  const [logoType, setLogoType] = useState(type)
  
  return (
      <header className={classNames(styles['header'], {[styles['header--transparent']] : logoType !== "default" })}>
        <div className='container'>
          <StaticI18nLink href='/'>
            <a>
              { logoType === "default" && <Image src={'/images/content/logo/logo.svg'} width={'181'} height={'36'} layout={'fixed'} /> }
              { logoType !== "default" && <Image src={'/images/content/logo/logo-white.svg'} width={'181'} height={'36'} layout={'fixed'} /> }
            </a>
          </StaticI18nLink>
        </div>
      </header>
  )
}

Header.propTypes = {
	type: PropTypes.string
};

Header.defaultProps = {
	type: "default",
}