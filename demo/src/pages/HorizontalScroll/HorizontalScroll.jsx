import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { PropsUpdater } from '@components';
import { LOREM_IPSUM } from '@services';
import propUpdaterStyles from '@components/PropsUpdater/PropsUpdater.scss';

import { Scroll } from '../../../../dist';

import styles from './HorizontalScroll.scss';

const DEFAULT_VERTICAL_SCROLL_CONFIG = {
  className: propUpdaterStyles.ScrollLightGrey,
  containerClass: propUpdaterStyles.ScrollContainerBorder,
  display: 'block',
  direction: 'vertical',
  width: '100%',
  height: '40rem',
  resizeDebounce: 600,
  scrollerClass: propUpdaterStyles.ScrollerLightBlue,
  track: true,
  trackClass: propUpdaterStyles.TrackLight,
  trackShift: 200
};

const DEFAULT_HORIZONTAL_SCROLL_CONFIG = {
  ...DEFAULT_VERTICAL_SCROLL_CONFIG,
  className: propUpdaterStyles.ScrollLightGreyHorizontal,
  direction: 'horizontal',
  height: 'auto',
  scrollerClass: propUpdaterStyles.ScrollerLightBlueHorizontal
};

const HorizontalScroll = () => {
  const [scrollCofigVertical, setScrollConfigVertical] = useState(
    DEFAULT_VERTICAL_SCROLL_CONFIG
  );

  const [scrollCofigHorizontal, setScrollCofigHorizontal] = useState(
    DEFAULT_HORIZONTAL_SCROLL_CONFIG
  );

  const [direction, setDirection] = useState('vertical');

  const scrollCofig = useMemo(() => {
    switch (direction) {
      case 'vertical':
        return scrollCofigVertical;
      case 'horizontal':
        return scrollCofigHorizontal;
      default:
        return {};
    }
  }, [direction, scrollCofigHorizontal, scrollCofigVertical]);

  const setScrollProp = useCallback(
    ({ name, value }) => {
      switch (direction) {
        case 'vertical':
          setScrollConfigVertical((prevState) => ({
            ...prevState,
            [name]: value
          }));

          break;

        case 'horizontal':
          setScrollCofigHorizontal((prevState) => ({
            ...prevState,
            [name]: value
          }));

          break;

        default:
      }
    },
    [direction]
  );

  const updateDirection = useCallback((newDirecction) => {
    setScrollConfigVertical(DEFAULT_VERTICAL_SCROLL_CONFIG);
    setScrollCofigHorizontal(DEFAULT_HORIZONTAL_SCROLL_CONFIG);
    setDirection(newDirecction);
  }, []);

  useEffect(() => {
    console.log(scrollCofig);
  }, [direction, scrollCofig]);

  return (
    <section className={styles.HorizontalScroll}>
      <div className={styles.ColumnContainer}>
        <h2 className={styles.ColumnHeader}>Props</h2>
        <PropsUpdater
          direction={direction}
          scrollCofig={scrollCofig}
          setDirection={updateDirection}
          setScrollProp={setScrollProp}
        />
      </div>
      <div className={styles.ColumnContainer}>
        <h2 className={styles.ColumnHeader}>Scroll</h2>
        <div className={styles.ScrollWrapper}>
          {direction === 'vertical' ? (
            <Scroll {...scrollCofigVertical}>
              <div className={styles.Content}>{LOREM_IPSUM}</div>
            </Scroll>
          ) : null}
          {direction === 'horizontal' ? (
            <Scroll {...scrollCofigHorizontal}>
              <div className={styles.ContentHorizontal}>{LOREM_IPSUM}</div>
            </Scroll>
          ) : null}
          {direction === 'combined' ? (
            <Scroll {...scrollCofigHorizontal} direction="horizontal">
              <Scroll {...scrollCofigVertical} direction="vertical">
                <div className={styles.Content}>{LOREM_IPSUM}</div>
              </Scroll>
            </Scroll>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default memo(HorizontalScroll);
