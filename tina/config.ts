import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "uploads",
    },
  },
  schema: {
    collections: [
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "md",
        ui: {
          router: ({ document }) => `/${document._sys.filename === "home" ? "home" : document._sys.filename}`,
        },
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          { type: "string", name: "description", label: "Description" },
          { type: "string", name: "slug", label: "Slug", required: true },
          { type: "rich-text", name: "body", label: "Content", isBody: true },
        ],
      },
    ],
  },
});
