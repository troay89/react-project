import classes from './Content.module.css';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  ContentI,
  NOT_FOUNDED_MESSAGE,
  SEARCH_VALUE,
} from '../../models/models';
import { Loader } from '../loader/Loader';
import { Card } from './Card/Card';
import { Pagination } from './pagination/Pagination';
import { getCharacters } from '../../api/api';

interface ContentP {
  searchCharacter: string | null;
  onNumberPage: (numberPage: string) => void;
  searchPage: number | null;
}

const Content = ({ searchCharacter, onNumberPage, searchPage }: ContentP) => {
  const [content, setContent] = useState<ContentI | null>(null);
  const [countItems, setCountItems] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    if (searchPage || searchCharacter) {
      getCharacters(
        searchCharacter ?? localStorage.getItem(SEARCH_VALUE) ?? '',
        countItems === 10
          ? Math.ceil((searchPage as number) / 2)
          : searchPage ?? 1,
        abortController
      )
        .then((result) => setContent(result))
        .then(() => setLoading(false));
    }
  }, [searchPage, searchCharacter, countItems]);

  if (loading) {
    return <Loader />;
  }

  function sendPageNumber(page: number) {
    if (searchPage) {
      onNumberPage(page.toString());
    }
  }

  console.log(content?.results);

  return (
    <main className={classes.container}>
      <div className={classes.containerCard}>
        {content?.results ? (
          content.results
            .filter((_, index) =>
              countItems === 10
                ? (searchPage as number) % 2 === 1
                  ? index < 10
                  : index >= 10
                : index < 21
            )
            .map((characterInfo) => {
              const { id, image, name, species, gender } = characterInfo;
              return (
                <Card
                  key={id}
                  id={id}
                  image={image}
                  name={name}
                  species={species}
                  gender={gender}
                />
              );
            })
        ) : (
          <p>{NOT_FOUNDED_MESSAGE}</p>
        )}
      </div>
      <div className={classes.containerSelect}>
        <p>Сколько элементов отображать на странице</p>
        <select
          name="selectItems"
          onChange={(event) => {
            setCountItems(Number(event.target.value));
            onNumberPage('1');
          }}
          defaultValue={countItems}
        >
          <option value="20">20</option>
          <option value="10">10</option>
        </select>
      </div>
      <span className={classes.containerPages}>
        {[
          ...new Array(
            countItems === 20
              ? content?.info?.pages
              : Math.ceil((content?.info.count as number) / 10)
          ),
        ].map((_, index) => {
          return (
            <Pagination
              key={index}
              numberPage={index + 1}
              onSelectPage={sendPageNumber}
            />
          );
        })}
      </span>
      <Outlet />
    </main>
  );
};

export { Content };
