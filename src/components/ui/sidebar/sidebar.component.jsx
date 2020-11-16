import cx from 'classnames';

import css from './sidebar.module.scss';

const Sidebar = ({ children, className = '', position }) => {
  return (
    <div
      className={cx({
        [css.sidebar]: true,
        [css.sidebar_left]: position === 'left',
        [css.sidebar_right]: position === 'right',
        [className]: className,
      })}
    >
      {children}
    </div>
  );
};

export default Sidebar;
