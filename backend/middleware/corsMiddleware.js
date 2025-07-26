import cors from "cors";

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization"
};

export const corsMiddleware = cors(corsOptions);
