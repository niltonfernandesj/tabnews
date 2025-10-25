// Controller

import database from "infra/database.js";

async function status(request, response) {
  response.status(200).json({
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
        version: await getPostgresVersion(),
        max_connections: await getPostgresMaxConnections(),
        active_connections: await getPostgresActiveConnections(),
      },
    },
  });
}

async function getPostgresVersion() {
  const query = await database.query("SHOW server_version;");
  return query.rows[0].server_version;
}

async function getPostgresMaxConnections() {
  const query = await database.query("SHOW max_connections;");
  return parseInt(query.rows[0].max_connections);
}

async function getPostgresActiveConnections() {
  const dataBaseName = process.env.POSTGRES_DB;
  const query = await database.query({
    text: "SELECT count(*)::int as conexoes_ativas FROM pg_stat_activity WHERE datname = $1;",
    values: [dataBaseName],
  });

  return query.rows[0].conexoes_ativas;
}

export default status;
