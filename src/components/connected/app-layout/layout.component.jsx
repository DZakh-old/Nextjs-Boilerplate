import cx from 'classnames';

import css from './layout.module.scss';

const Layout = ({ header, sidebar, widgetsBar, content }) => {
  return (
    <div
      className={cx({
        [css.layout]: true,
        [css.with_sidebar]: sidebar,
        [css.with_widgets_bar]: widgetsBar,
      })}
    >
      <header className={css.header}>{header}</header>
      {sidebar && <div className={css.sidebar_holder}>{sidebar}</div>}
      {widgetsBar && <div className={css.widgets_bar_holder}>{widgetsBar}</div>}
      <main className={css.content}>{content}</main>
    </div>
  );
};

export default Layout;
