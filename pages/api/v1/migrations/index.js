// Controller

import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const result = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    direction: "up",
    dryRun: true,
    verbose: true,
    migrationsTable: "pgmigrations",
  });

  response.status(200).json(result);
}
