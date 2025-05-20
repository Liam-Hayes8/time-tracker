-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "TimeEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "mon" DOUBLE PRECISION NOT NULL,
    "tue" DOUBLE PRECISION NOT NULL,
    "wed" DOUBLE PRECISION NOT NULL,
    "thu" DOUBLE PRECISION NOT NULL,
    "fri" DOUBLE PRECISION NOT NULL,
    "sat" DOUBLE PRECISION NOT NULL,
    "sun" DOUBLE PRECISION NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TimeEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeEntry" ADD CONSTRAINT "TimeEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
