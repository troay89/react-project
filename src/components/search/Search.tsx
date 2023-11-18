import classes from './Search.module.css';
import { useCustomSelector, useCustomDispatch } from '../../redux/store/hooks';
import { SEARCH_VALUE } from '../../models/models';
import React, { useEffect, useState } from 'react';
import { changeSearch } from '../../redux/features/search/searchSlice';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [inputSearch, setInputSearch] = useState<string>(
    localStorage.getItem(SEARCH_VALUE) ?? ''
  );
  const [searchParams] = useSearchParams();
  useCustomSelector((state) => state.search.searchString);
  const dispatch = useCustomDispatch();
  const querySearch = searchParams.get('character') ?? '';

  useEffect(() => {
    dispatch(changeSearch(querySearch));
  }, [dispatch, querySearch]);

  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(changeSearch(inputSearch));
    localStorage.setItem(
      SEARCH_VALUE,
      inputSearch ?? querySearch ?? localStorage.getItem(SEARCH_VALUE)
    );
  }

  return (
    <div className={classes.searchArea}>
      <form className={classes.searchForm} onSubmit={onSubmitHandler}>
        <input
          defaultValue={
            querySearch ? querySearch : localStorage.getItem(SEARCH_VALUE) ?? ''
          }
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
