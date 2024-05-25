import { connect } from "../db/connection/index.js";
import { env } from "./env.js";

const bootstrap = async (app) => {
  console.log("[bootstrap] Starting server...");
  await connect();

  app.listen(env.port, () => {
    console.log(`[bootstrap] Server listening on ${env.hostApi}`);
  });
};

export { bootstrap };
