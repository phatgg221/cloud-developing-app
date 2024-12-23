import React from "react";
// import { useAuth } from "../../contexts/AuthContext";

function AdminHeader() {
  // const { adminLogout, logout } = useAuth();

  const handleButton = async () => {
    // adminLogout();
    // logout();
    window.location.href = "/";
  };

  return (
    <header className="bg-[#fce2d35c] p-4 md:px-8 top-0 mb-12">
      <div className="flex justify-between items-center">
        <h3 className="text-[#f8a61b] text-4xl md:text-5xl font-extrabold mb-0">
          Admin Dashboard
        </h3>
        <button
          onClick={handleButton}
          className="px-4 py-2 ml-2 rounded border-2 border-[#f8a61b] bg-none text-[#f8a61b] text-lg md:text-xl flex items-center transition-colors duration-150 hover:bg-[#f8a61b] hover:text-white"
        >
          <p className="mb-0">Logout</p>
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
