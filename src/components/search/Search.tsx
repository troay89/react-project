import classes from './Search.module.css';
import React, { Component } from 'react';
import Card from '../content/Card/Card';
import getCharacters from '../../api/api';
import ContentI from '../../entity/Content';

const SEARCH_VALUE = 'searchValue';

interface SearchDefaultProps {}

interface SearchProps extends SearchDefaultProps {}

interface SearchInputState {
  content: ContentI;
  inputSearch: string;
  count: number;
}

type DefaultProps = Readonly<SearchDefaultProps>;
type Props = Readonly<SearchProps>;
type State = Readonly<SearchInputState>;

export default class Search extends Component<Props, State> {
  public static readonly defaultProps: DefaultProps = {};

  private onErrorSubmit() {
    this.setState({ count: 1 });
  }

  private onSubmit() {
    this.saveSearchValue(
      this.state.inputSearch ?? localStorage.getItem(SEARCH_VALUE) ?? ''
    );
  }

  private saveSearchValue(searchValue: string) {
    localStorage.setItem(SEARCH_VALUE, searchValue.trim());
    this.getContent().then((r) => r);
  }

  private async getContent() {
    const result = await getCharacters(
      localStorage.getItem(SEARCH_VALUE) ?? ''
    );
    this.setState({ content: result });
  }

  componentDidMount?(): void {
    this.getContent().then((r) => r);
  }

  render(): React.ReactElement {
    if (this.state?.count === 1) {
      throw new Error('crashed!');
    }
    return (
      <>
        <header className={classes.searchArea}>
          <form className={classes.searchForm}>
            <input
              defaultValue={localStorage.getItem(SEARCH_VALUE) ?? ''}
              className={classes.searchInput}
              type={'search'}
              placeholder={'Введите сюда имя персонажа которого хотите найти'}
              onChange={(event) =>
                this.setState({ inputSearch: event.target.value })
              }
            />
            <input
              className={classes.searchButton}
              type={'button'}
              value={'НАЙТИ'}
              onClick={this.onSubmit.bind(this)}
            />
            <input
              className={classes.searchButton}
              type={'button'}
              value={'Ошибка'}
              onClick={this.onErrorSubmit.bind(this)}
            />
          </form>
        </header>
        <main className={classes.containerCard}>
          {this.state?.content.results !== undefined ? (
            this.state?.content.results.map((characterInfo) => {
              return (
                <Card
                  key={characterInfo.id}
                  id={characterInfo.id}
                  linkImage={characterInfo.image}
                  nameCharacter={characterInfo.name}
                  species={characterInfo.species}
                  gender={characterInfo.gender}
                />
              );
            })
          ) : (
            <p>Извините ничего не найдено</p>
          )}
        </main>
      </>
    );
  }
}
