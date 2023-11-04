import classes from './Content.module.css';
import React, { useEffect, useState } from 'react';
import getCharacters from '../../api/api';
import {
  ContentI,
  NOT_FOUNDED_MESSAGE,
  SEARCH_VALUE,
} from '../../models/models';
import { Loader } from '../loader/Loader';
import { Card } from './Card/Card';
import { Pagination } from './pagination/Pagination';

interface ContentP {
  search: string;
  onNumberPage: (numberPage: number) => void;
}

const Content = ({ search, onNumberPage }: ContentP) => {
  const [content, setContent] = useState<ContentI | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('useEffect1');
    sendPageNumber(1);
    setLoading(true);
    requestServer();
  }, [search]);

  useEffect(() => {
    console.log('useEffect2');
    setLoading(true);
    requestServer(page);
  }, [page]);

  if (loading) {
    return <Loader />;
  }

  function requestServer(numberPage: number = 1) {
    getCharacters(localStorage.getItem(SEARCH_VALUE) ?? '', numberPage)
      .then((result) => setContent(result))
      .then(() => setLoading(false));
  }

  function sendPageNumber(numberPage: number) {
    setPage(numberPage);
    onNumberPage(numberPage);
  }

  return (
    <main className={classes.container}>
      <div className={classes.containerCard}>
        {content?.results ? (
          content.results.map((characterInfo) => {
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
      <span className={classes.containerPages}>
        {[...new Array(content?.info.pages)].map((_, index) => {
          return (
            <Pagination
              key={index}
              numberPage={index + 1}
              onSelectPage={sendPageNumber}
            />
          );
        })}
      </span>
    </main>
  );
};

export { Content };
