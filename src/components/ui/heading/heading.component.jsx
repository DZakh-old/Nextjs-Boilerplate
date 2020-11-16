import cx from 'classnames';

import css from './heading.module.scss';

const Heading = ({ className, section, sub, children }) => {
  if (section) {
    return <h2 className={cx(css.heading, css.section, className)}>{children}</h2>;
  }

  if (sub) {
    return <h3 className={cx(css.heading, css.sub, className)}>{children}</h3>;
  }

  return null;
};

export default Heading;
