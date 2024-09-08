import React from "react";

const Popularity = ({ options, sortPopularity }) => {
  const handleChange = (e) => {
    sortPopularity(e.target.value);
  };

  return (
    <div className="popularity-container">
      <label htmlFor="popularity-select" className="popularity-label">Sort by:</label>
      <select
        id="popularity-select"
        className="popularity-select"
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option === "popularity.desc" && "✰Popularity Descending✰"}
            {option === "popularity.asc" && "✰Popularity Ascending✰"}
            {option === "rating.desc" && "✰Highest Rating✰"}
            {option === "rating.asc" && "✰Lowest Rating✰"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Popularity;
