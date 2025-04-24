import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Portfolio item types
export const portfolioItemTypes = ["audio", "visual", "technical"] as const;
export type PortfolioItemType = typeof portfolioItemTypes[number];

// Categories for each type
export const audioCategories = ["music", "sound-design", "podcast"] as const;
export const visualCategories = ["motion", "film", "digital-art"] as const;
export const technicalCategories = ["web", "interactive", "app"] as const;
export type AudioCategory = typeof audioCategories[number];
export type VisualCategory = typeof visualCategories[number];
export type TechnicalCategory = typeof technicalCategories[number];

// Portfolio items table
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  mediaUrl: text("media_url"),
  technologies: text("technologies").array(),
  projectUrl: text("project_url"),
});

// Skills table
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  percentage: integer("percentage").notNull(),
});

// User model (required by template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Insert schemas
export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({ id: true });
export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
