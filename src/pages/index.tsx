import { Footer, Header, Homepage, Culture, Roadmap, Activity, Team, Partner } from '../components';
import { navAnchor } from '../constants/home';
import styles from './index.module.css';

export default () => {
  const getPageId = (page: string) => {
    return navAnchor.find((item) => item.key === page)?.key;
  };

  return (
    <div className={styles.home}>
      <Header navAnchor={navAnchor} />
      <Homepage pageIdx={getPageId('/homepage')} />
      <Activity pageIdx={getPageId('/vision')} />
      <Culture pageIdx={getPageId('/whitepaper')} />
      <Roadmap pageIdx={getPageId('/roadmap')} />
      <Team pageIdx={getPageId('/team')} />
      <Partner pageIdx={getPageId('/partners')} />
      <Footer />
    </div>
  );
};
