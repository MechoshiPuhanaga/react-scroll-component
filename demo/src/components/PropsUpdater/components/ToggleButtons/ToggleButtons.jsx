import { memo, useState } from 'react';

import { DOM } from '@services';

import styles from './ToggleButtons.scss';

const defaultButtons = [];

const ToggleButtons = ({ buttons = defaultButtons }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.Container}>
      {buttons.map(({ txt, onClick }, index) => (
        <button
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          type="button"
          onClick={() => {
            setActiveIndex(index);
            onClick();
          }}
          className={DOM.classer([
            styles.Button,
            activeIndex === index && 'active'
          ])}
        >
          {txt}
        </button>
      ))}
    </div>
  );
};

export default memo(ToggleButtons);
