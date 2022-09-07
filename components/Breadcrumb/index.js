import classNames from 'classnames';
import PropTypes from 'prop-types';

import {StaticI18nLink, Icon} from "../"
import styles from './Breadcrumb.module.scss';

export const Breadcrumb = (props) => { 
  const { className, data } = props;
  
  return (
      <ul className={classNames(styles['breadcrumb'], className)}>
        {
          data?.map((item, index) => {
            return (
              <li key={index}>
                <StaticI18nLink href={item.href}>
                  <a>
                    {item.title}
                    <Icon icon={'arrow'} />
                  </a>
                </StaticI18nLink>
              </li>
            )
          })
        }
      </ul>
  )
}

Breadcrumb.propTypes = {
  className: PropTypes.string,
	data: PropTypes.array,
};