import classes from './Header.module.css';
import React, { useState } from 'react';

const Header = () => {
  const [count, setCount] = useState<number>(0);

  function onErrorSubmit() {
    setCount(1);
  }

  if (count === 1) {
    throw new Error('crashed!');
  }

  return (
    <div className={classes.headerContainer}>
      <h1 className={classes.title}>React Project</h1>
      <input
        className={classes.errorButton}
        type={'button'}
        value={'Ошибка'}
        onClick={onErrorSubmit}
      />
    </div>
  );
};

export { Header };
