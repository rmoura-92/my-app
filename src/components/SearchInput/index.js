import { useCallback, useState, useEffect } from 'react'
import Results from './Results';
import axios from 'axios';
import debounce from 'lodash/debounce';

const INITIAL_STATE = {
  results: [],
  info: null
}

function SearchInput() {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState(INITIAL_STATE);
  const clearData = () => setData(INITIAL_STATE);

  const handleSearch = useCallback(debounce((value) => setIsLoading(true), 500),[]);

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);

    if (!value.length) {
      if (data.results && data.results.length) {
        clearData();
      }
      return false;
    }
    
    handleSearch(value);
  };

  useEffect(() => {
    if (!isLoading) return false;

    const fetchData = async () => {
      const res = await axios.get(`https://rickandmortyapi.com/api/character`, {
        params: {
          name: value,
        }
      });
      const isOK = res.status === 200;
      setData(isOK ? res.data : INITIAL_STATE);
      setIsLoading(false);
    }

    fetchData();

    return () => false;
  }, [isLoading, value])
  
  const handleLoadMore = (e) => {
    e.preventDefault();

    setIsLoading(true);

  }

  return (
    <div className="search-input-wrapper">
      <input className="search" name="search" type="search" onChange={handleChange} value={value} />
      <Results data={results} isLoading={isLoading} handleLoadMore={handleLoadMore} />
    </div>
  )
}

export default SearchInput;