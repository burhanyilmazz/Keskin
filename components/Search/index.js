import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';

import styles from './Search.module.scss';
import { FormInput, Icon } from '../';


export const Search = (props) => {
  const { isShow } = props;

  const { t } = useTranslation('common')

  return (
    <div className={styles['search']}>
      <form>
        <div className={styles['input']}>
          <div className={styles['input-icon']}><Icon icon={'search'} /></div>
          <FormInput field={t('SEARCH.BAR.INPUT')} className={styles['search-input']} name={'search'} />
          <div className={styles['input-submit']}><Icon icon={'enter'} /></div>
        </div>
      </form>
    </div>
  )
}

Search.propTypes = {
	isShow: PropTypes.bool,
};

Search.defaultProps = {
	isShow: false,
}