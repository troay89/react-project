import classes from './CardDetails.module.css';
import { useNavigate, useParams } from 'react-router';
import { FaWindowClose } from 'react-icons/fa';
import { postAPI } from '../../../api/apiRedux';

const CardDetails = () => {
  const navigate = useNavigate();
  const id: string = useParams().id || '';

  function onClose() {
    navigate(-1);
  }

  const {
    data: character,
    // error,
    // isLoading,
  } = postAPI.useFetchCharacterQuery(id);

  return (
    <>
      <div className={classes.cover} onClick={onClose}></div>
      <div className={classes.square}>
        <FaWindowClose
          className={classes.windowClose}
          role={'windowClose'}
          color={'red'}
          cursor={'pointer'}
          onClick={onClose}
        />
        <h3>{character?.name}</h3>
        <img src={character?.image} alt={'character'} />
        <p>species: {character?.species}</p>
        <p>gender: {character?.gender}</p>
      </div>
    </>
  );
};

export { CardDetails };
