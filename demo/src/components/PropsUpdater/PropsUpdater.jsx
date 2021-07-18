/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from 'react';

import { ToggleButtons } from './components';

import styles from './PropsUpdater.scss';

const PropsUpdater = ({
  direction,
  setDirection,
  setScrollProp,
  setScrollPropHorizontal,
  setSCrollPropVertical
}) => {
  return (
    <div className={styles.PropsContainer}>
      <div className={styles.PropBox}>
        <span className={styles.PropLabel}>direction</span>
        <ToggleButtons
          buttons={[
            {
              txt: 'vertical',
              onClick: () => {
                setScrollProp({
                  name: 'direction',
                  value: 'vertical'
                });
                setDirection('vertical');
              }
            },
            {
              txt: 'horizontal',
              onClick: () => {
                setScrollProp({
                  name: 'direction',
                  value: 'horizontal'
                });
                setDirection('horizontal');
              }
            },
            {
              txt: 'combined',
              onClick: () => {
                setDirection('combined');
              }
            }
          ]}
          predefinedIndex={['vertical', 'horizontal', 'combined'].indexOf(
            direction
          )}
        />
      </div>

      {direction === 'combined' || direction === 'vertical' ? (
        <div className={styles.PropBox}>
          <label htmlFor="height" className={styles.PropLabel}>
            height in px
          </label>
          <input
            id="height"
            type="number"
            onChange={({ target: { value } }) => {
              setScrollProp({
                name: 'height',
                value: parseFloat(value) > 0 ? parseFloat(value) : 0
              });
            }}
          />
        </div>
      ) : null}

      {direction === 'combined' || direction === 'horizontal' ? (
        <div className={styles.PropBox}>
          <label htmlFor="height" className={styles.PropLabel}>
            width in px
          </label>
          <input
            id="width"
            type="number"
            onChange={({ target: { value } }) => {
              setScrollProp({
                name: 'width',
                value: parseFloat(value) > 0 ? parseFloat(value) : 0
              });
            }}
          />
        </div>
      ) : null}

      <div className={styles.PropBox}>
        <span className={styles.PropLabel}>className</span>
        <ToggleButtons
          buttons={[
            {
              txt: 'LightGrey',
              onClick: () => {
                setSCrollPropVertical({
                  name: 'className',
                  value:
                    direction === 'combined'
                      ? styles.CombinedVerticalScrollLightGrey
                      : styles.VerticalScrollLightGrey
                });

                setScrollPropHorizontal({
                  name: 'className',
                  value: styles.HorizontalScrollLightGrey
                });
              }
            },
            {
              txt: 'LightBlue',
              onClick: () => {
                setSCrollPropVertical({
                  name: 'className',
                  value:
                    direction === 'combined'
                      ? styles.CombinedVerticalScrollLightBlue
                      : styles.VerticalScrollLightBlue
                });

                setScrollPropHorizontal({
                  name: 'className',
                  value: styles.HorizontalScrollLightBlue
                });
              }
            },
            {
              txt: 'Transparent',
              onClick: () => {
                setSCrollPropVertical({
                  name: 'className',
                  value:
                    direction === 'combined'
                      ? styles.CombinedVerticalScrollTransparent
                      : styles.VerticalScrollTransparent
                });

                setScrollPropHorizontal({
                  name: 'className',
                  value: styles.HorizontalScrollTransparent
                });
              }
            }
          ]}
        />
      </div>

      <div className={styles.PropBox}>
        <span className={styles.PropLabel}>containerClass</span>
        <ToggleButtons
          buttons={[
            {
              txt: 'Border',
              onClick: () => {
                setScrollProp({
                  name: 'containerClass',
                  value: styles.ScrollContainerBorder
                });
              }
            },
            {
              txt: 'No Border',
              onClick: () => {
                setScrollProp({
                  name: 'containerClass',
                  value: styles.ScrollContainerNoBorder
                });
              }
            }
          ]}
        />
      </div>

      <div className={styles.PropBox}>
        <span className={styles.PropLabel}>scrollerClass</span>
        <ToggleButtons
          buttons={[
            {
              txt: 'LightBlue',
              onClick: () => {
                setSCrollPropVertical({
                  name: 'scrollerClass',
                  value: styles.VerticalScrollerLightBlue
                });

                setScrollPropHorizontal({
                  name: 'scrollerClass',
                  value: styles.HorizontalScrollerLightBlue
                });
              }
            },
            {
              txt: 'DarkBlue',
              onClick: () => {
                setSCrollPropVertical({
                  name: 'scrollerClass',
                  value: styles.VerticalScrollerDarkBlue
                });

                setScrollPropHorizontal({
                  name: 'scrollerClass',
                  value: styles.HorizontalScrollerDarkBlue
                });
              }
            }
          ]}
        />
      </div>

      <div className={styles.PropBox}>
        <span className={styles.PropLabel}>track</span>
        <ToggleButtons
          buttons={[
            {
              txt: 'true',
              onClick: () => {
                setScrollProp({
                  name: 'track',
                  value: true
                });
              }
            },
            {
              txt: 'false',
              onClick: () => {
                setScrollProp({
                  name: 'track',
                  value: false
                });
              }
            }
          ]}
        />
      </div>

      <div className={styles.PropBox}>
        <span className={styles.PropLabel}>trackClass</span>
        <ToggleButtons
          buttons={[
            {
              txt: 'Light',
              onClick: () => {
                setSCrollPropVertical({
                  name: 'trackClass',
                  value: styles.VerticalTrackLight
                });

                setScrollPropHorizontal({
                  name: 'trackClass',
                  value: styles.HorizontalTrackLight
                });
              }
            },
            {
              txt: 'Dark',
              onClick: () => {
                setSCrollPropVertical({
                  name: 'trackClass',
                  value: styles.VerticalTrackDark
                });

                setScrollPropHorizontal({
                  name: 'trackClass',
                  value: styles.HorizontalTrackDark
                });
              }
            }
          ]}
        />
      </div>

      <div className={styles.PropBox}>
        <label htmlFor="trackShift" className={styles.PropLabel}>
          trackShift in px
        </label>
        <input
          id="trackShift"
          type="number"
          onChange={({ target: { value } }) => {
            setScrollProp({
              name: 'trackShift',
              value: parseFloat(value)
            });
          }}
        />
      </div>
    </div>
  );
};

export default memo(PropsUpdater);
