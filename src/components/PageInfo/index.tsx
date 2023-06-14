import { forwardRef } from 'react';
import styles from './styles.module.css';

interface PageInfoProps {
  title?: string;
  subtitle?: string;
  desc: (string | undefined)[];
  icon?: string;
}
export const PageInfo = forwardRef((props: PageInfoProps, ref: React.RefObject<HTMLDivElement>) => {
  const { title, subtitle, desc, icon } = props;
  return (
    <div className={styles.content} ref={ref}>
      <div className={styles.logo}></div>
      <div className={styles.title}>
        <div>{title}</div>
        {icon && (
          <div
            className={styles.icon}
            style={{ background: `url(${icon}) no-repeat center`, backgroundSize: 'contain' }}
          ></div>
        )}
      </div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      <div className={styles.desc}>
        {desc.map((text, idx) => {
          return <div key={idx}>{text}</div>;
        })}
      </div>
    </div>
  );
});
