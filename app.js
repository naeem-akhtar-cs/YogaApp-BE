
// import express from "express";
// import helmet from "helmet";
// import mongoSanitize from "express-mongo-sanitize";
// import hpp from "hpp";
// import cors from "cors";
// import bodyParser from "body-parser";

// import userRoutes from "./routes/userRoutes.js";
// import protocolRoutes from "./routes/protocolRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import subscriptionRoutes from "./routes/subscriptionRoutes.js"

// import connectDB from "./config/db.js";

// const app = express();
// connectDB();

// const corsOptions = {
//   origin: process.env.FE_URL,
//   credentials: true,
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// app.use(bodyParser.json());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", process.env.FE_URL);
//   res.header("Access-Control-Allow-Headers", true);
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   next();
// });

// app.use(helmet());

// app.use(
//   express.json({
//     limit: "15kb",
//   })
// );

// app.use(mongoSanitize());
// app.use(hpp());

// app.use("/api/user", userRoutes);
// app.use("/api/protocol", protocolRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/subscription", subscriptionRoutes);
// app.use("/api/health", (req, res) => {
//   res.status(200).send({ message: "It's up now" });
// });

// app.use("/*", (req, res) => {
//   res.status(404).send({ message: "No route" });
// });

// const port = process.env.BE_PORT;

// app.listen(port, () => {
//   console.log(`HTTPS Server running on port ${port}`);
// });

// export default app;

import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import cors from "cors";
import bodyParser from "body-parser";

import https from "https";
import fs from "fs";

import userRoutes from "./routes/userRoutes.js";
import protocolRoutes from "./routes/protocolRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";

import connectDB from "./config/db.js";

const app = express();
connectDB();

const corsOptions = {
  origin: process.env.FE_URL,
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.FE_URL);
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.use(helmet());

app.use(
  express.json({
    limit: "15kb",
  })
);

app.use(mongoSanitize());
app.use(hpp());

app.use("/api/user", userRoutes);
app.use("/api/protocol", protocolRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/health", (req, res) => {
  res.status(200).send({ message: "It's up now" });
});

app.use("/*", (req, res) => {
  res.status(404).send({ message: "No route" });
});
// const httpsOptions = {
//   key: fs.readFileSync('/etc/ssl/cloudflare/private-key.pem'),
//   cert: fs.readFileSync('/etc/ssl/cloudflare/certificate.pem'),
//   ca: fs.readFileSync('/etc/ssl/cloudflare/ca_bundle.pem'),
// };

// const port = process.env.BE_PORT;
// https.createServer(httpsOptions, app).listen(port, () => {
//   console.log(`HTTPS Server running on port ${port}`);
// });

const port = process.env.BE_PORT;
https.createServer(app).listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});

export default app;