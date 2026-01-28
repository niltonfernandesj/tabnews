import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForWebServer();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();

      expect(response.status).toBe(200);
      expect(responseBody.updated_at).toBeDefined();
      expect(responseBody.dependencies).toBeDefined();
      expect(responseBody.dependencies.database).toBeDefined();
      expect(responseBody.dependencies.database.version).toEqual("16.0");
      expect(responseBody.dependencies.database.max_connections).toEqual(100);
      expect(responseBody.dependencies.database.active_connections).toEqual(1);
    });
  });
});
