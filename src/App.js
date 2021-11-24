import React from "react"
import Header from "./pages/Header/component";
import BookList from "./pages/BookList/component";
import BookDescription from "./pages/BookDescription/component";
import "./assets/style/Style.css"

export default function App() {
  const [bookData, setBookData] = React.useState(false);
  const [showBookData, setShowBookData] = React.useState(false);

  function sendBookData(e) {
    setShowBookData(true);
    setBookData(e);
  }

  function closeShowBook() {
    setShowBookData(false);
    setBookData(false);
  }
  return(
    <div className="App">
      <Header />
      {showBookData && (
        <BookDescription book={bookData} closeShowBook={closeShowBook} />
      )}
      <BookList bookData={sendBookData} />
    </div>
  )
}
