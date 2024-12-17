'use client';

import { useState } from 'react';

export default function TablePage() {
  // Mock data for available tables
  const [tables, setTables] = useState([
    { id: 1, number: 'A1', status: 'Available', size: 4 },
    { id: 2, number: 'B1', status: 'Occupied', size: 6 },
    { id: 3, number: 'C1', status: 'Available', size: 2 },
    { id: 4, number: 'D1', status: 'Occupied', size: 8 },
  ]);

  // Toggle table availability (for simulation)
  const toggleAvailability = (id) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === id
          ? {
              ...table,
              status: table.status === 'Available' ? 'Occupied' : 'Available',
            }
          : table
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-50 via-white to-green-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Available Tables
        </h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Table Number</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{table.number}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    table.status === 'Available' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {table.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">{table.size}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => toggleAvailability(table.id)}
                    className={`px-4 py-2 rounded-md shadow ${
                      table.status === 'Available'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {table.status === 'Available' ? 'Mark Occupied' : 'Mark Available'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
