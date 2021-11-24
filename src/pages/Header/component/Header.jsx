import React from 'react';
import { observer } from "mobx-react-lite";
import getBooks from "../../../store/actions";

import '../style/Header.css';

const Header = observer(() => {

  return (
    <header className="header">
      <h1 className="header__title">Search for books</h1>
      <div className="input-wrapper">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            getBooks.fetchArray()

          }}
        >
          <input
            name="books"
            className="header__input"
            type="text"
            onChange={(event) => getBooks.inputBooks(event.target.value)}
          />
        </form>
        <button
          className="btn__search"
          onClick={() => {
            getBooks.fetchArray()
          }}
        >
          Search
        </button>
      </div>
      <div className="select-wrapper">
        <label htmlFor="categories" className="categories-label">
          {" "}
          Categories{" "}
          <select
            className="header__select__categories"
            size="1"
            onChange={(event) => getBooks.inputCategories(event.target.value)}
          >
            <option value="all">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="computers">computers</option>
            <option value="history">history</option>
            <option value="medical">medical</option>
            <option value="poetry">poetry</option>
          </select>
        </label>


        <label htmlFor="sorting" className="sorting-label">
          {" "}
          Sorting{" "}
          <select
            className="header__select__sorting"
            size="1"
            onChange={(event) => getBooks.inputSorting(event.target.value)}
          >
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </label>
      </div>
    </header>
  );
})
export default Header