import { useState } from 'react';
import { RestaurantModel } from '../models/RestaurantModel';
import { VisitModel } from '../models/VisitModel';

export function useJournalViewModel() {
  const [visits, setVisits] = useState([]);
  const [stats, setStats] = useState({ total: 0, discovered: 0, percent: 0 });
  const [sortBy, setSortBy] = useState('newest'); 
  
  const [selectedCompanionsFilter, setSelectedCompanionsFilter] = useState([]);

  const loadData = async () => {
    try {
      const vData = await VisitModel.getAllWithMedia();
      setVisits(vData);

      const newStats = await RestaurantModel.getStats();
      setStats(newStats);
    } catch (error) { 
      console.error(error); 
    }
  };

  const availableCompanions = [...new Set(
    visits
      .map(v => v.companions)
      .filter(Boolean) 
      .flatMap(c => c.split(', '))
  )].sort();

  const toggleCompanionFilter = (comp) => {
    setSelectedCompanionsFilter(prev => 
      prev.includes(comp) ? prev.filter(c => c !== comp) : [...prev, comp]
    );
  };

  const displayedVisits = [...visits]
    .filter(v => {
      if (selectedCompanionsFilter.length === 0) return true;
      if (!v.companions) return false;
      
      return selectedCompanionsFilter.every(filterComp => v.companions.includes(filterComp));
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.id - a.id; 
      if (sortBy === 'rating') return b.rating - a.rating; 
      if (sortBy === 'alpha') return a.resName.localeCompare(b.resName); 
      return 0;
    });

  return {
    stats, loadData,
    sortBy, setSortBy,
    displayedVisits,
    availableCompanions, selectedCompanionsFilter, toggleCompanionFilter
  };
}