import React from 'react';
import { observer } from "mobx-react-lite";
import getBooks from "../../../store/actions";
import BlockCard from "../../BlockCard/component";
import BookDescription from "../../BookDescription/component";
import '../style/BookList.css'

const BookList = observer(() => {

  return (
    <main>
      {(getBooks.booksCount !== 0 && getBooks.descrToggle === false)? (
        <div className="container">
          <p className="books-counter">Found {getBooks.booksCount} results</p>
          <div className="items-book">
            { getBooks.array.map(item => <BlockCard props={item} key={item.id} />) }
          </div>
          <button
            className="btn_loadMore"
            onClick={getBooks.fetchMoreArray}
          >Load more</button>
        </div>
      ) : false}
      {getBooks.descrToggle === true? (getBooks.array.map(item => {
        if (item.id === getBooks.descrID) {
          return <BookDescription data={item} key={item.id} />
        }
      })): false}
    </main>
  );
})
export default BookList