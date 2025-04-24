import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to a server
      // For demonstration, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl font-playfair font-bold mb-6">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <div className="w-20 h-1 bg-primary mb-8"></div>
            
            <p className="text-xl text-gray-300 mb-8">
              Interested in working together or just want to say hello? Feel free to reach out through any of these channels.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <h3 className="font-montserrat font-medium mb-1">Email</h3>
                  <a href="mailto:hello@artistportfolio.com" className="text-gray-300 hover:text-primary transition-colors duration-300">hello@artistportfolio.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <div>
                  <h3 className="font-montserrat font-medium mb-1">Location</h3>
                  <p className="text-gray-300">Los Angeles, California</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <i className="fas fa-share-alt text-primary"></i>
                </div>
                <div>
                  <h3 className="font-montserrat font-medium mb-1">Social</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="bg-background/60 p-2 rounded-full text-gray-300 hover:text-primary hover:bg-background/80 transition-all duration-300">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="bg-background/60 p-2 rounded-full text-gray-300 hover:text-primary hover:bg-background/80 transition-all duration-300">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="bg-background/60 p-2 rounded-full text-gray-300 hover:text-primary hover:bg-background/80 transition-all duration-300">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="bg-background/60 p-2 rounded-full text-gray-300 hover:text-primary hover:bg-background/80 transition-all duration-300">
                      <i className="fab fa-behance"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form 
              className="bg-background/50 backdrop-blur-sm rounded-xl p-8 border border-primary/20"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-montserrat mb-2">Name</label>
                  <input 
                    type="text"
                    id="name"
                    {...register('name')}
                    className="w-full bg-background/60 border border-gray-700 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-montserrat mb-2">Email</label>
                  <input 
                    type="email"
                    id="email"
                    {...register('email')}
                    className="w-full bg-background/60 border border-gray-700 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                    placeholder="Your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-montserrat mb-2">Subject</label>
                  <input 
                    type="text"
                    id="subject"
                    {...register('subject')}
                    className="w-full bg-background/60 border border-gray-700 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                    placeholder="Subject"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-montserrat mb-2">Message</label>
                  <textarea 
                    id="message"
                    rows={4}
                    {...register('message')}
                    className="w-full bg-background/60 border border-gray-700 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                    placeholder="Your message"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-montserrat py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
