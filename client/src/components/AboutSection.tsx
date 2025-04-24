import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import type { Skill } from '@shared/schema';

const AboutSection = () => {
  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ['/api/skills'],
  });
  
  const audioSkills = skills?.filter(skill => skill.type === 'audio') || [];
  const visualSkills = skills?.filter(skill => skill.type === 'visual') || [];
  const technicalSkills = skills?.filter(skill => skill.type === 'technical') || [];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-30 rounded-xl blur-md transform rotate-6"></div>
              <img 
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Artist Portrait" 
                className="relative z-10 rounded-xl w-full h-auto object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-3/5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-5xl font-playfair font-bold mb-6">
              About the <span className="text-primary">Artist</span>
            </h2>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            
            <div className="space-y-6 text-gray-300">
              <p className="text-xl">
                I am a multidisciplinary artist exploring the intersection of sound, visuals, and technology. My work seeks to create immersive experiences that engage the senses and challenge perceptions.
              </p>
              
              <p>
                With a background in audio engineering and digital media, I combine technical expertise with creative expression to develop unique projects across various mediums. My process often involves experimentation with new technologies and collaborative approaches.
              </p>
              
              <p>
                I believe in the power of art to communicate complex ideas and emotions, and I strive to create work that resonates on both intellectual and emotional levels.
              </p>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <a 
                  href="#contact" 
                  className="bg-primary hover:bg-primary/90 text-white font-montserrat px-6 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get In Touch
                </a>
                <a 
                  href="#" 
                  className="border border-primary text-primary hover:bg-primary/10 font-montserrat px-6 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-1"
                >
                  Download Resume
                </a>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-playfair font-bold mb-6">Skills & Expertise</h3>
              
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Audio Skills */}
                  <div className="space-y-2">
                    <h4 className="font-montserrat font-medium">Audio</h4>
                    <div className="space-y-3">
                      {audioSkills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{skill.name}</span>
                            <span className="text-sm">{skill.percentage}%</span>
                          </div>
                          <div className="h-1.5 bg-background/60 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${skill.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Visual Skills */}
                  <div className="space-y-2">
                    <h4 className="font-montserrat font-medium">Visual</h4>
                    <div className="space-y-3">
                      {visualSkills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{skill.name}</span>
                            <span className="text-sm">{skill.percentage}%</span>
                          </div>
                          <div className="h-1.5 bg-background/60 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-secondary rounded-full" 
                              style={{ width: `${skill.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Technical Skills */}
                  <div className="space-y-2">
                    <h4 className="font-montserrat font-medium">Technical</h4>
                    <div className="space-y-3">
                      {technicalSkills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{skill.name}</span>
                            <span className="text-sm">{skill.percentage}%</span>
                          </div>
                          <div className="h-1.5 bg-background/60 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-accent rounded-full" 
                              style={{ width: `${skill.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
