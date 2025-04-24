import { useState, useEffect } from 'react';

export const useFilter = <T extends Record<string, any>>(
  items: T[],
  filterBy: keyof T,
  defaultFilter: string = 'all'
) => {
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item[filterBy] === activeFilter));
    }
  }, [activeFilter, items, filterBy]);
  
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };
  
  return {
    filteredItems,
    activeFilter,
    handleFilterChange
  };
};
