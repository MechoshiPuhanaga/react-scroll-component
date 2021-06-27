/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from 'react';

import { ToggleButtons } from './components';

import styles from './PropsUpdater.scss';

const PropsUpdater = ({ setScrollProp }) => {
  return (
    <div className={styles.PropsContainer}>
      <div className={styles.PropBox}>
        <span className={styles.PropLabel}>className</span>
        <ToggleButtons
          buttons={[
            {
              txt: 'LightGrey',
              onClick: () => {
                setScrollProp({
                  name: 'className',
                  value: styles.ScrollLightGrey
                });
              }
            },
            {
              txt: 'LightBlue',
              onClick: () => {
                setScrollProp({
                  name: 'className',
                  value: styles.ScrollLightBlue
                });
              }
            },
            {
              txt: 'Transparent',
              onClick: () => {
                setScrollProp({
                  name: 'className',
                  value: styles.ScrollTransparent
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
                setScrollProp({
                  name: 'scrollerClass',
                  value: styles.ScrollerLightBlue
                });
              }
            },
            {
              txt: 'DarkBlue',
              onClick: () => {
                setScrollProp({
                  name: 'scrollerClass',
                  value: styles.ScrollerDarkBlue
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
                setScrollProp({
                  name: 'trackClass',
                  value: styles.TrackLight
                });
              }
            },
            {
              txt: 'Dark',
              onClick: () => {
                setScrollProp({
                  name: 'trackClass',
                  value: styles.TrackDark
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
    </div>
  );
};

export default memo(PropsUpdater);
