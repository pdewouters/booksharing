import axios from 'axios';

export function getBooks(searchTerm) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;
  return axios.get(url)
  .then(response => response.data.items);
}
