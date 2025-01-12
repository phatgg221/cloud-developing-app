"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CardTable = () => {
  const [searchTerm, setSearchItem] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const userInfo = await response.json();
          setData(userInfo.userInfo);

          const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];
          setAccessToken(token);

          if (!userInfo.userInfo?.isAdmin) {
            router.push("/");
          }
        } else {
          setData(null);
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  useEffect(() => {

    const fetchTableData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/cafeappstage/getTable",
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          const body = JSON.parse(data.body);
          setTableData(body.data);
        } else {
          console.error("Failed to fetch table data");
        }
      } catch (error) {
        console.error("Error fetching table data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, [accessToken]);

 

  const filteredTables = tableData.filter((table) =>
    table.number.toString().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {

      const payload = {
        httpMethod: "DELETE", // Include httpMethod if required by the backend
        body: JSON.stringify({ id }) // Nest id in the body as a string
    };
      const response = await fetch(
        `https://ic1ln5cze5.execute-api.us-east-1.amazonaws.com/cafeappstage/deleteTable`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setTableData((prevData) => prevData.filter((table) => table.id !== id));
        console.log("Deleted table with ID:", id);
      } else {
        throw new Error("Failed to delete table");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const createButton = () => {
    router.push("/admin/manage-table/form");
  };

  const handleUpdate = (menu) => {
    router.push(`/admin/manage-table/form?id=${menu}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1 className="font-bold text-5xl text-[#f8a61b]">Manage Tables</h1>
      <div className="flex justify-center items-center mb-5 overflow-x-auto">
        <table className="table-auto w-[95%] border border-black">
          <thead className="bg-[#f8a61b] text-white text-lg md:text-xl font-extrabold">
            <tr>
              <th className="p-4">Table Number</th>
              <th className="p-4">Status</th>
              <th className="p-4">Size</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTables.map((table, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-4 text-center">{table.number}</td>
                <td
                  className={`p-4 text-center ${
                    table.status === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {table.status}
                </td>
                <td className="p-4 text-center">{table.size}</td>

                <td className="p-4 text-center">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    <button
                      className="px-4 py-2 bg-none border border-[#f8a61b] text-[#f8a61b] rounded-md transition-colors duration-150 hover:bg-[#f8a61b] hover:text-white"
                      onClick={() => handleUpdate(table.id)}
                    >
                      Update
                    </button>
                    <button
                      className="px-4 py-2 bg-none border border-[#f8a61b] text-[#f8a61b] rounded-md transition-colors duration-150 hover:bg-[#f8a61b] hover:text-white"
                      onClick={() => handleDelete(table.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-5 mb-5 gap-5">
        <button
          className="px-6 py-3 bg-[#f8a61b] text-white rounded-md hover:bg-orange-600 transition-colors duration-150"
          onClick={createButton}
        >
          Create New Table
        </button>
        <button
          className="px-6 py-3 bg-[#f8a61b] text-white rounded-md hover:bg-orange-600 transition-colors duration-150"
          onClick={() => router.push("/admin")}
        >
          Return
        </button>
      </div>
    </>
  );
};

CardTable.hideLayout = true;
export default CardTable;
