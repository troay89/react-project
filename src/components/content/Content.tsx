import classes from './Content.module.css';
import Card from './Card/Card';
import React, { useEffect, useState } from 'react';
import getCharacters from '../../api/api';
import { SEARCH_VALUE } from '../../entity/constants';
import ContentI from '../../entity/ContentI';

interface ContentP {
  search: string;
}

export default function Content({ search }: ContentP) {
  const [content, setContent] = useState<ContentI | undefined>(undefined);

  useEffect(() => {
    getCharacters(localStorage.getItem(SEARCH_VALUE) ?? '').then((result) =>
      setContent(result)
    );
  }, [search]);

  console.log(search, 'Content');

  return (
    <main className={classes.containerCard}>
      {content !== undefined ? (
        content.results.map((characterInfo) => {
          return (
            <Card
              key={characterInfo.id}
              id={characterInfo.id}
              image={characterInfo.image}
              name={characterInfo.name}
              species={characterInfo.species}
              gender={characterInfo.gender}
            />
          );
        })
      ) : (
        <p>Извините ничего не найдено</p>
      )}
    </main>
  );
}
