import type { Request, Response } from "express";
import { Campaign } from "../models/campaign";
import { faker } from "@faker-js/faker";
import Cache from "node-cache";
import sendEmail from "../utils/send-mail";
import { Lead } from "../models/lead";

const cache = new Cache();

/**
 * Generate fake campaigns and store them in the database.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 * @throws {Error} - Throws an error if there is an issue creating fake campaigns
 */
export const createFakeCampaigns = async (req: Request, res: Response) => {
  const leads = await Lead.find();
  const leadIds = leads.map((lead) => lead._id);

  const campaigns = Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    name: faker.company.name(),
    status: faker.helpers.arrayElement(["active", "paused", "completed"]),
    lead: faker.helpers.arrayElement(leadIds),
  }));

  await Campaign.insertMany(campaigns);

  res.json(campaigns);
};

/**
 * Retrieve campaigns from the cache if available; otherwise, query the database.
 * @param req - Express request object
 * @param res - Express response object
 * @returns {Promise<void>}
 * @throws {Error} - Throws an error if there is an issue fetching campaigns
 * @throws {Error} - Throws an error if there is an issue fetching campaigns
 */

export const cacheCampaigns = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const cachedCampaigns = cache.get("campaigns");
    if (cachedCampaigns) {
      console.log("Campaigns fetched from cache");
      return res.json(cachedCampaigns);
    }

    const campaigns = await Campaign.find()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const totalCampaigns = await Campaign.countDocuments();
    const totalPages = Math.ceil(totalCampaigns / Number(limit));

    cache.set("campaigns", campaigns, 60);

    res.status(200).json({
      campaigns,
      page: Number(page),
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const changeStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const campaign = await Campaign.findOneAndUpdate(
      { id },
      { status },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    // for Real-world application
    // const lead = await Lead.findById(campaign.lead);

    // if (!lead) {
    //   return res.status(404).json({ error: "Lead not found" });
    // }

    cache.del("campaigns");

    // sendEmail({
    //   html: `<p>Your campaign status has been updated to ${status}</p>`,
    //   subject: "Campaign Status Update",
    //   text: `Your campaign status has been updated to ${status}`,
    //   email: lead?.email,
    // });

    sendEmail({
      html: `<p>Your campaign status has been updated to ${status}</p>`,
      subject: "Campaign Status Update",
      text: `Your campaign status has been updated to ${status}`,
    });

    res.json(campaign);
  } catch (error) {
    console.error("Error updating campaign status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
