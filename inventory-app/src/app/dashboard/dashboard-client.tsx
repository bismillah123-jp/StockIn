'use client';

import { createClient } from '@/lib/supabase/client';
import { type StockEntry } from '@/lib/types'; // I will create this type definition next
import { useEffect, useState } from 'react';

type DashboardClientProps = {
  initialStockEntries: StockEntry[];
};

export default function DashboardClient({ initialStockEntries }: DashboardClientProps) {
  const [stockEntries, setStockEntries] = useState(initialStockEntries);
  const supabase = createClient();

  useEffect(() => {
    setStockEntries(initialStockEntries);
  }, [initialStockEntries]);

  useEffect(() => {
    const channel = supabase
      .channel('stock_entries')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'stock_entries' },
        (payload) => {
          console.log('Change received!', payload);
          // In a future step, I will refetch data here.
          // For now, we just log to confirm connection.
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Dummy data for summary cards
  const totalStock = stockEntries.reduce((acc, entry) => acc + (entry.closing_stock ?? 0), 0);
  const salesToday = stockEntries.reduce((acc, entry) => acc + (entry.sold ?? 0), 0);
  const incomingToday = stockEntries.reduce((acc, entry) => acc + (entry.incoming_stock ?? 0), 0);
  const returnsToday = stockEntries.reduce((acc, entry) => acc + (entry.returned ?? 0), 0);

  return (
    <div className="text-white">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-purple-400">Dashboard</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-gray-400 text-sm font-medium">Total Stock</h3>
                <p className="text-3xl font-bold text-white">{totalStock}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-gray-400 text-sm font-medium">Sales Today</h3>
                <p className="text-3xl font-bold text-green-400">{salesToday}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-gray-400 text-sm font-medium">Incoming Today</h3>
                <p className="text-3xl font-bold text-blue-400">{incomingToday}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-gray-400 text-sm font-medium">Returns Today</h3>
                <p className="text-3xl font-bold text-yellow-400">{returnsToday}</p>
            </div>
        </div>

        {/* Data Table */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Stock Details</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="p-3">Date</th>
                            <th className="p-3">Brand</th>
                            <th className="p-3">Model</th>
                            <th className="p-3">Opening</th>
                            <th className="p-3">Incoming</th>
                            <th className="p-3">Sold</th>
                            <th className="p-3">Returned</th>
                            <th className="p-3">Closing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockEntries.map((entry) => (
                            <tr key={entry.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="p-3">{new Date(entry.date).toLocaleDateString()}</td>
                                <td className="p-3">{entry.brand}</td>
                                <td className="p-3">{entry.model}</td>
                                <td className="p-3">{entry.opening_stock}</td>
                                <td className="p-3 text-blue-400">{entry.incoming_stock}</td>
                                <td className="p-3 text-green-400">{entry.sold}</td>
                                <td className="p-3 text-yellow-400">{entry.returned}</td>
                                <td className="p-3 font-bold">{entry.closing_stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}
