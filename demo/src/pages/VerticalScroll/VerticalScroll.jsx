import { memo } from 'react';

import { PropsUpdater } from '@components';

import styles from './VerticalScroll.scss';

const VerticalScroll = () => {
  return (
    <section className={styles.VerticalScroll}>
      <PropsUpdater />
    </section>
  );
};

export default memo(VerticalScroll);
