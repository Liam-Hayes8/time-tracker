// src/app/timesheet/TimesheetForm.tsx

"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";

export default function TimesheetForm() {
  const [data, setData] = useState({
    weekStart: new Date().toISOString().slice(0, 10),
    mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      // you can store auth in window if you like:
      (window as any).auth = auth;
    });
    return () => unsubscribe();
  }, []);

  const save = async () => {
    const token = await auth.currentUser!.getIdToken();
    const res = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    // handle success…
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Timesheet</h1>
      {/* build your inputs here, e.g.: */}
      <label>
        Monday hours
        <input
          type="number"
          value={data.mon}
          onChange={(e) => setData({ ...data, mon: +e.target.value })}
        />
      </label>
      {/* repeat for Tue–Sun… */}
      <button onClick={save} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Save
      </button>
    </main>
  );
}
