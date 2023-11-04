import classes from './Search.module.css';
import React, { useState } from 'react';
import { SEARCH_VALUE } from '../../models/models';

const Search = ({
  onSendSearch,
}: {
  onSendSearch: (search: string) => void;
}) => {
  const [inputSearch, setInputSearch] = useState<string>(
    localStorage.getItem(SEARCH_VALUE) ?? ''
  );
  const [count, setCount] = useState<number>(0);

  function onErrorSubmit() {
    setCount(1);
  }

  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveSearchValue(
      inputSearch.trim() ?? localStorage.getItem(SEARCH_VALUE) ?? ''
    );
    onSendSearch(inputSearch ?? '');
  }

  function saveSearchValue(searchValue: string) {
    localStorage.setItem(SEARCH_VALUE, searchValue.trim());
  }

  console.log(inputSearch, 'Search');

  if (count === 1) {
    throw new Error('crashed!');
  }
  return (
    <header className={classes.searchArea}>
      <form className={classes.searchForm} onSubmit={onSubmitHandler}>
        <input
          defaultValue={localStorage.getItem(SEARCH_VALUE) ?? ''}
          className={classes.searchInput}
          type={'search'}
          placeholder={'Введите сюда имя персонажа которого хотите найти'}
          onChange={(event) => setInputSearch(event.target.value)}
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
    </header>
  );
};

export { Search };
