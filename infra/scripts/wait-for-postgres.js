const { exec } = require("node:child_process");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.development" });

process.stdout.write("\n\n 🔴 Aguardando Postgres aceitar conexões.");
checkPostgres();

function checkPostgres() {
  exec(
    `docker exec postgres-dev pg_isready --host ${process.env.POSTGRES_HOST}`,
    (error, stdout, stderr) => {
      if (!stdout.includes("accepting connections")) {
        process.stdout.write(".");
        checkPostgres();
        return;
      }
      console.log("\n\n 🟢 Postgres está pronto e aguardando conexões.");
    },
  );
}
