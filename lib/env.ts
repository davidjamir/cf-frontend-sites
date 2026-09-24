// lib/env.ts
import { env } from "cloudflare:workers";

export const isDevelopment = process.env.APP_ENV === "development";
export const ADAPTER_API_ENDPOINT = process.env.ADAPTER_API_ENDPOINT;
export const ADAPTER_SECRET_TOKEN = process.env.ADAPTER_SECRET_TOKEN;
export const INTERNAL_SECRET = process.env.INTERNAL_SECRET;
export const WORKER_R2_DATABASE = env.WORKER_R2_DATABASE;
