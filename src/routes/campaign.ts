import { Router } from "express";
import { cacheCampaigns, createFakeCampaigns } from "../controllers/campaign";

const router: Router = Router();

/**
 * @openapi
 * /api/campaigns/:
 *   get:
 *     summary: Create fake campaigns
 *     description: Generate and return a list of fake campaigns
 *     responses:
 *       200:
 *         description: Returns an array of fake campaigns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [active, paused, completed]
 */

router.get("/", (req, res) => {
  createFakeCampaigns(req, res);
});

/**
 * @openapi
 * /api/campaigns/cached:
 *   get:
 *     summary: Get cached campaigns
 *     description: Fetch campaigns from cache, if available
 *     responses:
 *       200:
 *         description: Returns an array of cached campaigns
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [active, paused, completed]
 */

router.get("/cached", (req, res) => {
  cacheCampaigns(req, res);
});

export default router;
