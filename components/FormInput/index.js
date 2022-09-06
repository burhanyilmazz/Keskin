import { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './FormInput.module.scss';

export const FormInput = (props) => { 
  const { className, field, value, maxLength, onChange, onKeyUp, onFocus, name, dataDirty, type, autocomplete, required, autoFocus } = props;
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
    <div className={classNames(styles['input'], className)}>
      <input 
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

FormInput.propTypes = {
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
};

FormInput.defaultProps = {
  field: "",
  value: "",
  type: "text",
  dataDirty: false
}