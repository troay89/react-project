import classes from './Content.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NOT_FOUNDED_MESSAGE } from '../../models/models';
import { Pagination } from './pagination/Pagination';
import { Card } from './Card/Card';
import { postAPI } from '../../api/apiRedux';
import { useCustomSelector } from '../../redux/store/hooks';
import { Loader } from '../loader/Loader';

const Content = () => {
  const [countItems, setCountItems] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const searchString = useCustomSelector((state) => state.search.searchString);

  const {
    data: characters,
    error,
    isLoading,
  } = postAPI.useFetchAllPostsQuery({ page: page, search: searchString });

  // useEffect(() => {
  //   setLoading(true);
  //   const abortController = new AbortController();
  //   if (searchPage || searchCharacter) {
  //     getCharacters(
  //       searchCharacter ?? localStorage.getItem(SEARCH_VALUE) ?? '',
  //       countItems === 10
  //         ? Math.ceil((Number(searchPage) as number) / 2)
  //         : Number(searchPage) ?? 1,
  //       abortController
  //     )
  //       .then((result) => setContent(result))
  //       .then(() => setLoading(false));
  //   }
  // }, [countItems, searchCharacter, searchPage, setContent]);

  function onDetailsCard(id: number) {
    navigate(`details/${id}?character=${searchString}&page=${page}`);
  }

  function sendPageNumber(page: number) {
    setPage(page);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={classes.container}>
      <div className={classes.containerCard} role={'characterList'}>
        {!isLoading && error ? <p>{NOT_FOUNDED_MESSAGE}</p> : null}
        {!isLoading && !error
          ? characters?.results
              .filter((_, index) =>
                countItems === 10
                  ? Number(1) % 2 === 1
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
          : null}
      </div>
      <div className={classes.containerSelect}>
        <p>Сколько элементов отображать на странице</p>
        <select
          name="selectItems"
          onChange={(event) => {
            setCountItems(Number(event.target.value));
            setPage(1);
          }}
          defaultValue={countItems}
        >
          <option value="20">20</option>
          <option value="10">10</option>
        </select>
      </div>
      <span className={classes.containerPages} role={'containerPages'}>
        {[
          ...new Array(
            countItems === 20
              ? characters?.info?.pages
              : Math.ceil((characters?.info?.count ?? 1) / 10)
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
