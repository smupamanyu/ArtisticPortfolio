import {
  users,
  type User,
  type InsertUser,
  type PortfolioItem,
  type InsertPortfolioItem,
  portfolioItems,
  skills,
  type Skill,
  type InsertSkill
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Users (required by template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolio Items
  getPortfolioItems(): Promise<PortfolioItem[]>;
  getPortfolioItemsByType(type: string): Promise<PortfolioItem[]>;
  getPortfolioItem(id: number): Promise<PortfolioItem | undefined>;
  createPortfolioItem(item: InsertPortfolioItem): Promise<PortfolioItem>;
  
  // Skills
  getSkills(): Promise<Skill[]>;
  getSkillsByType(type: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolioItems: Map<number, PortfolioItem>;
  private skills: Map<number, Skill>;
  userCurrentId: number;
  portfolioItemCurrentId: number;
  skillCurrentId: number;

  constructor() {
    this.users = new Map();
    this.portfolioItems = new Map();
    this.skills = new Map();
    this.userCurrentId = 1;
    this.portfolioItemCurrentId = 1;
    this.skillCurrentId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  // User methods (required by template)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Portfolio item methods
  async getPortfolioItems(): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values());
  }
  
  async getPortfolioItemsByType(type: string): Promise<PortfolioItem[]> {
    return Array.from(this.portfolioItems.values()).filter(
      (item) => item.type === type
    );
  }
  
  async getPortfolioItem(id: number): Promise<PortfolioItem | undefined> {
    return this.portfolioItems.get(id);
  }
  
  async createPortfolioItem(insertItem: InsertPortfolioItem): Promise<PortfolioItem> {
    const id = this.portfolioItemCurrentId++;
    const item: PortfolioItem = { ...insertItem, id };
    this.portfolioItems.set(id, item);
    return item;
  }
  
  // Skills methods
  async getSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values());
  }
  
  async getSkillsByType(type: string): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(
      (skill) => skill.type === type
    );
  }
  
  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const id = this.skillCurrentId++;
    const skill: Skill = { ...insertSkill, id };
    this.skills.set(id, skill);
    return skill;
  }
  
  // Initialize with sample data
  private initSampleData() {
    // Audio projects
    this.createPortfolioItem({
      title: "Ethereal Echoes",
      description: "Electronic music album featuring ambient soundscapes and rhythmic patterns",
      type: "audio",
      category: "music",
      imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
      mediaUrl: "/samples/ethereal-echoes.mp3",
      technologies: null,
      projectUrl: null
    });
    
    this.createPortfolioItem({
      title: "Cosmic Frontier",
      description: "Sound design for sci-fi game featuring futuristic interfaces and alien environments",
      type: "audio",
      category: "sound-design",
      imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce",
      mediaUrl: "/samples/cosmic-frontier.mp3",
      technologies: null,
      projectUrl: null
    });
    
    this.createPortfolioItem({
      title: "Creative Dialogues",
      description: "Interview podcast series featuring conversations with artists and creators",
      type: "audio",
      category: "podcast",
      imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
      mediaUrl: "/samples/creative-dialogues.mp3",
      technologies: null,
      projectUrl: null
    });
    
    // Visual projects
    this.createPortfolioItem({
      title: "Abstract Flows",
      description: "Motion graphics exploring fluid dynamics and color theory through abstract visuals",
      type: "visual",
      category: "motion",
      imageUrl: "https://images.unsplash.com/photo-1576694440020-79f70a67f9fb",
      mediaUrl: null,
      technologies: null,
      projectUrl: null
    });
    
    this.createPortfolioItem({
      title: "Urban Solitude",
      description: "Short documentary exploring isolation and connection in urban environments",
      type: "visual",
      category: "film",
      imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279",
      mediaUrl: null,
      technologies: null,
      projectUrl: null
    });
    
    this.createPortfolioItem({
      title: "Ethereal Landscapes",
      description: "Digital art series exploring imaginary landscapes and surreal environments",
      type: "visual",
      category: "digital-art",
      imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42",
      mediaUrl: null,
      technologies: null,
      projectUrl: null
    });
    
    // Technical projects
    this.createPortfolioItem({
      title: "Creative Portfolio",
      description: "Interactive portfolio website featuring custom animations and responsive design",
      type: "technical",
      category: "web",
      imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166",
      mediaUrl: null,
      technologies: ["React", "GSAP", "Three.js"],
      projectUrl: "https://project-url.com"
    });
    
    this.createPortfolioItem({
      title: "Sound Sculpture",
      description: "Interactive installation that responds to movement with dynamic sound and light",
      type: "technical",
      category: "interactive",
      imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
      mediaUrl: null,
      technologies: ["Arduino", "Max/MSP", "Custom Hardware"],
      projectUrl: "https://project-url.com"
    });
    
    this.createPortfolioItem({
      title: "Harmony",
      description: "Music creation app that uses AI to help users compose original tracks",
      type: "technical",
      category: "app",
      imageUrl: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6",
      mediaUrl: null,
      technologies: ["React Native", "TensorFlow", "Web Audio API"],
      projectUrl: "https://project-url.com"
    });
    
    // Skills
    // Audio skills
    this.createSkill({
      name: "Music Production",
      type: "audio",
      percentage: 95
    });
    
    this.createSkill({
      name: "Sound Design",
      type: "audio",
      percentage: 90
    });
    
    this.createSkill({
      name: "Audio Engineering",
      type: "audio",
      percentage: 85
    });
    
    // Visual skills
    this.createSkill({
      name: "Motion Graphics",
      type: "visual",
      percentage: 90
    });
    
    this.createSkill({
      name: "Video Editing",
      type: "visual",
      percentage: 85
    });
    
    this.createSkill({
      name: "Digital Art",
      type: "visual",
      percentage: 80
    });
    
    // Technical skills
    this.createSkill({
      name: "Web Development",
      type: "technical",
      percentage: 85
    });
    
    this.createSkill({
      name: "Creative Coding",
      type: "technical",
      percentage: 80
    });
    
    this.createSkill({
      name: "Interactive Design",
      type: "technical",
      percentage: 90
    });
  }
}

export const storage = new MemStorage();
