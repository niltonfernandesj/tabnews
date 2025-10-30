// Controller

import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const defaultMigrationParameters = getDefaultMigrationParameters();

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationParameters);

    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationParameters,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).end();
}

function getDefaultMigrationParameters() {
  return {
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    direction: "up",
    dryRun: true,
    verbose: true,
    migrationsTable: "pgmigrations",
  };
}
