import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // All routes should be prefixed with /api
  
  // Get all portfolio items
  app.get("/api/portfolio", async (req, res) => {
    try {
      const portfolioItems = await storage.getPortfolioItems();
      res.json(portfolioItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });
  
  // Get portfolio items by type
  app.get("/api/portfolio/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const validTypes = ["audio", "visual", "technical"];
      
      if (!validTypes.includes(type)) {
        return res.status(400).json({ message: "Invalid portfolio type" });
      }
      
      const portfolioItems = await storage.getPortfolioItemsByType(type);
      res.json(portfolioItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio items" });
    }
  });
  
  // Get a single portfolio item
  app.get("/api/portfolio/item/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const portfolioItem = await storage.getPortfolioItem(id);
      if (!portfolioItem) {
        return res.status(404).json({ message: "Portfolio item not found" });
      }
      
      res.json(portfolioItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch portfolio item" });
    }
  });
  
  // Get all skills
  app.get("/api/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });
  
  // Get skills by type
  app.get("/api/skills/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const validTypes = ["audio", "visual", "technical"];
      
      if (!validTypes.includes(type)) {
        return res.status(400).json({ message: "Invalid skill type" });
      }
      
      const skills = await storage.getSkillsByType(type);
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
