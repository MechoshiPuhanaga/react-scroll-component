import { memo } from 'react';

import styles from './Home.scss';

const Home = () => {
  return (
    <section className={styles.Home}>
      <h1 className={styles.About}>About</h1>
    </section>
  );
};

export default memo(Home);
