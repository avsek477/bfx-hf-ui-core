import React, { useState, useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'react-i18next'
import Panel from '../../ui/Panel'
import Chart from '../Chart'
import MarketSelect from '../MarketSelect'
import './style.css'
import { getPairFromMarket } from '../../util/market'

const ChartPanel = ({
  dark, label, onRemove, moveable, removeable, showChartMarket, markets, canChangeMarket,
  activeMarket, savedState: { currentMarket: _currentMarket }, saveState, layoutID, layoutI, showMarket, getCurrencySymbol,
}) => {
  const [currentMarket, setCurrentMarket] = useState(_currentMarket || activeMarket)
  const currentPair = getPairFromMarket(currentMarket, getCurrencySymbol)

  useEffect(() => {
    if (_isEmpty(_currentMarket) && activeMarket.restID !== currentMarket.restID) {
      setCurrentMarket(activeMarket)
    }
  }, [_currentMarket, activeMarket, currentMarket.restID])

  useEffect(() => {
    if (!_isEmpty(_currentMarket)) {
      setCurrentMarket(_currentMarket)
    }
  }, [_currentMarket])

  const onChangeMarket = (market) => {
    if (market.restID === currentMarket.restID) {
      return
    }

    setCurrentMarket(market)
    saveState(layoutID, layoutI, {
      currentMarket: market,
    })
  }

  const { t } = useTranslation()

  const renderMarketDropdown = () => {
    return (
      <MarketSelect
        markets={markets}
        value={currentMarket}
        disabled={!canChangeMarket}
        onChange={onChangeMarket}
        renderWithFavorites
      />
    )
  }

  return (
    <Panel
      dark={dark}
      label={label || t('chartModal.title')}
      darkHeader={dark}
      onRemove={onRemove}
      moveable={moveable}
      removeable={removeable}
      showChartMarket={showChartMarket}
      chartMarketSelect={showChartMarket && canChangeMarket && renderMarketDropdown()}
      headerComponents={showMarket && !canChangeMarket && <p>{currentPair}</p>}
      className='hfui-chart__wrapper'
    >
      <Chart market={currentMarket} />
    </Panel>
  )
}

ChartPanel.propTypes = {
  dark: PropTypes.bool,
  label: PropTypes.string,
  onRemove: PropTypes.func,
  moveable: PropTypes.bool,
  removeable: PropTypes.bool,
  activeMarket: PropTypes.shape({
    base: PropTypes.string,
    quote: PropTypes.string,
    restID: PropTypes.string,
  }),
  saveState: PropTypes.func,
  canChangeMarket: PropTypes.bool,
  showChartMarket: PropTypes.bool,
  showMarket: PropTypes.bool,
  layoutI: PropTypes.string.isRequired,
  layoutID: PropTypes.string,
  savedState: PropTypes.shape({
    currentMarket: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.array, PropTypes.string, PropTypes.bool, PropTypes.number,
    ])),
  }),
  markets: PropTypes.objectOf(PropTypes.object),
  getCurrencySymbol: PropTypes.func.isRequired,
}

ChartPanel.defaultProps = {
  dark: true,
  label: null,
  markets: [],
  savedState: {},
  moveable: true,
  removeable: true,
  onRemove: () => { },
  activeMarket: {
    base: 'BTC',
    quote: 'USD',
    restID: 'tBTCUSD',
  },
  saveState: () => { },
  showChartMarket: false,
  canChangeMarket: false,
  showMarket: false,
  layoutID: '',
}

export default memo(ChartPanel)
