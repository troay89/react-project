import { FaSpinner } from 'react-icons/fa';
import classes from './Loader.module.css';

const Loader = () => {
  return (
    <div className={classes.loading}>
      <FaSpinner className={`${classes.spinner} ${classes.loading}`} />
      <span>Loading...</span>
    </div>
  );
};

export { Loader };
