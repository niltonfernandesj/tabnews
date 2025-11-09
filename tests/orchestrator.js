import retry from "async-retry";

async function waitForWebServer() {
  await retry(
    async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw "Unable to connect to the webserver.";
      }
    },
    { retries: 100, maxTimeout: 1000 },
  );
}

export default {
  waitForWebServer,
};
