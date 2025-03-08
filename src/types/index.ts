export interface PlanningData {
  id: string;
  storeId: string;
  skuId: string;
  week: string;
  salesUnits: number;
}

export interface User {
  id: string;
  email: string;
  avatar_url?: string;
}

export interface Store {
  id: string;
  name: string;
  city: string;
  state: string;
  order: number;
}

// List of predefined cities and states
export const cities = [
  "San Francisco",
  "Phoenix",
  "Dallas",
  "Atlanta",
  "Nashville",
  "New York",
  "Denver",
  "Philadelphia",
  "Boston",
  "Austin",
  "Los Angeles",
  "Houston",
  "Portland",
  "Chicago",
  "Las Vegas",
  "Seattle",
  "Miami",
  "San Diego",
  "Charlotte",
  "Detroit",
];

export const states = [
  "CA",
  "AZ",
  "TX",
  "GA",
  "TN",
  "NY",
  "CO",
  "PA",
  "MA",
  "TX",
  "CA",
  "TX",
  "OR",
  "IL",
  "NV",
  "WA",
  "FL",
  "CA",
  "NC",
  "MI",
];

export const classSkusUnique = [
  "Tops",
  "Jewelry",
  "Bottoms",
  "Outerwear",
  "Footwear",
  "Accessories",
];

export const DepartmentSkus = [
  "Tops",
  "Jewelry",
  "Bottoms",
  "Outerwear",
  "Footwear",
  "Accessories",
  "Men's Apparel",
  "Women's Apparel",
  "Unisex Accessories",
  "Sportswear",
];

export interface SKU {
  id: string;
  name: string;
  price: number;
  cost: number;
  storeId: string;
  classType: string;
  department: string;
  salesUnits: number;
  week: string[];
}

export const defaultSkus = {
  id: "",
  name: "",
  price: 0,
  cost: 0,
  storeId: "",
  classType: "",
  department: "",
  salesUnits: 0,
  week : []
}
