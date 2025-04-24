import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useFilter } from '@/hooks/use-filter';
import { FilterButton } from '@/components/ui/filter-button';
import { PortfolioItem } from '@/components/ui/portfolio-item';
import type { PortfolioItem as PortfolioItemType } from '@shared/schema';

const TechnicalSection = () => {
  const { data: technicalProjects, isLoading } = useQuery<PortfolioItemType[]>({
    queryKey: ['/api/portfolio/technical'],
  });
  
  const { filteredItems, activeFilter, handleFilterChange } = useFilter(
    technicalProjects || [],
    'category',
    'all'
  );
  
  const categories = [
    { value: 'all', label: 'All' },
    { value: 'web', label: 'Web' },
    { value: 'interactive', label: 'Interactive' },
    { value: 'app', label: 'Apps' }
  ];

  return (
    <section id="technical" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center mb-16">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl font-playfair font-bold mb-4">
              <span className="text-accent">Technical</span> Projects
            </h2>
            <div className="w-20 h-1 bg-accent mb-6"></div>
            <p className="text-xl text-gray-300 max-w-xl">
              Building interactive experiences through code, design, and technical innovation. Each project showcases technical creativity and problem-solving.
            </p>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              {categories.map((category) => (
                <FilterButton
                  key={category.value}
                  active={activeFilter === category.value}
                  color="accent"
                  onClick={() => handleFilterChange(category.value)}
                >
                  {category.label}
                </FilterButton>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Technical portfolio grid */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filteredItems.map((project) => (
              <PortfolioItem
                key={project.id}
                item={project}
                color="accent"
                hasLink
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TechnicalSection;
