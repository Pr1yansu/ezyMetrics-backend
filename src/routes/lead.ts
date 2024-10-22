import { Router } from "express";
import { cacheLeads, createFakeLeads, getLeadById } from "../controllers/lead";

const router: Router = Router();

/**
 * @openapi
 * /api/leads/:
 *   get:
 *     summary: Create fake leads
 *     description: Generate and return a list of fake leads
 *     responses:
 *       201:
 *         description: Returns an array of fake leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the lead
 *                   name:
 *                     type: string
 *                     description: Name of the lead
 *                   email:
 *                     type: string
 *                     description: Email of the lead
 *                   phone:
 *                     type: string
 *                     description: Phone number of the lead
 */
router.get("/", (req, res) => {
  createFakeLeads(req, res);
});

/**
 * @openapi
 * /api/leads/cached:
 *   get:
 *     summary: Get cached leads
 *     description: Fetch leads from cache, if available
 *     responses:
 *       200:
 *         description: Returns an array of cached leads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier for the lead
 *                   name:
 *                     type: string
 *                     description: Name of the lead
 *                   email:
 *                     type: string
 *                     description: Email of the lead
 *                   phone:
 *                     type: string
 *                     description: Phone number of the lead
 */
router.get("/cached", (req, res) => {
  cacheLeads(req, res);
});

export default router;
/**
 * @openapi
 * /api/leads/{id}:
 *   get:
 *     summary: Get lead by ID
 *     description: Fetch a specific lead by its unique ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the lead to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the lead data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 */
router.get("/:id", (req, res) => {
  getLeadById(req, res);
});
