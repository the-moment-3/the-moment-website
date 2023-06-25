import { Media } from '@/constants/media';
import cl from 'classnames';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { sumEvent } from '@/utils/arms';

export const MediaIcon = ({
  mediaList,
  size,
  cln,
  bgc,
  pos,
}: {
  mediaList: Media[];
  size: number;
  cln?: string;
  bgc?: string;
  pos?: string;
}) => {
  const [iconSize, setIconSize] = useState('');
  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleWindowResize = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setIconSize(`${size}px`);
    } else if (768 <= width && width < 1200) {
      setIconSize(`${size / 12}vw`);
    } else {
      setIconSize(`${60}rpx`);
    }
  };

  const handleMouseEnter = (e, hoverIcon) => {
    e.target.src = hoverIcon;
  };
  const handleMouseLeave = (e, icon) => {
    e.target.src = icon;
  };
  return (
    <div className={cl(styles.media, cln)}>
      {mediaList.map((media) => {
        return (
          <div
            className={styles.mediaIcon}
            key={media.name}
            style={{ width: iconSize, height: iconSize, backgroundColor: bgc }}
          >
            <a href={media.url} target="_blank" onClick={() => sumEvent(`PC_${media.name}_${pos}`)}>
              <img
                src={media.icon}
                alt={media.name}
                onMouseEnter={(e) => handleMouseEnter(e, media.hoverIcon)}
                onMouseLeave={(e) => handleMouseLeave(e, media.icon)}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
};
