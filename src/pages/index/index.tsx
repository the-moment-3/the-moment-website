import { Footer, Header, Homepage, Culture, Roadmap, Activity, Team, Partner } from '@/components';
import { useNavPageScroll } from '@/utils/nav';
import styles from './index.module.css';

export default () => {
  useNavPageScroll();
  return (
    <div className={styles.home}>
      <Header />
      <Homepage />
      <Activity />
      <Culture />
      <Roadmap />
      <Team />
      <Partner />
      <Footer />
    </div>
  );
};
