import { Lead } from "../models/lead";

export const processLeads = async () => {
  const leads = await Lead.find();
  const leadMetrics = {
    totalLeads: leads.length,
    emailCount: leads.filter((lead) => lead.email).length,
  };
  console.log("Lead Metrics:", leadMetrics);
  return leadMetrics;
};
