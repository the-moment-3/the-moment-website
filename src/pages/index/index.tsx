import { Footer, Header, Homepage, Culture, Roadmap, Activity, Team, Partner } from '@/components';
import { navAnchor } from '@/constants/home';
import styles from './index.module.css';

const getPageId = (page: string) => {
  return navAnchor.find((item) => item.key === page)?.key;
};

export default () => (
  <div className={styles.home}>
    <Header navAnchor={navAnchor} />
    <Homepage />
    <Activity pageIdx={getPageId('/vision')} />
    <Culture pageIdx={getPageId('/whitepaper')} />
    <Roadmap pageIdx={getPageId('/roadmap')} />
    <Team pageIdx={getPageId('/team')} />
    <Partner pageIdx={getPageId('/partners')} />
    <Footer />
  </div>
);
