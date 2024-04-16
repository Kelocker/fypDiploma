import React from 'react';
import '../css/FilterBar.css'; // Make sure to create this CSS file

const FilterBar = ({ currentFilter, setFilter }) => {
    const filters = [
        { label: 'All Exercises' },
        { label: 'Beginner', icon: '⬤', colorClass: 'beginner-icon' },
        { label: 'Intermediate', icon: '⬤', colorClass: 'intermediate-icon' },
        { label: 'Advanced', icon: '⬤', colorClass: 'advanced-icon' },
      ];
  
    return (
      <div className="filter-bar">
        {filters.map((filter, index) => (
          <div
            key={index}
            className={`filter-item ${currentFilter === filter.label ? 'active' : ''}`}
            onClick={() => setFilter(filter.label)}
          >
            <span className={`filter-icon ${filter.colorClass}`}>{filter.icon}</span>
            {`${filter.label} `}
          </div>
        ))}
      </div>
    );
  };
  
  export default FilterBar;
