import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

import HFIcon from '../../ui/HFIcon'
import AuthenticationInitForm from './AuthenticationInitForm'
import AuthenticationUnlockForm from './AuthenticationUnlockForm'
import AuthenticationConnectingForm from './AuthenticationConnectingForm'
import { isElectronApp, appVersion } from '../../redux/config'

import './style.css'

const Authentication = ({
  wsConnected,
  configured,
  onUnlock,
  onInit,
  onReset,
  isPaperTrading,
}) => {
  const { t } = useTranslation()

  return (
    <div className='hfui-authenticationpage__wrapper'>
      <div className='hfui-authenticationpage__inner'>
        <div className='hfui-authenticationpage__inner-left'>
          <HFIcon />
          <div className='hfui-authenticationpage__inner-left-version-container'>
            <div className='hfui-authenticationpage__inner-left-version'>
              <h6>{t('main.craftedBy')}</h6>
              {isElectronApp && (
                <p>
                  v
                  {appVersion}
                </p>
              )}
            </div>
          </div>
        </div>

        {!wsConnected ? (
          <AuthenticationConnectingForm />
        ) : configured ? (
          <AuthenticationUnlockForm
            onUnlock={onUnlock}
            onReset={onReset}
            isPaperTrading={isPaperTrading}
          />
        ) : (
          <AuthenticationInitForm
            onInit={onInit}
          />
        )}
      </div>
    </div>
  )
}

Authentication.propTypes = {
  wsConnected: PropTypes.bool.isRequired,
  configured: PropTypes.bool.isRequired,
  isPaperTrading: PropTypes.bool.isRequired,
  onUnlock: PropTypes.func.isRequired,
  onInit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
}

export default memo(Authentication)
