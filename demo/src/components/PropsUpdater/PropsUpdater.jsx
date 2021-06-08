/* eslint-disable jsx-a11y/label-has-associated-control */
import { memo } from 'react';

import { ToggleButtons } from './components';

import styles from './PropsUpdater.scss';

const PropsUpdater = () => {
  return (
    <div className={styles.PropsContainer}>
      <div className={styles.PropBox}>
        <span className={styles.PropLabel}>className</span>
        <ToggleButtons
          buttons={[
            { txt: 'Yellow', onClick: () => {} },
            { txt: 'Blue', onClick: () => {} }
          ]}
        />
      </div>
      <div className={styles.PropBox}>
        <span className={styles.PropLabel}>containerClass</span>
        <ToggleButtons
          buttons={[
            { txt: 'Yellow', onClick: () => {} },
            { txt: 'Blue', onClick: () => {} }
          ]}
        />
      </div>
      <div className={styles.PropBox}>
        <span className={styles.PropLabel}>direction</span>
      </div>
      <div className={styles.PropBox}>
        <label htmlFor="height" className={styles.PropLabel}>
          height in px
        </label>
        <input id="height" type="number" />
      </div>
    </div>
  );
};

export default memo(PropsUpdater);
