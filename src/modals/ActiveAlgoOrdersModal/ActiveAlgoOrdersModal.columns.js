import React from 'react'
import { Checkbox } from '@ufx-ui/core'

export default (onOrderSelect, isOrderSelected, t) => [{
  dataKey: 'algoID',
  width: 30,
  flexGrow: 0.3,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <Checkbox
      className='checkbox'
      checked={isOrderSelected(rowData.gid)}
      onChange={e => onOrderSelect(e, rowData.gid, rowData.algoID)}
    />
  ),
  disableSort: true,
}, {
  label: t('table.name'),
  dataKey: 'name',
  width: 75,
  flexGrow: 0.75,
  cellRenderer: ({ rowData = {} }) => rowData.name,
}, {
  label: t('table.context'),
  dataKey: 'args._margin',
  width: 90,
  flexGrow: 0.9,
  cellRenderer: ({ rowData = {} }) => (rowData.args?._margin ? 'Margin' : 'Exchange'),
}, {
  label: t('table.created'),
  dataKey: 'gid',
  width: 125,
  flexGrow: 1.25,
  cellRenderer: ({ rowData = {} }) => new Date(+rowData.gid).toLocaleString(),
}, {
  label: t('table.symbol'),
  dataKey: 'args.symbol',
  width: 160,
  flexGrow: 1.6,
  cellRenderer: ({ rowData = {} }) => rowData.args?.symbol,
}, {
  label: t('table.label'),
  dataKey: 'label',
  width: 490,
  flexGrow: 4.9,
  cellRenderer: ({ rowData = {} }) => rowData.label,
}]
