const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");

// import modules
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const logger = require("./middlewares/logger");
const path = require("path");
const connectDB = require("./db/db");

// import router modules
const productsRouter = require("./routers/products");

// setup dotenv
dotenv.config({ path: path.resolve(__dirname, "./config/.env") });

const app = express();

// connect to datatbase
connectDB();

// basic middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(logger);
}

// routes
app.use("/api/v1/products", productsRouter);

// debug middlewares
app.use(notFound);
app.use(errorHandler);

// server setup
const PORT = process.env.PORT || 5000;
const node_env = process.env.NODE_ENV;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${node_env} mode on port ${PORT}`.blue.inverse.underline
      .bold
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close();
});
