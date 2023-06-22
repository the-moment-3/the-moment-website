import { forwardRef } from 'react';
import styles from './styles.module.css';
import { sendEvent } from '@/utils';

interface PageInfoProps {
  title?: string;
  subtitle?: string;
  desc: (string | undefined)[];
  icon?: { img: string; url: string };
  pos?: string;
}
export const PageInfo = forwardRef((props: PageInfoProps, ref: React.RefObject<HTMLDivElement>) => {
  const { title, subtitle, desc, icon, pos } = props;
  return (
    <div className={styles.content} ref={ref}>
      <div className={styles.logo}></div>
      <div className={styles.title}>
        <div>{title}</div>
        {icon && (
          <a href={icon.url} target="_blank">
            <div
              className={styles.icon}
              style={{ background: `url(${icon.img}) no-repeat center`, backgroundSize: 'contain' }}
              onClick={() => sendEvent(`PC_Whitepaper_${pos}`)}
            ></div>
          </a>
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
