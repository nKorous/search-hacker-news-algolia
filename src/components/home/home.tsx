import React, { useState } from "react";
import { fetchURL } from '../../services/fetch-service'
import "./home.css";

export const Home = () => {
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([])

  const executeSearch = () => {
    fetchURL(searchTerms)
        .then(results => results.json())
        .then(res => {
            setSearchResults(res.hits)
        })
  };

  return (
    <div>
      <div className="container">
        <div className="searchContainer">
          <label style={{ fontSize: "xx-large" }}>
            Search For:
            <input onChange={(event) => setSearchTerms(event.target.value)} className="searchInput" type="search" placeholder="Search..."></input>
          </label>
          <button className="searchButton" onClick={() => executeSearch()}>
            Search
          </button>
        </div>
        <div className="resultsBox">
            {
                searchResults && searchResults.map(sr => {
                    return ResultCard(sr)
                })
            }
        </div>
      </div>
    </div>
  );
};

const ResultCard = ({title, url, author}: {title: string, url: string, author: string}) => {
    return (
        <div className='resultCard'>
            <h3><label>Title: { title }</label></h3>
            <ul>
                <li><label>Author: { author }</label></li>
                <li><label>URL: <a href={url}>{ url }</a> </label></li>
            </ul>
        </div>
    )
}
