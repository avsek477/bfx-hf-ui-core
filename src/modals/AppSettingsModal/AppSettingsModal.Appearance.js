import React, {
  memo, useMemo, useState, useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import _values from 'lodash/values'
import _map from 'lodash/map'

import { Checkbox } from '@ufx-ui/core'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'
import LanguageSettings from '../../components/Navbar/Navbar.LanguageSettings'
import Dropdown from '../../ui/Dropdown'
import {
  SETTINGS_KEYS,
  getThemeSetting,
  THEMES,
} from '../../redux/selectors/ui'
import { isElectronApp } from '../../redux/config'

const Appearance = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const settingsTheme = useSelector(getThemeSetting)
  const [currentTheme, setCurrentTheme] = useState(settingsTheme)
  const [isMinimiseToTrayChecked, setIsMinimiseToTrayChecked] = useState()

  const themes = useMemo(
    () => _map(_values(THEMES), (value) => ({
      label: t(`appSettings.${value}`),
      value,
    })),
    [t],
  )

  useEffect(() => {
    setCurrentTheme(settingsTheme)
  }, [settingsTheme])

  const updateTheme = (nextTheme) => {
    setCurrentTheme(nextTheme)
    dispatch(WSActions.saveSettings(SETTINGS_KEYS.THEME, nextTheme))
    dispatch(GAActions.updateSettings())
    localStorage.setItem(SETTINGS_KEYS.THEME, nextTheme)
  }

  return (
    <div className='appsettings-modal__appearance_setting'>
      <div className='appsettings-modal__setting'>
        <p>{t('appSettings.language')}</p>
        <LanguageSettings />
      </div>
      <div className='appsettings-modal__setting'>
        <Dropdown
          label={t('appSettings.themeSetting')}
          onChange={updateTheme}
          value={currentTheme}
          options={themes}
        />
      </div>

      {isElectronApp && (
        <>
          <br />
          <div className='appsettings-modal__setting'>
            <Checkbox
              onChange={() => {}}
              label={t('appSettings.minimizeToTrayCheckbox')}
              checked
              className='appsettings-modal__checkbox'
            />
            <div className='appsettings-modal__description'>
              {t('appSettings.minimizeToTrayText')}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default memo(Appearance)
