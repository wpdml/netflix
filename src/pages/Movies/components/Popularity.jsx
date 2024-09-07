import React from "react";

const Popularity = ({ options, sortPopularity }) => {
  const handleChange = (e) => {
    sortPopularity(e.target.value);
  };

  return (
    <div>
      <div className="font-bold text-white">Sort by:</div>
      <select onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option === "popularity.desc" && "Popularity Descending"}
          {option === "popularity.asc" && "Popularity Ascending"}
          {option === "rating.desc" && "Highest Rating"}
          {option === "rating.asc" && "Lowest Rating"}
        </option>
      ))}
    </select>
    </div>
  );
};

export default Popularity;
