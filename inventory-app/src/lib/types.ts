export type StockEntry = {
  id: number;
  created_at: string;
  date: string; // Using string for date to ensure serializability from server to client
  location: 'MBUTOH' | 'SOKO';
  brand: string;
  model: string;
  color: string | null;
  imei: string | null;
  opening_stock: number;
  incoming_stock: number;
  sold: number;
  returned: number;
  closing_stock: number;
  source: string;
  notes: string | null;
};
