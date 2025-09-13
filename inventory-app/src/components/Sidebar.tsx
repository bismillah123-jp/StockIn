import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800 text-white">
      <div className="p-6 text-2xl font-bold text-purple-400">
        StockWise
      </div>
      <nav className="flex-1 space-y-2 px-4">
        <Link href="/dashboard" className="flex items-center rounded-lg bg-purple-600 px-4 py-2 transition hover:bg-purple-700">
          <span className="mr-3">📊</span>
          Dashboard
        </Link>
        <Link href="/input-stock" className="flex items-center rounded-lg px-4 py-2 transition hover:bg-gray-700">
          <span className="mr-3">✍️</span>
          Input Stock
        </Link>
        <Link href="/upload-excel" className="flex items-center rounded-lg px-4 py-2 transition hover:bg-gray-700">
          <span className="mr-3">📄</span>
          Upload Excel
        </Link>
        <Link href="/reports" className="flex items-center rounded-lg px-4 py-2 transition hover:bg-gray-700">
          <span className="mr-3">📈</span>
          Reports
        </Link>
        <Link href="/settings" className="flex items-center rounded-lg px-4 py-2 transition hover:bg-gray-700">
          <span className="mr-3">⚙️</span>
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
