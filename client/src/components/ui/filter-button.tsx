import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FilterButtonProps {
  children: ReactNode;
  active: boolean;
  color: 'primary' | 'secondary' | 'accent';
  onClick: () => void;
}

export const FilterButton = ({
  children,
  active,
  color,
  onClick
}: FilterButtonProps) => {
  const activeClasses = {
    primary: active ? 'bg-primary/10' : 'bg-transparent',
    secondary: active ? 'bg-secondary/10' : 'bg-transparent',
    accent: active ? 'bg-accent/10' : 'bg-transparent',
  };
  
  const borderClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent',
  };
  
  const textClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
  };
  
  const hoverClasses = {
    primary: 'hover:bg-primary hover:text-white',
    secondary: 'hover:bg-secondary hover:text-white',
    accent: 'hover:bg-accent hover:text-white',
  };

  return (
    <button
      className={cn(
        'px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300',
        borderClasses[color],
        textClasses[color],
        activeClasses[color],
        hoverClasses[color]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
