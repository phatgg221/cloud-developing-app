"use client";

import { useState, useEffect } from "react";

export default function TablePage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const userInfo = await response.json();
          setData(userInfo.userInfo);
          setIsAdmin(userInfo.userInfo.isAdmin);
          const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];
          setAccessToken(token);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/cafeappstage/getTable`,
          {
            method: "GET",
            headers: {
              // Authorization: `Bearer ${accessToken}`, // Add if needed
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch tables");

        const data = await response.json();
        const body = JSON.parse(data.body);
        setTables(body.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [accessToken]);

  const toggleAvailability = async (id) => {
    const table = tables.find((t) => t.id === id);
    const updatedStatus = table.status === "Available" ? "Occupied" : "Available";
    console.log(data.username);
    try {
      const requestBody = {
        id: table.id,
        number: table.number,
        status: updatedStatus,
        size: table.size,
        username: data.username
      };

      const response = await fetch(
        `https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/cafeappstage/createTable`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) throw new Error("Failed to update table status");

      setTables((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: updatedStatus } : t))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-50 via-white to-green-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Available Tables
        </h1>
        {!data && <div>Please login to book a table</div>}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Table Number</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Availability</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{table.number}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    table.status === "Available" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {table.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">{table.size}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div
                    className={`px-4 py-2 rounded-md shadow ${
                      table.status === "Available"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {table.status === "Available" ? "Available" : "Unavailable"}
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => toggleAvailability(table.id)}
                    disabled={!data || (!isAdmin && table.status === "Occupied")}
                    className={`px-4 py-2 rounded-md shadow ${
                      table.status === "Available"
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    } ${
                      !data || (!isAdmin && table.status === "Occupied")
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {table.status === "Available" ? "Mark Occupied" : "Mark Available"}
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
