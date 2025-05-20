import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminAuth } from "@/lib/firebase-server";

/** 
 * GET  /api/entries  
 * – if no token: 401  
 * – else: return only this user’s entries 
 */
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  const { uid } = await getAdminAuth().verifyIdToken(token);
  const entries = await prisma.timeEntry.findMany({
    where: { userId: uid },
    orderBy: { weekStart: "desc" },
  });
  return NextResponse.json(entries);
}

/**
 * POST /api/entries  
 * – upsert this user’s timesheet for the week  
 */
export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  const { uid } = await getAdminAuth().verifyIdToken(token);
  const data = await req.json();

  await prisma.user.upsert({
    where: { uid },
    update: {},
    create: { uid },
  });

  const entry = await prisma.timeEntry.create({
   data: {
      userId: uid,
      weekStart: new Date(data.weekStart),
      mon: data.mon,
      tue: data.tue,
      wed: data.wed,
      thu: data.thu,
      fri: data.fri,
      sat: data.sat,
      sun: data.sun, 
    },
  });

  return NextResponse.json(entry, { status: 201 });
}

/**
 * PATCH /api/entries?id=UUID  
 * – approve a timesheet (admin only) 
 */
export async function PATCH(req: NextRequest) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }
  const decoded = await getAdminAuth().verifyIdToken(token);

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  const entry = await prisma.timeEntry.update({
    where: { id },
    data: { approved: true },
  });
  return NextResponse.json(entry);
}

