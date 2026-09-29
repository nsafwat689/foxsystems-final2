import { SOLUTIONS } from "@/data/solutions";
import { PLANS, FEATURE_ROWS } from "@/data/crmPlans";
import { SERVICES, FX } from "@/data/servicePricing";
const crm = SERVICES.find(s => s.id === "crm");
console.log(JSON.stringify({ SOLUTIONS, PLANS, FEATURE_ROWS, crmPlans: crm?.plans, always: crm?.always, FX }));
