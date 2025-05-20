"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
} from "firebase/auth";

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

export default function TimesheetPage() {
    // initialize all days to 0 hours
    const [hours, setHours] = useState<Record<string, number>>(
        Object.fromEntries(weekdays.map((d) => [d, 0]))
    );

    // sign in on page load if not already
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) signInWithPopup(auth, new GoogleAuthProvider());
        });
      ;(window as any).auth = auth;
    }, []);

    const save = async () => {
        const idToken = await auth.currentUser?.getIdToken();
        const weekStart = new Date(); // adjust this if you want to always pick Monday
        const res = await fetch("/api/entries", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${idToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ weekStart, ...hours }),
        });
        alert(res.ok ? "Saved!" : "Error saving");
    };

    return (
        <main className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Timesheet</h1>
    {weekdays.map((d) => (
        <div key={d} className="flex items-center mb-2">
    <label className="w-12 capitalize">{d}</label>
        <input
        type="number"
        min={0}
        max={24}
        value={hours[d]}
        onChange={(e) =>
        setHours({ ...hours, [d]: Number(e.target.value) })
    }
        className="border rounded p-1 flex-1"
            />
            </div>
    ))}
    <button
        onClick={save}
    className="mt-4 bg-blue-600 text-white rounded px-4 py-2"
        >
        Save
        </button>
        </main>
);
}
