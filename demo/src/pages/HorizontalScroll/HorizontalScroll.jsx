import { memo } from 'react';

import { PropsUpdater } from '@components';

import styles from './HorizontalScroll.scss';

const HorizontalScroll = () => {
  return (
    <section className={styles.HorizontalScroll}>
      <PropsUpdater />
    </section>
  );
};

export default memo(HorizontalScroll);
