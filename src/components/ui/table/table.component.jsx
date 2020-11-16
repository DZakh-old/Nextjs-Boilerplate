import cx from 'classnames';

import map from 'lodash/map';

import css from './table.module.scss';

const Row = ({ header = false, columns, rowData, controlsWidth }) => {
  return (
    <div className={cx(css.row, (rowData || {}).className, { [css.header]: header })}>
      {header
        ? map(columns, (column, idx) => {
            return (
              <div key={idx} style={{ minWidth: column.width, maxWidth: column.width }}>
                {column.title}
              </div>
            );
          })
        : map(columns, (column, idx) => {
            return (
              <div key={idx} style={{ minWidth: column.width, maxWidth: column.width }}>
                {rowData && rowData[column.name]}
              </div>
            );
          })}
      {rowData && rowData.controls && (
        <div style={{ minWidth: controlsWidth, maxWidth: controlsWidth }} className={css.controls}>
          {rowData.controls}
        </div>
      )}
    </div>
  );
};

const Table = ({ className, columns, rows, controlsWidth }) => {
  return (
    <div className={cx(css.table, className)}>
      <Row header columns={columns} />
      {map(rows, (rowData) => {
        return (
          <Row key={rowData.id} rowData={rowData} columns={columns} controlsWidth={controlsWidth} />
        );
      })}
    </div>
  );
};

export default Table;
