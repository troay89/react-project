import React, { Component } from 'react';

interface CardDefaultProps {}

interface CardProps extends CardDefaultProps {
  id: number;
  linkImage: string;
  nameCharacter: string;
  gender: string;
  species: string;
}

type DefaultProps = Readonly<CardDefaultProps>;
type Props = Readonly<CardProps>;

export default class Card extends Component<Props> {
  public static readonly defaultProps: DefaultProps = {};
  render(): React.ReactElement {
    return (
      <div key={this.props.id}>
        <img src={this.props.linkImage} alt={'изображения персонажа'}></img>
        <h2>{this.props.nameCharacter}</h2>
        <h3>short description</h3>
        <p>gender: {this.props.gender}</p>
        <p>species: {this.props.species}</p>
        <p></p>
      </div>
    );
  }
}
