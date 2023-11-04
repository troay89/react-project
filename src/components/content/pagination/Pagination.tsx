import classes from './Pagination.module.css';

interface PaginationI {
  numberPage: number;
  onSelectPage: (page: number) => void;
}

const Pagination = ({ numberPage, onSelectPage }: PaginationI) => {
  return (
    <span className={classes.page} onClick={() => onSelectPage(numberPage)}>
      {numberPage}
    </span>
  );
};

export { Pagination };
