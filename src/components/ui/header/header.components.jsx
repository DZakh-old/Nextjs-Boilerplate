import cx from 'classnames';

import css from './header.module.scss';

const Header = ({ leftSlot, centralSlot, rightSlot, className = '', withBaseStyles = false }) => {
  return (
    <div
      className={cx({
        [css.header]: true,
        [css.with_base_styles]: withBaseStyles,
        [className]: className,
      })}
    >
      {leftSlot && <div className={css.left_slot}>{leftSlot}</div>}
      {centralSlot && <div className={css.central_slot}>{centralSlot}</div>}
      {rightSlot && <div className={css.right_slot}>{rightSlot}</div>}
    </div>
  );
};

export default Header;
