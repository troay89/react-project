import classes from './CardDetails.module.css';

interface CardDetailsI {
  id: number;
}

const CardDetails = ({}: CardDetailsI) => {
  return <div className={classes.square}></div>;
};

export { CardDetails };
