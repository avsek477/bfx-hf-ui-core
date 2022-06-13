import _get from 'lodash/get'
import { createSelector } from 'reselect'
import { REDUCER_PATHS } from '../../config'
import { getIsPaperTrading } from '../ui'

const path = REDUCER_PATHS.WS
const EMPTY_OBJ = {}

export const getAPIKeyStates = (state) => _get(state, `${path}.auth.apiKeys`, EMPTY_OBJ)

const getCurrentModeAPIKeyState = createSelector(
  [
    getIsPaperTrading,
    getAPIKeyStates,
  ],
  (isPaperTradingMode, apiKeys) => (isPaperTradingMode ? apiKeys.paper : apiKeys.main),
)

export default getCurrentModeAPIKeyState
