import cx from 'classnames';

import css from './heading.module.scss';

type Props =
  | {
      className?: string;
      section: boolean;
      sub?: undefined;
      children: React.ReactNode;
    }
  | {
      className?: string;
      section?: undefined;
      sub: boolean;
      children: React.ReactNode;
    };

const Heading: React.FC<Props> = ({ className, section, sub, children }) => {
  if (section) {
    return <h2 className={cx(css.heading, css.section, className)}>{children}</h2>;
  }

  if (sub) {
    return <h3 className={cx(css.heading, css.sub, className)}>{children}</h3>;
  }

  return null;
};

export default Heading;
