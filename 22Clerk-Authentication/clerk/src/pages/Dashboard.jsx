import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function Dashboard() {
  const { getToken } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const token = await getToken();
      console.log("Clerk Token:", token);

      // 1. Sync the user with MongoDB
      await fetch("http://localhost:5000/api/users/sync", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // 2. Fetch the user data from MongoDB
      const res = await fetch("http://localhost:5000/api/users/me", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Error fetching user:", res.status);
        return;
      }

      const data = await res.json();
      setUserData(data);
    }

    fetchUser();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {userData ? (
        <div className="mt-4">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Clerk ID:</strong> {userData.clerkId}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
