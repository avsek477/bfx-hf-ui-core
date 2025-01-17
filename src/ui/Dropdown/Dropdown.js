import React, { memo, useMemo } from 'react'
import PropTypes from 'prop-types'
import _reduce from 'lodash/reduce'

import { Dropdown as UfxDropdown } from '@ufx-ui/core'
import './style.css'
import { useTranslation } from 'react-i18next'

function optionsAdaptor(options) {
  return _reduce(options, (nextOptions, option) => ({
    ...nextOptions,
    [option.value]: option.label,
  }), {})
}

function Dropdown(props) {
  const { t } = useTranslation()
  const {
    icon,
    label,
    value,
    isOpen,
    options,
    highlight,
    className,
    placeholder = t('ui.dropdown'),
    ...rest
  } = props

  const adaptedOptions = useMemo(() => optionsAdaptor(options), [options])

  return (
    <div className='hfui-dropdown__wrapper'>
      {label && (
        <p>{label}</p>
      )}

      <UfxDropdown
        value={value}
        className={className}
        closeOnMouseLeave={false}
        options={adaptedOptions}
        valueRenderer={icon ? (_value, optionLabel) => (
          <div className='selected-text has-icon'>
            {icon && <i className={`icon-${icon}`} />}
            <div>
              {optionLabel || placeholder}
            </div>
          </div>
        ) : undefined}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  )
}

Dropdown.propTypes = {
  isOpen: PropTypes.bool,
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  highlight: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
}
Dropdown.defaultProps = {
  value: '',
  icon: null,
  label: null,
  isOpen: false,
  className: '',
  disabled: false,
  highlight: false,
  placeholder: undefined,
}

export default memo(Dropdown)
