import { motion } from 'framer-motion';
import { CategoryCard } from '@/components/ui/category-card';

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
    <section id="portfolio" className="py-20 pb-40 relative">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-playfair font-bold mb-4">Portfolio Categories</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Explore my work across different creative domains</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categoryData.map((category) => (
            <motion.div key={category.id} variants={item}>
              <CategoryCard 
                id={category.id}
                title={category.title}
                description={category.description}
                imageUrl={category.imageUrl}
                gradientFrom={category.gradientFrom}
                gradientTo={category.gradientTo}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryNav;
