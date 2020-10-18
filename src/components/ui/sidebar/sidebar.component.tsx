import cx from 'classnames';

import css from './sidebar.module.scss';

type Props = {
  className?: string;
  children: React.ReactNode;
  position: 'left' | 'right';
};

const Sidebar: React.FC<Props> = ({ children, className = '', position }) => {
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
