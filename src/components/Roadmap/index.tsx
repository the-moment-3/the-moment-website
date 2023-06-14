import { useRef, useEffect } from 'react';
import { PageInfo } from '../PageInfo';
import { Banner } from '../Banner';
import { useAnimation } from '@/hooks/use-animation';
import { useI18n } from '@/hooks/use-i18n';
import styles from './styles.module.css';

export const Roadmap = ({ pageIdx }: { pageIdx?: string }) => {
  const roadmapRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const refs = useAnimation({
    pageInfo: { heightOffsetRatio: 0.8, className: styles.fadeInUp, ref: useRef<HTMLDivElement>(null) },
    rightside_0: { heightOffsetRatio: 0.75, className: styles.fadeInUp, ref: useRef<HTMLDivElement>(null) },
    rightside_1: { heightOffsetRatio: 0.75, className: styles.fadeInUp, ref: useRef<HTMLDivElement>(null) },
    rightside_2: { heightOffsetRatio: 0.75, className: styles.fadeInUp, ref: useRef<HTMLDivElement>(null) },
    rightside_3: { heightOffsetRatio: 0.75, className: styles.fadeInUp, ref: useRef<HTMLDivElement>(null) },
    roadmapIcon_0: { heightOffsetRatio: 0.8, className: styles.fadeInUp, ref: useRef<HTMLDivElement>(null) },
    roadmapIcon_1: { heightOffsetRatio: 0.8, className: styles.fadeInUp, ref: useRef<HTMLDivElement>(null) },
    roadmapIcon_2: { heightOffsetRatio: 0.8, className: styles.fadeInUp, ref: useRef<HTMLDivElement>(null) },
    roadmapIcon_3: { heightOffsetRatio: 0.8, className: styles.fadeInUp, ref: useRef<HTMLDivElement>(null) },
    firstImg: { heightOffsetRatio: 0.8, className: styles.fadeInRight, ref: useRef<HTMLDivElement>(null) },
    secondImg: { heightOffsetRatio: 0.8, className: styles.fadeInRight, ref: useRef<HTMLDivElement>(null) },
  });
  const translate = useI18n();
  const roadmap = [
    {
      quarter: translate.get('nftwebsite_roadmap.Apr'),
      title: translate.get('nftwebsite_roadmap.Season1'),
      brief: translate.get('nftwebsite_roadmap.Onlineandopenforsale'),
    },
    {
      quarter: translate.get('nftwebsite_roadmap.Jul'),
      title: translate.get('nftwebsite_roadmap.Benefits'),
      brief: translate.get('nftwebsite_roadmap.announceadditionalbenefits'),
    },
    {
      quarter: translate.get('nftwebsite_roadmap.Oct'),
      title: translate.get('nftwebsite_roadmap.Season2'),
      brief: translate.get('nftwebsite_roadmap.Communitymembers'),
    },
    {
      quarter: translate.get('nftwebsite_roadmap.Future'),
      title: translate.get('nftwebsite_roadmap.Collaborations'),
      brief: translate.get('nftwebsite_roadmap.quarterstheme'),
    },
  ];
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    roadmapRefs.forEach((ref) => {
      const roadmapVerticalLine = ref.current!;
      if (roadmapVerticalLine && roadmapVerticalLine.parentNode) {
        const roadmapWrapperOffsetY = roadmapVerticalLine.getBoundingClientRect().top;
        const viewHeight = window.innerHeight;
        const diff = roadmapWrapperOffsetY - viewHeight * 0.65;
        const fadeInOffset = roadmapWrapperOffsetY - viewHeight * 0.8;
        if (fadeInOffset <= 0) {
          roadmapVerticalLine.classList.add(styles.fadeInUp);
        }
        const parent = roadmapVerticalLine.parentNode as HTMLElement;
        const parentHeight = parent.clientHeight;
        if (diff > 0) {
          roadmapVerticalLine.style.height = '0px';
        } else {
          roadmapVerticalLine.style.height = `${Math.floor((-diff / parentHeight) * 100)}%`;
        }
      }
    });
  };

  return (
    <>
      <div className={styles.pageWrapper} id={pageIdx}>
        <div className={styles.container}>
          <div className={styles.blooming1}></div>
          <div className={styles.blooming2}></div>
          <div className={styles.backgroundDots}></div>
          <div className={styles.contentWrapper}>
            <PageInfo
              title={translate.get('nftwebsite_roadmap.roadmap')}
              desc={[translate.get('nftwebsite_roadmap.quarterlyroll')]}
              ref={refs['pageInfo']}
            />
            <div className={styles.backgroundImgWrapper}>
              <div className={styles.firstImg} ref={refs['firstImg']}></div>
              <div className={styles.secondImg} ref={refs['secondImg']}></div>
            </div>
          </div>
          <div className={styles.roadmapWrapper}>
            {roadmap.map((item, idx) => (
              <div key={idx}>
                <div className={styles.roadmap}>
                  <div className={styles.leftside}>
                    <div className={styles.roadmapIcon} ref={refs[`roadmapIcon_${idx}`]}>
                      {idx + 1}
                    </div>
                    {item.quarter !== '4' && <div className={styles.roadmapVerticalLine} ref={roadmapRefs[idx]} />}
                  </div>
                  <div className={styles.rightside} ref={refs[`rightside_${idx}`]}>
                    <div className={styles.roadmapHeader}>{item.quarter}</div>
                    <div className={styles.roadmapTitle}>{item.title}</div>
                    <div className={styles.roadmapBrief}>{item.brief}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Banner />
    </>
  );
};
