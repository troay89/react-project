import classes from './Search.module.css';
import React, { useState } from 'react';
import { SEARCH_VALUE } from '../../models/models';
import { useDate } from '../../context/context';

const Search = () => {
  const [count, setCount] = useState<number>(0);
  const [inputSearch, setInputSearch] = useState<string>(
    localStorage.getItem(SEARCH_VALUE) ?? ''
  );
  const data = useDate();

  function onErrorSubmit() {
    setCount(1);
  }

  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    data?.sendSearch(inputSearch);
    saveSearchValue(
      data?.searchCharacter ?? localStorage.getItem(SEARCH_VALUE) ?? ''
    );
  }

  function saveSearchValue(searchValue: string) {
    localStorage.setItem(SEARCH_VALUE, searchValue.trim());
  }

  if (count === 1) {
    throw new Error('crashed!');
  }
  return (
    <div className={classes.searchArea}>
      <form className={classes.searchForm} onSubmit={onSubmitHandler}>
        <input
          defaultValue={localStorage.getItem(SEARCH_VALUE) ?? ''}
          className={classes.searchInput}
          type={'search'}
          placeholder={'Введите сюда имя персонажа которого хотите найти'}
          onChange={(event) => {
            setInputSearch(event.target.value);
          }}
        />
        <input
          className={classes.searchButton}
          type={'submit'}
          value={'НАЙТИ'}
        />
        <input
          className={classes.searchButton}
          type={'button'}
          value={'Ошибка'}
          onClick={onErrorSubmit}
        />
      </form>
    </div>
  );
};

export { Search };
