import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Link to={'/controlled'}>
        <p>controlled components</p>
      </Link>
      <Link to={'/uncontrolled'}>
        <p>uncontrolled components</p>
      </Link>
    </>
  );
}

export default App;
