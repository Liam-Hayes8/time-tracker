"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

interface Entry {
  id: string;
  userId: string;
  weekStart: string;
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number;
  sun: number;
  approved: boolean;
}

export default function AdminPage() {
  const [entries, setEntries] = useState<Entry[]>([]);

  // Fetch all entries when user is signed in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      const token = await user.getIdToken();
      const res = await fetch("/api/entries", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        // only parse JSON on success
        const data = await res.json();
        setEntries(data);
      } else {
        // log the error body (if any) and clear entries
        console.error(
          "Failed to fetch entries:",
          res.status,
          await res.text()
        );
        setEntries([]);
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  // Approve a timesheet by ID
  const approve = async (id: string) => {
    const token = await auth.currentUser!.getIdToken();
    await fetch(`/api/entries?id=${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    // Reload entries
    const res = await fetch("/api/entries", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEntries(await res.json());
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th>User</th>
            <th>Week Start</th>
            <th>Total Hours</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => {
            const total =
              e.mon + e.tue + e.wed + e.thu + e.fri + e.sat + e.sun;
            return (
              <tr key={e.id} className="border-b">
                <td className="p-2">{e.userId}</td>
                <td className="p-2">{e.weekStart.slice(0, 10)}</td>
                <td className="p-2">{total}</td>
                <td className="p-2">{e.approved ? "✅" : "⏳"}</td>
                <td className="p-2">
                  {!e.approved && (
                    <button
                      onClick={() => approve(e.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
