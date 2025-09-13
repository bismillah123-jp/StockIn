'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { addStockEntry, getOpeningStock } from './actions';

export default function InputForm() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    location: 'MBUTOH',
    brand: '',
    model: '',
    color: '',
    imei: '',
    opening_stock: '0',
    incoming_stock: '0',
    sold: '0',
    returned: '0',
    notes: '',
  });

  const [debouncedFormData] = useDebounce(formData, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchOpeningStock = useCallback(async () => {
    const stock = await getOpeningStock({
      date: debouncedFormData.date,
      location: debouncedFormData.location,
      brand: debouncedFormData.brand,
      model: debouncedFormData.model,
      color: debouncedFormData.color,
    });
    setFormData((prev) => ({ ...prev, opening_stock: stock.toString() }));
  }, [debouncedFormData]);

  useEffect(() => {
    if (debouncedFormData.brand && debouncedFormData.model) {
      fetchOpeningStock();
    }
  }, [debouncedFormData, fetchOpeningStock]);

  return (
    <form action={addStockEntry} className="space-y-6 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-300">Date</label>
          <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300">Location</label>
          <select name="location" id="location" value={formData.location} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm">
            <option>MBUTOH</option>
            <option>SOKO</option>
          </select>
        </div>

        {/* Brand */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-300">Brand</label>
          <input type="text" name="brand" id="brand" value={formData.brand} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
        </div>

        {/* Model */}
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-300">Model</label>
          <input type="text" name="model" id="model" value={formData.model} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
        </div>

        {/* Color */}
        <div>
          <label htmlFor="color" className="block text-sm font-medium text-gray-300">Color</label>
          <input type="text" name="color" id="color" value={formData.color} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
        </div>

        {/* IMEI */}
        <div>
          <label htmlFor="imei" className="block text-sm font-medium text-gray-300">IMEI (Optional)</label>
          <input type="text" name="imei" id="imei" value={formData.imei} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
        </div>

        {/* Opening Stock */}
        <div>
          <label htmlFor="opening_stock" className="block text-sm font-medium text-gray-300">Opening Stock</label>
          <input type="number" name="opening_stock" id="opening_stock" value={formData.opening_stock} onChange={handleInputChange} readOnly className="mt-1 block w-full rounded-md border-gray-600 bg-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
        </div>

        {/* Incoming Stock */}
        <div>
          <label htmlFor="incoming_stock" className="block text-sm font-medium text-gray-300">Incoming Stock</label>
          <input type="number" name="incoming_stock" id="incoming_stock" value={formData.incoming_stock} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
        </div>

        {/* Sold */}
        <div>
          <label htmlFor="sold" className="block text-sm font-medium text-gray-300">Units Sold</label>
          <input type="number" name="sold" id="sold" value={formData.sold} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
        </div>

        {/* Returned */}
        <div>
          <label htmlFor="returned" className="block text-sm font-medium text-gray-300">Returned Units</label>
          <input type="number" name="returned" id="returned" value={formData.returned} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
        </div>

         {/* Notes */}
        <div className="md:col-span-2">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-300">Notes (Optional)</label>
          <textarea name="notes" id="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm" />
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="rounded-md bg-purple-600 px-6 py-2 text-white transition hover:bg-purple-700">
          Add Stock Entry
        </button>
      </div>
    </form>
  );
}
