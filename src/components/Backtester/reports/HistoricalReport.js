import React from 'react'
import { AutoSizer } from 'react-virtualized'
import _map from 'lodash/map'

// eslint-disable-next-line import/no-extraneous-dependencies
import BFXChart from 'bfx-hf-chart'

import Results from '../Results'
import StrategyTradesTable from '../../StrategyTradesTable'

const HistoricalReport = (opts, results, backtestData, backtestOptions, t) => {
  const { trades = [] } = results
  const { indicators, onAddIndicator, onDeleteIndicator } = opts
  const { candles = [] } = backtestData
  const { tf } = backtestOptions
  const hasCandles = candles.length !== 0

  // convert candles to array for the chart
  const candleArr = _map(candles, c => (
    [
      c.mts,
      c.open,
      c.close,
      c.high,
      c.low,
      c.volume,
    ]
  ))

  return (
    <div className='hfui-backtester__candlechart'>
      <Results
        results={results}
        execRunning={false}
      />
      {hasCandles && (
        <AutoSizer disableHeight style={{ height: 400 }}>
          {({ width, height = 400 }) => (
            <BFXChart
              indicators={indicators}
              candles={candleArr}
              trades={trades}
              width={width}
              height={height}
              onAddIndicator={onAddIndicator}
              onDeleteIndicator={onDeleteIndicator}
              isSyncing={false}
              candleLoadingThreshold={3} // we always get 1 candle when sub'ing
              bgColor='#102331'
              config={{
                AXIS_COLOR: '#444',
                AXIS_TICK_COLOR: '#00000000',
              }}
              candleWidth={tf}
              disableToolbar
              showMarketLabel={false}
            />
          )}
        </AutoSizer>
      )}
      <StrategyTradesTable
        label={t('tradesTableModal.title')}
        trades={trades}
        onTradeClick={() => { }}
      />
    </div>
  )
}

export default HistoricalReport
