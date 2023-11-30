import './App.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from './redux/store/hooks.ts';

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
      <img src={`${data.download}`} alt="логотип" />
    </>
  );
}

export default App;
