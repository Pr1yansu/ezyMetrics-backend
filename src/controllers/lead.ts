import { type Request, type Response } from "express";
import { Lead } from "../models/lead";
import NodeCache from "node-cache";
import { faker } from "@faker-js/faker";

const cache = new NodeCache();

/**
 * Generate fake leads and store them in the database.
 * @param req - Express request object
 * @param res - Express response object
 */
export const createFakeLeads = async (req: Request, res: Response) => {
  try {
    const leads = Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    }));

    await Lead.insertMany(leads);

    cache.del("leads");

    res.status(201).json(leads);
  } catch (error) {
    console.error("Error creating fake leads:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Retrieve leads from the cache if available; otherwise, query the database.
 * @param req - Express request object
 * @param res - Express response object
 */
export const cacheLeads = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const cachedLeads = cache.get("leads");
    if (cachedLeads) {
      console.log("Leads fetched from cache");
      return res.json(cachedLeads);
    }

    const leads = await Lead.find()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const totalLeads = await Lead.countDocuments();
    const totalPages = Math.ceil(totalLeads / Number(limit));

    cache.set("leads", leads, 60);

    res.status(200).json({
      leads,
      page: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Retrieve a lead by its unique identifier.
 * @param req - Express request object
 * @param res - Express response object
 */
export const getLeadById = async (req: Request, res: Response) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) {
    return res.status(404).json({ error: "Lead not found" });
  }
  res.json(lead);
};
