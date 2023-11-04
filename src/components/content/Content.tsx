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

interface ContentP {
  search: string;
}

const Content = ({ search }: ContentP) => {
  const [content, setContent] = useState<ContentI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getCharacters(localStorage.getItem(SEARCH_VALUE) ?? '')
      .then((result) => setContent(result))
      .then(() => setLoading(false));
  }, [search]);

  console.log(content, 'Content');

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={classes.containerCard}>
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
      <span className={'pages'}></span>
    </main>
  );
};

export { Content };
