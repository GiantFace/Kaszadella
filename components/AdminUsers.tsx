// components/AdminUsers.tsx
"use client";

import React, { useEffect, useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  last_activity_date: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json() as Promise<UserData[]>;
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Adatok betöltése sikertelen");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Betöltés…</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Felhasználók listázása</h2>
      <table className="min-w-full table-fixed border-collapse mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 w-1/3">Név</th>
            <th className="border px-2 py-1 w-1/3">Email</th>
            <th className="border px-2 py-1 w-1/3">Utolsó aktivitás</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">{user.email}</td>
              <td className="border px-2 py-1">{user.last_activity_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
