import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { PropsUpdater } from '@components';
import { Global, LOREM_IPSUM } from '@services';
import propUpdaterStyles from '@components/PropsUpdater/PropsUpdater.scss';

import { Scroll } from '../../../../dist';

import styles from './HorizontalScroll.scss';

const DEFAULT_VERTICAL_SCROLL_CONFIG = {
  className: propUpdaterStyles.VerticalScrollLightGrey,
  containerClass: propUpdaterStyles.ScrollContainerBorder,
  display: 'block',
  direction: 'vertical',
  width: '100%',
  height: '40rem',
  resizeDebounce: 600,
  scrollerClass: propUpdaterStyles.VerticalScrollerLightBlue,
  track: true,
  trackClass: propUpdaterStyles.VerticalTrackLight,
  trackShift: 200
};

const DEFAULT_HORIZONTAL_SCROLL_CONFIG = {
  ...DEFAULT_VERTICAL_SCROLL_CONFIG,
  className: propUpdaterStyles.HorizontalScrollLightGrey,
  direction: 'horizontal',
  width: '40rem',
  height: 'auto',
  scrollerClass: propUpdaterStyles.HorizontalScrollerLightBlue,
  trackClass: propUpdaterStyles.HorizontalTrackLight
};

const HorizontalScroll = () => {
  const propsUpdaterKeyRef = useRef(Global.idGenerator());

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

  const setSCrollPropVertical = useCallback(({ name, value }) => {
    setScrollConfigVertical((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const setScrollPropHorizontal = useCallback(({ name, value }) => {
    setScrollCofigHorizontal((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const setScrollProp = useCallback(
    ({ name, value }) => {
      switch (direction) {
        case 'vertical':
          setSCrollPropVertical({ name, value });

          break;

        case 'horizontal':
          setScrollPropHorizontal({ name, value });

          break;

        case 'combined':
          setSCrollPropVertical({ name, value });
          setScrollPropHorizontal({ name, value });
          break;

        default:
      }
    },
    [direction, setSCrollPropVertical, setScrollPropHorizontal]
  );

  const updateDirection = useCallback(
    (newDirecction) => {
      setScrollConfigVertical(DEFAULT_VERTICAL_SCROLL_CONFIG);
      setScrollCofigHorizontal(DEFAULT_HORIZONTAL_SCROLL_CONFIG);
      setDirection(newDirecction);

      if (newDirecction === 'combined') {
        setSCrollPropVertical({
          name: 'className',
          value: propUpdaterStyles.CombinedVerticalScrollTransparent
        });
      }

      propsUpdaterKeyRef.current = Global.idGenerator();
    },
    [setSCrollPropVertical]
  );

  return (
    <section className={styles.HorizontalScroll}>
      <div className={styles.ColumnContainer}>
        <h2 className={styles.ColumnHeader}>Props</h2>
        <PropsUpdater
          key={propsUpdaterKeyRef.current}
          direction={direction}
          scrollCofig={scrollCofig}
          setDirection={updateDirection}
          setScrollProp={setScrollProp}
          setScrollPropHorizontal={setScrollPropHorizontal}
          setSCrollPropVertical={setSCrollPropVertical}
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
              <div className={styles.ContentHorizontal}>
                <Scroll {...scrollCofigVertical} direction="vertical">
                  <div className={styles.Content}>{LOREM_IPSUM}</div>
                </Scroll>
              </div>
            </Scroll>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default memo(HorizontalScroll);
