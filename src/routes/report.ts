import { Router } from "express";
import { generateCsvReport, generatePdfReport } from "../controllers/reports";

const router: Router = Router();

/**
 * @openapi
 * /api/reports/csv:
 *   get:
 *     summary: Generate CSV report
 *     description: Generates a CSV report of all leads
 *     responses:
 *       200:
 *         description: Returns a CSV file containing the lead report
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
router.get("/csv", generateCsvReport);

/**
 * @openapi
 * /api/reports/pdf:
 *   get:
 *     summary: Generate PDF report
 *     description: Generates a PDF report of all leads
 *     responses:
 *       200:
 *         description: Returns a PDF file containing the lead report
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         description: Internal server error
 */
router.get("/pdf", generatePdfReport);

export default router;
