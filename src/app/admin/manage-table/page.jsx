'use client'
import { useState } from "react";
import React from "react";
import SearchBar from "@/components/searchBar";
// import Link from "next/link";
import Image from "next/image";

const CardTable = () => {
  const [searchTerm, setSearchItem] = useState("");

  // Static sample data
  const sampleData = [
    {
      _id: "1",
      organizer: "John Doe",
      competitionName: "CodeFest 2024",
      location: "New York",
      competitionType: "Hackathon",
      linkToWeb: "https://codefest2024.com",
      competitionDate: "2024-03-15",
      imageURL: "/images/sample1.jpg",
    },
    {
      _id: "2",
      organizer: "Jane Smith",
      competitionName: "AI Challenge",
      location: "San Francisco",
      competitionType: "Workshop",
      linkToWeb: "https://aichallenge2024.com",
      competitionDate: "2024-05-20",
      imageURL: "/images/sample2.jpg",
    },
    {
      _id: "3",
      organizer: "Tech Corp",
      competitionName: "Dev Summit",
      location: "Chicago",
      competitionType: "Conference",
      linkToWeb: "https://devsummit2024.com",
      competitionDate: "2024-08-10",
      imageURL: "/images/sample3.jpg",
    },
  ];

  const handleSearchInput = (searchTerm) => {
    setSearchItem(searchTerm);
  };

  // Filter competitions based on search term
  const filteredTips = sampleData.filter((item) =>
    item.competitionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <h1 className="font-bold text-5xl text-[#f8a61b]">
        Manage tables
    </h1>
      <SearchBar
        placeholder="Search for competition name"
        onChange={handleSearchInput}
        showButton={true}
      ></SearchBar>
      <div className="flex justify-center items-center mb-5 overflow-x-auto">
        <table className="table-auto w-[95%] border border-black">
          <thead className="bg-[#f8a61b] text-white text-lg md:text-xl font-extrabold">
            <tr>
              <th className="p-4">Organizer</th>
              <th className="p-4">Competition name</th>
              <th className="p-4">Location</th>
              <th className="p-4">Competition type</th>
              <th className="p-4">Link to web</th>
              <th className="p-4">Competition date</th>
              <th className="p-4">Image</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTips.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-4 text-center">{item.organizer}</td>
                <td className="p-4 text-center">{item.competitionName}</td>
                <td className="p-4 text-center">{item.location}</td>
                <td className="p-4 text-center">{item.competitionType}</td>
                <td className="p-4 text-center">
                    <a className="text-blue-500 underline">Link</a>
                </td>
                <td className="p-4 text-center">
                  {item.competitionDate &&
                  !isNaN(Date.parse(item.competitionDate))
                    ? new Date(item.competitionDate)
                        .toISOString()
                        .split("T")[0]
                    : ""}
                </td>
                <td className="p-4 text-center">
                  <Image
                    className="w-[100px] h-auto rounded-md"
                    src={item.imageURL}
                    width={100}
                    height={100}
                    alt="Competition image"
                  />
                </td>
                <td className="p-4 text-center">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    <button
                      className="px-4 py-2 bg-none border border-[#f8a61b] text-[#f8a61b] rounded-md transition-colors duration-150 hover:bg-[#f8a61b] hover:text-white"
                      onClick={() => console.log("Update", item._id)}
                    >
                      Update
                    </button>
                    <button
                      className="px-4 py-2 bg-none border border-[#f8a61b] text-[#f8a61b] rounded-md transition-colors duration-150 hover:bg-[#f8a61b] hover:text-white"
                      onClick={() => console.log("Delete", item._id)}
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
          onClick={() => console.log("Create new card event")}
        >
          Create new card event
        </button>
        <button
          className="px-6 py-3 bg-[#f8a61b] text-white rounded-md hover:bg-orange-600 transition-colors duration-150"
          onClick={() => console.log("Return")}
        >
          Return
        </button>
      </div>
    </>
  );
};

CardTable.hideLayout = true;
export default CardTable;
