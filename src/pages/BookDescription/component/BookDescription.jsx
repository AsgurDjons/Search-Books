import React from 'react';
import getBooks from "../../../store/actions";
import '../style/BookDescription.css'

export default function BookDescription({data}) {
  return (
    <div className="book-item-wrapper">
      <div className="book-item__img__wrapper">
        <img
          className="book-item__img"
          alt="book"
          src={
            data.volumeInfo.imageLinks
              ? data.volumeInfo.imageLinks.thumbnail
              : "#"
          }
        />
      </div>

      <div className="book-item-description-wrapper">
        <p className="book-item__breadcrumbs">
          <span>{data.volumeInfo.categories}</span>
        </p>
        <h2 className="book-item__title">{data.volumeInfo.title}</h2>
        <p className="book-item__authors">{data.volumeInfo.authors}</p>
        <p className="book-item__description">{data.volumeInfo.description}</p>
      </div>
      <button className="book-item__button"
      onClick={() => getBooks.toggleDescription()}>
        close
      </button>
    </div>
  );
}