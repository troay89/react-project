import classes from './CardDetails.module.css';
import { useNavigate, useParams } from 'react-router';
import React, { useEffect } from 'react';
import { getCharacterDetails } from '../../../api/api';
import { FaWindowClose } from 'react-icons/fa';
import { AuthContextProps, useDate } from '../../../context/context';

const CardDetails = () => {
  const { setContentCharacter, contentCharacter } =
    useDate() as AuthContextProps;
  const navigate = useNavigate();
  const id: string = useParams().id || '';

  function onClose() {
    navigate(-1);
  }

  useEffect(() => {
    getCharacterDetails(id).then((result) => setContentCharacter(result));
  }, [id, setContentCharacter]);

  return (
    <>
      <div className={classes.cover} onClick={onClose}></div>
      <div className={classes.square}>
        <FaWindowClose
          className={classes.windowClose}
          color={'red'}
          cursor={'pointer'}
          onClick={onClose}
        />
        <h3>{contentCharacter?.name}</h3>
        <img src={contentCharacter?.image} alt={'character'} />
        <p>species: {contentCharacter?.species}</p>
        <p>gender: {contentCharacter?.gender}</p>
      </div>
    </>
  );
};

export { CardDetails };
