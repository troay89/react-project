import classes from './Search.module.css';
import React, { useState } from 'react';
import { SEARCH_VALUE } from '../../entity/constants';

export default function Search({
  onSendSearch,
}: {
  onSendSearch: (search: string) => void;
}) {
  const [inputSearch, setInputSearch] = useState<string>();
  const [count, setCount] = useState<number>(0);

  function onErrorSubmit() {
    setCount(1);
  }

  function onSubmit() {
    saveSearchValue(inputSearch ?? localStorage.getItem(SEARCH_VALUE) ?? '');
    onSendSearch(inputSearch ?? '');
  }

  function saveSearchValue(searchValue: string) {
    console.log(searchValue);
    localStorage.setItem(SEARCH_VALUE, searchValue.trim());
  }

  console.log(inputSearch, 'Search');

  if (count === 1) {
    throw new Error('crashed!');
  }
  return (
    <header className={classes.searchArea}>
      <form className={classes.searchForm}>
        <input
          defaultValue={localStorage.getItem(SEARCH_VALUE) ?? ''}
          className={classes.searchInput}
          type={'search'}
          placeholder={'Введите сюда имя персонажа которого хотите найти'}
          onChange={(event) => setInputSearch(event.target.value)}
        />
        <input
          className={classes.searchButton}
          type={'button'}
          value={'НАЙТИ'}
          onClick={onSubmit}
        />
        <input
          className={classes.searchButton}
          type={'button'}
          value={'Ошибка'}
          onClick={onErrorSubmit}
        />
      </form>
    </header>
  );
}
