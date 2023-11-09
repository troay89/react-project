import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.headerContainer}>
      <h1 className={classes.title}>React Project</h1>
    </div>
  );
};

export { Header };
