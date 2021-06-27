import { memo, useCallback, useState } from 'react';

import { PropsUpdater } from '@components';
import { LOREM_IPSUM } from '@services';

import { Scroll } from '../../../../dist';

import styles from './HorizontalScroll.scss';

const HorizontalScroll = () => {
  const [scrollCofig, setScrollConfig] = useState({
    className: styles.Scroll,
    containerClass: styles.ScrollContainer,
    display: 'block',
    direction: 'vertical',
    height: '40rem',
    scrollerClass: styles.Scroller,
    track: true,
    trackClass: styles.Track,
    trackShift: 200
  });

  const setScrollProp = useCallback(({ name, value }) => {
    setScrollConfig((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  return (
    <section className={styles.HorizontalScroll}>
      <div className={styles.ColumnContainer}>
        <h2 className={styles.ColumnHeader}>Props</h2>
        <PropsUpdater setScrollProp={setScrollProp} />
      </div>
      <div className={styles.ColumnContainer}>
        <h2 className={styles.ColumnHeader}>Scroll</h2>
        <div className={styles.ScrollWrapper}>
          <Scroll {...scrollCofig}>
            <div className={styles.Content}>{LOREM_IPSUM}</div>
          </Scroll>
        </div>
      </div>
    </section>
  );
};

export default memo(HorizontalScroll);
