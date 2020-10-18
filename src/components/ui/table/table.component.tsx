import cx from 'classnames';

import map from 'lodash/map';

import css from './table.module.scss';

type Cells = {
  [cell: string]: React.ReactNode | string;
};
type Row = Cells & {
  id: string | number;
  className?: string;
  controls?: React.ReactNode | string;
};
type Column = { name: string; title: string; width: number };
type RowProps =
  | {
      header: true;
      columns: Column[];
      rowData?: undefined;
      controlsWidth?: undefined;
    }
  | {
      header?: undefined;
      columns: Column[];
      rowData: Row;
      controlsWidth?: number;
    };
type TableProps = { className?: string; columns: Column[]; rows: Row[]; controlsWidth?: number };

const Row: React.FC<RowProps> = ({ header = false, columns, rowData, controlsWidth }) => {
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

const Table: React.FC<TableProps> = ({ className, columns, rows, controlsWidth }) => {
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
