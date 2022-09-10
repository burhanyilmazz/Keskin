import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import styles from './SearchBar.module.scss';
import { Search } from '../';


export const SearchBar = (props) => {
  const { isShow } = props;

  const { t } = useTranslation('common')

  return (
    <div className={classNames(styles['search'], {[styles['search--open']] : isShow })}>
      <div className={styles['wrap']}>
        <div className='container'>
          <h4>{t('SEARCH.BAR.TITLE')}</h4>
          <p>{t('SEARCH.BAR.DESC')}</p>

          <Search />
        </div>
      </div>
    </div>
  )
}

SearchBar.propTypes = {
	isShow: PropTypes.bool,
};

SearchBar.defaultProps = {
	isShow: false,
}