import _keys from 'lodash/keys'
import _first from 'lodash/first'
import _get from 'lodash/get'

export const getDefaultMarket = (markets) => _get(markets, [_first(_keys(markets))], 'uiID')

export const getPairFromMarket = (market, getCurrencySymbol) => `${getCurrencySymbol(market?.base)}/${getCurrencySymbol(market?.quote)}`
