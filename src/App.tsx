import './App.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from './redux/store/hooks';

function App() {
  const data = useAppSelector((state) => state.data);
  return (
    <>
      <Link to={'/controlled'}>
        <p>controlled components</p>
      </Link>
      <Link to={'/uncontrolled'}>
        <p>uncontrolled components</p>
      </Link>
      {data.length ? (
        <div className={'container-submits'}>
          {data.map((dataPerson, id) => {
            return (
              <div className={'item-submit'} key={id}>
                <h1 className={'title-submit'}>{dataPerson.username}</h1>
                <p className={'data-submit'}>{dataPerson.age}</p>
                <p className={'data-submit'}>{dataPerson.email}</p>
                <p className={'data-submit'}>{dataPerson.country}</p>
                <p className={'data-submit'}>{dataPerson.gender}</p>
                <p className={'data-submit'}>{dataPerson.firstPassword}</p>
                <img
                  className={'image-submit'}
                  src={`${dataPerson.download}`}
                  alt="изображение"
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default App;
