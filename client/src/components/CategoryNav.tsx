import { motion } from 'framer-motion';
import { CategoryCard } from '@/components/ui/category-card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faFilm, faCode } from '@fortawesome/free-solid-svg-icons';

const categoryData = [
  {
    id: 'audio',
    title: 'Audio',
    description: 'Sound design, music production & audio engineering',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    gradientFrom: 'from-primary/80',
    gradientTo: 'to-secondary/80'
  },
  {
    id: 'visual',
    title: 'Visual',
    description: 'Motion graphics, video production & digital art',
    imageUrl: 'https://images.unsplash.com/photo-1616166358812-6bc5108b1c88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    gradientFrom: 'from-secondary/80',
    gradientTo: 'to-accent/80'
  },
  {
    id: 'technical',
    title: 'Technical',
    description: 'Web development, interactive media & coding projects',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    gradientFrom: 'from-accent/80',
    gradientTo: 'to-primary/80'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const CategoryNav = () => {
  return (
    <div className="relative z-20 bg-background/95 backdrop-blur-md py-6 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <h2 className="sr-only">Portfolio Categories</h2>
        
        <div className="flex flex-wrap justify-center gap-6">
          {categoryData.map((category) => (
            <a 
              key={category.id}
              href={`#${category.id}`}
              className="category-nav-link relative group"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(category.id);
                if (element) {
                  const yOffset = -200;
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({top: y, behavior: 'smooth'});
                }
              }}
            >
              <div className="flex flex-col items-center text-center transition-all duration-300 group-hover:-translate-y-1">
                <div className={`w-16 h-16 mb-2 flex items-center justify-center rounded-full bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo}`}>
                  <span className="text-2xl text-white">
                    {category.id === 'audio' && <FontAwesomeIcon icon={faMusic} />}
                    {category.id === 'visual' && <FontAwesomeIcon icon={faFilm} />}
                    {category.id === 'technical' && <FontAwesomeIcon icon={faCode} />}
                  </span>
                </div>
                <h3 className="text-lg font-playfair">{category.title}</h3>
                <p className="text-sm text-gray-400 max-w-[200px]">{category.description}</p>
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                  category.id === 'audio' ? 'bg-primary' : 
                  category.id === 'visual' ? 'bg-secondary' : 'bg-accent'
                }`}></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
