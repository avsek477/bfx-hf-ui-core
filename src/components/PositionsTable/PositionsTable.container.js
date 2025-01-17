import { connect } from 'react-redux'
import { prepareAmount } from 'bfx-api-node-util'
import Debug from 'debug'

import { getAuthToken, getAllPositions, getFilteredPositions } from '../../redux/selectors/ws'
import { getMarketPair } from '../../redux/selectors/meta'
import orders from '../../orders'
import WSActions from '../../redux/actions/ws'
import PositionsTable from './PositionsTable'

const debug = Debug('hfui:c:positions-table')

const mapStateToProps = (state = {}, { activeFilter } = {}) => ({
  authToken: getAuthToken(state),
  filteredPositions: getFilteredPositions(state)(activeFilter),
  positions: getAllPositions(state),
  getMarketPair: getMarketPair(state),
})

const mapDispatchToProps = dispatch => ({
  closePosition: (authToken, position = {}) => {
    const { symbol, amount, basePrice } = position
    const { generateOrder } = orders.Market()

    const packet = generateOrder({
      amount: prepareAmount(-1 * amount),
      reduceonly: true,
    }, symbol, 'm')

    debug('closing position on %s %f @ %f', symbol, amount, basePrice)
    dispatch(WSActions.send(['order.submit', authToken, 'bitfinex', packet]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PositionsTable)
