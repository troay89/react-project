import classes from './Search.module.css';
import { useCustomSelector, useCustomDispatch } from '../../redux/store/hooks';
import { SEARCH_VALUE } from '../../models/models';
import React, { useState } from 'react';
import { changeSearch } from '../../redux/features/search/searchSlice';

const Search = () => {
  const [inputSearch, setInputSearch] = useState<string>(
    localStorage.getItem(SEARCH_VALUE) ?? ''
  );
  useCustomSelector((state) => state.search.searchString);
  const dispatch = useCustomDispatch();

  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputSearch || localStorage.getItem(SEARCH_VALUE)) {
      dispatch(changeSearch(inputSearch));
      localStorage.setItem(
        SEARCH_VALUE,
        inputSearch ?? localStorage.getItem(SEARCH_VALUE)
      );
    }
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
      </form>
    </div>
  );
};

export { Search };
