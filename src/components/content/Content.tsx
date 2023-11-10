import classes from './Content.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOT_FOUNDED_MESSAGE, SEARCH_VALUE } from '../../models/models';
import { Loader } from '../loader/Loader';
import { Pagination } from './pagination/Pagination';
import { getCharacters } from '../../api/api';
import { AuthContextProps, useDate } from '../../context/context';
import { Card } from './Card/Card';

const Content = () => {
  const [countItems, setCountItems] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const { searchPage, searchCharacter, setContent, content, sendNumberPage } =
    useDate() as AuthContextProps;

  console.log(1, 'render');

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    if (searchPage || searchCharacter) {
      getCharacters(
        searchCharacter ?? localStorage.getItem(SEARCH_VALUE) ?? '',
        countItems === 10
          ? Math.ceil((Number(searchPage) as number) / 2)
          : Number(searchPage) ?? 1,
        abortController
      )
        .then((result) => setContent(result))
        .then(() => setLoading(false));
    }
  }, [countItems, searchCharacter, searchPage, setContent]);

  function onDetailsCard(id: number) {
    navigate(`details/${id}?character=${searchCharacter}&page=${searchPage}`);
  }

  function sendPageNumber(page: number) {
    if (searchPage) {
      sendNumberPage(page.toString());
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={classes.container}>
      <div className={classes.containerCard}>
        {content?.results ? (
          content.results
            .filter((_, index) =>
              countItems === 10
                ? Number(searchPage) % 2 === 1
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
                  onClickHandler={() => onDetailsCard(id)}
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
            sendNumberPage('1');
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
    </main>
  );
};

export { Content };
