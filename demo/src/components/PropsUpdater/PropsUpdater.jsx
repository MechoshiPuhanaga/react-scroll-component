import { memo } from 'react';

import styles from './PropsUpdater.scss';

const PropsUpdater = () => {
  return (
    <div className={styles.PropsUpdater}>
      <h2 className={styles.PropHeader}>Props</h2>
      <h2 className={styles.PropHeader}>Values</h2>
      <div className={styles.Props}>Props</div>
      <div className={styles.Props}>Values</div>
    </div>
  );
};

export default memo(PropsUpdater);
