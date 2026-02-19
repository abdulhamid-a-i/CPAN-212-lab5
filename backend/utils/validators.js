import { RISKCATEGORIES } from "../config";


export function validateCreateClient(body) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const riskCategory = RISKCATEGORIES;
  const errors = [];

  if (!body.fullName || body.fullName.length < 1) errors.push("Invalid Name");
  if (!regex.test(body.email)) errors.push("Invalid category");
  if (!riskCategory.includes(body.riskCategory)) errors.push("Invalid riskCategory");

  return {
    ok: errors.length === 0,
    errors,
    value: {
      fullName: body.fullName,
      email: body.email,
      riskCategory: body.riskCategory
    }
  };
}

export function validateUpdate(body) {
  
}


