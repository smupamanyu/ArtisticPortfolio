import { useEffect, RefObject } from 'react';
import { throttle } from '@/lib/utils';

export const useParallax = (
  ref: RefObject<HTMLElement>,
  speed: number = 0.2
) => {
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    
    const handleScroll = throttle(() => {
      if (!element) return;
      
      const offset = window.scrollY * speed;
      element.style.transform = `translateY(${offset}px)`;
    }, 10);
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, speed]);
};
