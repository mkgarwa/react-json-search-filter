import React, { useState, useCallback } from 'react'
import './App.css'

// title
// description
const fixture = [{
  "title": "The Benefits of Meditation",
  "description": "This topic explores the advantages of incorporating a regular meditation practice into your daily routine, including improved focus, reduced stress, and better overall well-being."
}, {
  "title": "The Importance of Diversity and Inclusion in the Workplace",
  "description": "This topic discusses why it's essential to create a diverse and inclusive workplace and the benefits it can have for both employees and the company as a whole."
}, {
  "title": "The Future of Artificial Intelligence",
  "description": "This topic delves into the latest advancements in AI technology and the potential implications for society, including ethical considerations and job displacement."
}, {
  "title": "The Benefits of Traveling Solo",
  "description": "This topic explores the advantages of traveling alone, including the freedom to make your itinerary, the opportunity for self-discovery, and the chance to meet new people."
}, {
  "title": "The Power of Positive Thinking",
  "description": "This topic discusses the benefits of cultivating a positive mindset, including improved mental and physical health, greater resilience, and increased happiness."
}, {
  "title": "The Pros and Cons of Remote Work",
  "description": "This topic looks at the advantages and disadvantages of working remotely, including increased flexibility and autonomy, but also potential challenges with communication and work-life balance."
}, {
  "title": "The Future of Renewable Energy",
  "description": "This topic examines the latest developments in renewable energy sources, including solar, wind, and hydro power, and their potential to replace fossil fuels and reduce carbon emissions."
}, {
  "title": "The Benefits of Reading",
  "description": "This topic explores the advantages of reading, including improved cognitive function, increased empathy and understanding, and stress relief."
}, {
  "title": "The Ethics of Genetic Engineering",
  "description": "This topic discusses the ethical considerations of genetic engineering, including the potential for creating 'designer babies' and the implications for society as a whole."
}, {
  "title": "The Impact of Social Media on Society",
  "description": "This topic examines the influence of social media on our daily lives, including the potential benefits and drawbacks, such as increased connectivity, but also the spread of misinformation and potential privacy concerns."
}]

function App() {
  const [searchResult, setSearchResult] = useState([]);

  /**
   * Converts the search keyword(s) into an array and filter those keyword(s) from the database.
   * @param {string} searchQuery
   * @returns {array} filtered result
   */
  const filteredSearchResult = (searchQuery) => {
    if (searchQuery === "" || searchQuery.length < 2) return {};

    const inputWordList = searchQuery.match(/\w+|"[^"]+"/g);
    inputWordList.push(searchQuery);

    return fixture.filter((data) => {
      const filteredResult = JSON.stringify(Object.values(data)).toLowerCase();
      return inputWordList.every(result => filteredResult.includes(result));
    });
  };


  /**
   * Retreive the search results from db and set the resulted array into searchResult.
   */
  const filterdList = useCallback(({ target }) => {
    const searchQuery = target.value.toLowerCase();
    const updatedList = filteredSearchResult(searchQuery);
    setSearchResult(updatedList);
  }, []);

  /**
   * Renders a list of search result.
   * @param {object} searchResult 
   */
  const List = ({ searchResult }) => (
    <ul>
      {searchResult.map((result, index) => (
        <li key={index}>
          <h6>{result.title}</h6>
          <span>{result.description}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="app">
      <div className="content">
        <h2>Linkedin React Search</h2>
        <input type="text"
          onChange={filterdList}
          className="input"
          placeholder="Search..." />
          {searchResult.length ? <List searchResult={searchResult} /> : ""}
      </div>
    </div>
  )
}

export default App
