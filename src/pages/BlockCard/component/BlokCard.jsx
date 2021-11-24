import React from 'react';
import '../style/BlockCard.css'
import getBooks from "../../../store/actions";

export default function BlockCard({props}) {

  return (
    <div className="book-card" onClick={() => getBooks.toggleDescription(props.id)}>
      <img
        className="book-card__img"
        alt="book"
        src={
          props.volumeInfo.imageLinks
            ? props.volumeInfo.imageLinks.thumbnail
            : "#"
        }
      />
      <p className="book-card__categories">{props.volumeInfo?.categories}</p>
      <h5 className="book-card__title">{props.volumeInfo?.title}</h5>
      <p className="book-card__authors">{props.volumeInfo?.authors}</p>
    </div>
  );
}