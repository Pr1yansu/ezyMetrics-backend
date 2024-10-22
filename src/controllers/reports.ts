import type { Request, Response } from "express";
import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import { Lead } from "../models/lead";

export const generateCsvReport = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find({}, { _id: 0, name: 1, email: 1, phone: 1 });

    const csvParser = new Parser({
      fields: ["name", "email", "phone"],
    });

    const csv = csvParser.parse(leads);

    res.header("Content-Type", "text/csv");
    res.attachment("lead-report.csv");
    res.send(csv);
  } catch (error) {
    console.error("Error generating CSV report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const generatePdfReport = async (req: Request, res: Response) => {
  try {
    const doc = new PDFDocument({ margin: 30 });
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text("Lead Report", { align: "center" });
    doc.moveDown(1.5);

    const leads = await Lead.find({}, { _id: 0, name: 1, email: 1, phone: 1 });

    // Create table headers
    doc.fontSize(12).font("Helvetica-Bold");
    doc.text("Name", { width: 200, continued: true });
    doc.text("Email", { width: 200, continued: true });
    doc.text("Phone", { align: "right" });
    doc.moveDown(0.5);

    doc.moveTo(30, doc.y).lineTo(580, doc.y).stroke();
    doc.moveDown(0.5);

    doc.font("Helvetica");
    leads.forEach((lead) => {
      doc.text(lead.name, { width: 200, continued: true });
      doc.text(lead.email, { width: 200, continued: true });
      doc.text(lead.phone, { align: "right" });
    });

    doc.moveDown(2);
    doc
      .fontSize(10)
      .font("Helvetica")
      .text("Generated on: " + new Date().toLocaleDateString(), {
        align: "center",
      });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
