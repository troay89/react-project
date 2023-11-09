import classes from './CardDetails.module.css';
import { useNavigate, useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { CharacterI } from '../../../models/models';
import { getCharacterDetails } from '../../../api/api';
import { FaWindowClose } from 'react-icons/fa';
import { Loader } from '../../loader/Loader';

const CardDetails = () => {
  const [content, setContent] = useState<null | CharacterI>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const id: string = useParams().id || '';

  function onClose() {
    navigate(-1);
  }

  useEffect(() => {
    setLoading(true);
    getCharacterDetails(id)
      .then((result) => setContent(result))
      .then(() => setLoading(false));
  }, [id]);

  return (
    <>
      <div className={classes.cover} onClick={onClose}></div>(
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.square}>
            <FaWindowClose
              className={classes.windowClose}
              color={'red'}
              cursor={'pointer'}
              onClick={onClose}
            />
            <h3>{content?.name}</h3>
            <img src={content?.image} alt={'character'} />
            <p>species: {content?.species}</p>
            <p>gender: {content?.gender}</p>
          </div>
        </>
      )}
      )
    </>
  );
};

export { CardDetails };
