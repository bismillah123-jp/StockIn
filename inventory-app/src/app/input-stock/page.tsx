import InputForm from './input-form';

export default function InputStockPage() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-purple-400">Add New Stock Entry</h1>
        <p className="text-gray-400 mt-2">
          Fill in the details below to add a new stock record. The opening stock will be calculated automatically based on the previous day's closing stock for the item.
        </p>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-lg p-8">
        <InputForm />
      </div>
    </div>
  );
}
