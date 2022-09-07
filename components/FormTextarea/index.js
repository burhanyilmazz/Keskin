import { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './FormTextarea.module.scss';

export const FormTextarea = (props) => { 
  const { className, field, value, maxLength, onChange, onKeyUp, onFocus, name, dataDirty, type, autocomplete, required, autoFocus, rows } = props;
  const [ dirty, setDirty ] = useState(dataDirty);
  const [ newValue, setNewValue ] = useState(value);

  const handleChange = (event) => {
    const { value } = event.target;
    setDirty(value ? true : false);
    onChange && onChange(event);
  }

  const handleKeyUp = (event) => {
    const { value } = event.target;
    setNewValue(value)
    onKeyUp && onKeyUp(event);
  }

  const handleFocus = (event) => onFocus && onFocus(event);

  useEffect(() => {
      setDirty(newValue ? true : false);
  }, [value, newValue])
  
  return (
    <div className={classNames(styles['textarea'], className)}>
      <textarea 
        rows = {rows}
        maxLength = {maxLength}
        onChange = {handleChange}
        onKeyUp = {handleKeyUp}
        onFocus = {handleFocus}
        name = {name}
        defaultValue={newValue}
        data-dirty = {dirty}
        type = {type}
        autoComplete = {autocomplete}
        autoFocus={autoFocus}
      />
      {field && <label>{field} {required && <span>*</span>}</label> }
    </div>
  )
}

FormTextarea.propTypes = {
	field: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	maxLength: PropTypes.number,
	dataDirty: PropTypes.bool,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
	type: PropTypes.string,
	autocomplete: PropTypes.string,
	required: PropTypes.bool,
	autoFocus: PropTypes.bool,
	rows: PropTypes.number,
};

FormTextarea.defaultProps = {
  field: "",
  value: "",
  type: "text",
  dataDirty: false
}