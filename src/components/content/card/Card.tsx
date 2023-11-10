import React from 'react';

interface CardPropsI {
  id: number;
  image: string;
  species: string;
  name: string;
  gender: string;
  onClickHandler: () => void;
}

const Card = ({
  id,
  image,
  species,
  gender,
  name,
  onClickHandler,
}: CardPropsI) => {
  return (
    <div key={id}>
      <img src={image} alt={'изображения персонажа'}></img>
      <h2>{name}</h2>
      <h3>short description</h3>
      <p>gender: {gender}</p>
      <p>species: {species}</p>
      <button onClick={onClickHandler}>подробнее</button>
    </div>
  );
};

export { Card };
