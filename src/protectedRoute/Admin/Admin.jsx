import React from "react";
import AdminDashboard from "./AdminDashboard";
import AdminMain from "./AdminMain";

function Admin() {
  return (
    <>
      <div className="flex h-auto pt-20">
        <AdminDashboard />
        <AdminMain />
      </div>
    </>
  );
}

export default Admin;
