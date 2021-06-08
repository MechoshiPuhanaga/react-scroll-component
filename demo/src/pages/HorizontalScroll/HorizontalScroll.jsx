import React, { memo } from 'react';

import { PropsUpdater } from '@components';
import { LOREM_IPSUM } from '@services';

import { Scroll } from '../../Scroll';

import styles from './HorizontalScroll.scss';

const SCROLL_CONFIG_VERTICAL = {
  direction: 'vertical',
  height: '400px',
  display: 'block',
  resizeDebounce: 300,
  scrollerClass: styles.Scroller,
  track: true,
  trackClass: styles.Track,
  trackShift: 200
};

const HorizontalScroll = () => {
  return (
    <section className={styles.HorizontalScroll}>
      <div className={styles.ColumnContainer}>
        <h2 className={styles.ColumnHeader}>Props</h2>
        <PropsUpdater />
      </div>
      <div className={styles.ColumnContainer}>
        <h2 className={styles.ColumnHeader}>Scroll</h2>
        <div className={styles.ScrollContainer}>
          <Scroll {...SCROLL_CONFIG_VERTICAL}>
            <div className={styles.Content}>{LOREM_IPSUM}</div>
          </Scroll>
        </div>
      </div>
    </section>
  );
};

export default memo(HorizontalScroll);
