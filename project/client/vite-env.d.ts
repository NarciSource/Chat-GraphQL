/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_URL: string;
  readonly VITE_SERVER_PORT: number;
  readonly VITE_MF_TYPE: "application" | "parcel";
  readonly VITE_STANDALONE: boolean;
  readonly VITE_LAYOUT_WIDTH: string;
  readonly VITE_LAYOUT_HEIGHT: string;
  readonly VITE_GRAPHQL_SERVER_URL: string;
  readonly VITE_AUTH_PARCEL_URL: string;
  readonly VITE_MANUAL_USER_SET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
