import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Lokal menggunakan .env.local.
// Hostinger menggunakan environment variables dari dashboard.
config({ path: ".env.local" });
config({ path: ".env" });

export default defineConfig({
    schema: "prisma/schema.prisma",

    migrations: {
        path: "prisma/migrations",
    },

    datasource: {
        url: env("DATABASE_URL"),
    },
});