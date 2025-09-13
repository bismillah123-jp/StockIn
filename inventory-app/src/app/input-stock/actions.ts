'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { subDays, format } from 'date-fns';

type OpeningStockParams = {
  date: string;
  location: string;
  brand: string;
  model: string;
  color: string;
};

export async function getOpeningStock(
  params: OpeningStockParams
): Promise<number> {
  const { date, location, brand, model, color } = params;
  if (!date || !location || !brand || !model) {
    return 0;
  }

  const supabase = createClient();
  const previousDay = format(subDays(new Date(date), 1), 'yyyy-MM-dd');

  const { data, error } = await supabase
    .from('stock_entries')
    .select('closing_stock')
    .eq('date', previousDay)
    .eq('location', location)
    .eq('brand', brand)
    .eq('model', model)
    .eq('color', color)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return 0;
  }

  return data.closing_stock;
}

export async function addStockEntry(formData: FormData) {
  const supabase = createClient();

  const rawFormData = {
    date: formData.get('date') as string,
    location: formData.get('location') as string,
    brand: formData.get('brand') as string,
    model: formData.get('model') as string,
    color: formData.get('color') as string,
    imei: formData.get('imei') as string,
    opening_stock: parseInt(formData.get('opening_stock') as string, 10),
    incoming_stock: parseInt(formData.get('incoming_stock') as string, 10),
    sold: parseInt(formData.get('sold') as string, 10),
    returned: parseInt(formData.get('returned') as string, 10),
    source: 'manual',
    notes: formData.get('notes') as string,
  };

  // Basic validation
  if (!rawFormData.date || !rawFormData.location || !rawFormData.brand || !rawFormData.model) {
    return { error: 'Required fields are missing.' };
  }

  const { error } = await supabase.from('stock_entries').insert([rawFormData]);

  if (error) {
    console.error('Error adding stock entry:', error);
    return { error: 'Could not add stock entry.' };
  }

  revalidatePath('/dashboard', 'layout');
  redirect('/dashboard');
}
