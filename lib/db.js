// /lib/db.js
import { PrismaClient } from '@prisma/client';

// This is a special object in JavaScript that is globally available.
// We'll use it to store our Prisma Client instance.
const globalForPrisma = globalThis;

// We check if a prisma instance already exists on the global object.
// If it does, we use it. If not, we create a new one.
// The "||" is a logical OR operator.
const db = globalForPrisma.prisma || new PrismaClient();

// In a development environment, Next.js's "hot-reloading" feature can create
// many new PrismaClient instances, which can exhaust your database connection limit.
// This line of code prevents that by storing the single instance we created
// back onto the global object.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}

// Finally, we export the single, shared instance of the Prisma Client.
// Now, any other file in our application can import it and use it to
// talk to the database.
export { db };