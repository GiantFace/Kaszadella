// components/AdminUsers.tsx
"use client";

import React, { useState } from "react";

interface UserData {
  name: string;
  email: string;
  lastActivity: string;
}

export default function AdminUsers() {
  const [users] = useState<UserData[]>([
    {
      name: "John Doe",
      email: "john@example.com",
      lastActivity: "2023-10-12 14:30",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      lastActivity: "2023-10-12 13:15",
    },
  ]);

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
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">{user.email}</td>
              <td className="border px-2 py-1">{user.lastActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
