import React, { useState } from "react";
import { store } from "../../redux/redux";
import { fetchURL } from "../../services/fetch-service";
import "./home.css";

export const Home = () => {
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const executeSearch = () => {
    store.dispatch({ type: "ADD_SEARCH_TERM", payload: searchTerms });

    fetchURL(searchTerms)
      .then((results) => results.json())
      .then((res) => {
        setSearchResults(res.hits);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="headerContainer">Hacker News Algolia Search Engine</div>
        <div className="searchContainer">
          <label style={{ fontSize: "x-large" }}>
            Search For:
            <input onChange={(event) => setSearchTerms(event.target.value)} className="searchInput" type="search" placeholder="Type search term(s)... like Darth Vader"></input>
          </label>
          <button className="searchButton" onClick={() => executeSearch()}>
            Search
          </button>
        </div>
        <div className="resultsBox">
          {searchResults &&
            searchResults.map((sr, i) => {
              return ResultCard(sr, i);
            })}
        </div>
      </div>
    </div>
  );
};

const ResultCard = ({ title, url, author, story_text, comment_text }: { title: string; url: string; author: string; story_text: string; comment_text: string }, index: number) => {
  /** Trusting HTML that I didn't write is generally a bad thing....
   * it shouldn't be done because there can be some bad ramifications...
   * in this case i'm trusting that the content in this API has already
   * been sanitized and is only return trusted content. Hopefully that is the case.
   **/

  return (
    <div className="resultCard" key={index}>
      <h3>
        <label>Title: {title}</label>
      </h3>
      <ul>
        <li>
          <label>Author: {author}</label>
        </li>
        <li>
          <label>
            URL: <a href={url}>{url}</a>{" "}
          </label>
        </li>
      </ul>
      {story_text && (
        <label>
          Story:
          <p dangerouslySetInnerHTML={{ __html: story_text }}></p>
        </label>
      )}

      {comment_text && (
        <label>
          Comment:
          <p dangerouslySetInnerHTML={{ __html: comment_text }}></p>
        </label>
      )}
    </div>
  );
};
