import React from "react";

const Dashboard = () => {
  const username = localStorage.getItem("username");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">
        Welcome {username ? username : "User"} 🎉
      </h1>
      <p className="text-lg text-gray-600">You are now logged in!</p>
    </div>
  );
};

export default Dashboard;
