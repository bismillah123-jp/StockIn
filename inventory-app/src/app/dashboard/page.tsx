import { createClient } from '@/lib/supabase/server';
import DashboardClient from './dashboard-client';
import { logout } from '@/app/login/actions';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: stockEntries, error } = await supabase
    .from('stock_entries')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching stock entries:', error);
    // Handle error appropriately
  }

  return (
    <div className="w-full">
        <div className="flex justify-between items-center mb-6 text-white">
            <div>
                <h1 className="text-2xl">Welcome, {user?.email}!</h1>
            </div>
            <form action={logout}>
                <button className="rounded-md bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700">
                    Logout
                </button>
            </form>
        </div>
      <DashboardClient initialStockEntries={stockEntries ?? []} />
    </div>
  );
}
