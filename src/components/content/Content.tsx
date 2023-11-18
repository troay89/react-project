import classes from './Content.module.css';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { NOT_FOUNDED_MESSAGE, SEARCH_VALUE } from '../../models/models';
import { Pagination } from './pagination/Pagination';
import { Card } from './Card/Card';
import { postAPI } from '../../api/apiRedux';
import { useCustomDispatch, useCustomSelector } from '../../redux/store/hooks';
import { Loader } from '../loader/Loader';
import { countItems } from '../../redux/features/count-items/countItemsSlice';
import { pageNumber } from '../../redux/features/page/pageSlice';

const Content = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = Number(searchParams.get('page'));
  const navigate = useNavigate();
  const searchString = useCustomSelector((state) => state.search.searchString);
  const showItems = useCustomSelector((state) => state.itemsPage.countItems);
  const page = useCustomSelector((state) => state.pageNumber.pageNumber);
  const dispatch = useCustomDispatch();

  const {
    data: characters,
    error,
    isLoading,
    isFetching,
  } = postAPI.useFetchAllPostsQuery({
    page: showItems === 10 ? Math.ceil(page / 2) : page ?? 1,
    search: searchString,
  });

  useEffect(() => {
    searchParams.set(
      'character',
      searchString ? searchString : localStorage.getItem(SEARCH_VALUE) ?? ''
    );
    searchParams.set('page', page ? page.toString() : '1');
    setSearchParams(searchParams);
  }, [page, searchString]);

  useEffect(() => {
    dispatch(pageNumber(queryPage));
  }, []);

  function onDetailsCard(id: number) {
    navigate(`details/${id}?character=${searchString}&page=${page}`);
  }

  function sendPageNumber(page: number) {
    dispatch(pageNumber(page));
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <main className={classes.container}>
      <div className={classes.containerCard} role={'characterList'}>
        {!isLoading && error ? <p>{NOT_FOUNDED_MESSAGE}</p> : null}
        {!isLoading && !error
          ? characters?.results
              .filter((_, index) =>
                showItems === 10
                  ? page % 2 === 1
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
            dispatch(countItems(Number(event.target.value)));
          }}
          defaultValue={showItems}
        >
          <option value="20">20</option>
          <option value="10">10</option>
        </select>
      </div>
      <span className={classes.containerPages} role={'containerPages'}>
        {[
          ...new Array(
            showItems === 20
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
