import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [Books, setBooks] = useState([]);
  const [Title, setTitle] = useState(''); 
  const [release_year, setReleaseYear] = useState(''); 
  const[newtitle,setnewtitle]=useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateTitle= async(pk,release_year)=>{
     const bookdata = {
          Title: newtitle,
          release_year: release_year
        };
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/books/${pk}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookdata),
          });
    
          const data = await response.json(); 
          setBooks((prev)=>prev.map((book=>{
               if(book.id==pk){
                    return data;

               }else{
                    return book;
               }

          })))
        } catch (error) {
          console.log(error);
        }
     

  }

  const addBook = async () => {
    const bookdata = {
      Title,
      release_year: release_year
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookdata),
      });

      const data = await response.json(); 
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Books</h1>
      <div>
        <input type='text' placeholder='Book Title' value={Title} onChange={(e) => setTitle(e.target.value)} />
        <input type='number' placeholder='Release Date' value={release_year} onChange={(e) => setReleaseYear(e.target.value)} />
        <button onClick={addBook}> Add Book </button> 
      </div>
      {Books.map((book) => (
        <div key={book.id}>
          <p>Title: {book.Title}</p>
          <p>Release year: {book.release_year}</p>
          <input type='text' placeholder='New title' onChange={(e) => setnewtitle(e.target.value)}>
          </input>
          <button onClick={()=>updateTitle(book.id,book.release_year)}>Change title </button>
        </div>
      ))}
    </>
  );
}

export default App;
