// lib/env.ts
import { env } from "cloudflare:workers";

export const isProduction = env.APP_ENV === "production";
export const ADAPTER_API_ENDPOINT = env.ADAPTER_API_ENDPOINT;
export const ADAPTER_SECRET_TOKEN = env.ADAPTER_SECRET_TOKEN;
export const INTERNAL_SECRET = env.INTERNAL_SECRET;
export const WORKER_R2_DATABASE = env.WORKER_R2_DATABASE;
export const ENDPOINT_SERVER_IMAGE_GENERATOR_VERCEL =
  env.ENDPOINT_SERVER_IMAGE_GENERATOR_VERCEL;
export const ENDPOINT_SERVER_IMAGE_GENERATOR_VPS =
  env.ENDPOINT_SERVER_IMAGE_GENERATOR_VPS;
