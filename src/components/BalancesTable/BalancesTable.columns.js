/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react'
import _capitalize from 'lodash/capitalize'
import { PrettyValue } from '@ufx-ui/core'
import { defaultCellRenderer } from '../../util/ui'
import { AMOUNT_DECIMALS } from '../../constants/precision'

const STYLES = {
  total: { justifyContent: 'flex-end' },
  available: { justifyContent: 'flex-end' },
}

export default (getCurrencySymbol, t) => [{
  label: t('table.context'),
  dataKey: 'context',
  width: 120,
  flexGrow: 1,
  cellRenderer: ({ rowData = {} }) => defaultCellRenderer(_capitalize(rowData.context)),
}, {
  label: t('table.currency'),
  dataKey: 'currency',
  width: 100,
  flexGrow: 1,
  cellRenderer: ({ rowData = {} }) => defaultCellRenderer(getCurrencySymbol(rowData?.currency)),
}, {
  label: t('table.total'),
  dataKey: 'balance',
  width: 120,
  flexGrow: 1.4,
  headerStyle: STYLES.total,
  style: STYLES.total,
  cellRenderer: ({ rowData = {} }) => defaultCellRenderer(
    <PrettyValue
      value={rowData?.balance}
      decimals={AMOUNT_DECIMALS}
      fadeTrailingZeros
    />,
  ),
}, {
  label: t('table.available'),
  dataKey: 'available',
  width: 120,
  flexGrow: 1.4,
  headerStyle: STYLES.available,
  style: STYLES.available,
  cellRenderer: ({ rowData = {} }) => defaultCellRenderer(
    <PrettyValue
      value={rowData?.available}
      decimals={AMOUNT_DECIMALS}
      fadeTrailingZeros
    />,
  ),
}]
