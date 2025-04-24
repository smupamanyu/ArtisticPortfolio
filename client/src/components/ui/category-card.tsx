import { motion } from 'framer-motion';

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gradientFrom: string;
  gradientTo: string;
}

export const CategoryCard = ({
  id,
  title,
  description,
  imageUrl,
  gradientFrom,
  gradientTo,
}: CategoryCardProps) => {
  return (
    <a 
      href={`#${id}`} 
      className="category-card group relative overflow-hidden rounded-xl h-80"
      onClick={(e) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          // Smooth scroll with offset
          const yOffset = -150; // Adjust based on header height and desired padding
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
        }
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <img 
        src={imageUrl}
        alt={`${title} Category`}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
        <motion.div 
          className="transform group-hover:-translate-y-2 transition-transform duration-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-playfair font-bold mb-2">{title}</h3>
          <p className="text-white/80">{description}</p>
          <div className="w-12 h-1 bg-white mt-4 mb-2 transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
          <span className="inline-block font-montserrat text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">EXPLORE →</span>
        </motion.div>
      </div>
    </a>
  );
};
