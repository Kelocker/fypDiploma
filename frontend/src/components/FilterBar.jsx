import React from 'react';
import '../css/FilterBar.css'; // Make sure to create this CSS file

const FilterBar = ({ currentFilter, setFilter }) => {
  const filters = [
    { label: 'All Exercises', difficulty: '' },
    { label: 'Beginner', difficulty: 'B', icon: '⬤', colorClass: 'beginner-icon' },
    { label: 'Intermediate', difficulty: 'I', icon: '⬤', colorClass: 'intermediate-icon' },
    { label: 'Advanced', difficulty: 'A', icon: '⬤', colorClass: 'advanced-icon' },
];

    return (
      <div className="filter-bar">
        {filters.map((filter, index) => (
          <div
            key={index}
            className={`filter-item ${currentFilter === filter.difficulty  ? 'active' : ''}`}
            onClick={() => setFilter(filter.difficulty)} // Pass the difficulty key to the callback
          >
            <span className={`filter-icon ${filter.colorClass}`}>{filter.icon}</span>
            {`${filter.label} `}
          </div>
        ))}
      </div>
    );
  };
  
  export default FilterBar;
