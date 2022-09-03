import classNames from 'classnames';
import PropTypes from 'prop-types';

export const Icon = (props) => {
    const { icon, className } = props;

    return <i className={classNames('icon', {[`icon-${icon}`] : icon}, className)} />;
}

Icon.propTypes = {
	icon: PropTypes.string,
	className: PropTypes.string
};