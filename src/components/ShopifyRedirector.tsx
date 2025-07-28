"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ShopifyAppBridge?: {
      default: (config: {
        apiKey: string;
        host: string;
        forceRedirect: boolean;
      }) => unknown;
      actions: {
        Redirect: {
          create: (app: unknown) => {
            dispatch: (action: string, path: string) => void;
          };
          Action: {
            ADMIN_PATH: string;
          };
        };
      };
    };
  }
}

export default function ShopifyRedirector() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shop = urlParams.get("shop");
    const host = urlParams.get("host");

    if (
      typeof window !== "undefined" &&
      window.ShopifyAppBridge &&
      shop &&
      host
    ) {
      const AppBridge = window.ShopifyAppBridge;
      const createApp = AppBridge.default;
      const actions = AppBridge.actions;
      const Redirect = actions.Redirect;

      const app = createApp({
        apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
        host,
        forceRedirect: true,
      });

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.ADMIN_PATH, "/settings/general");
    }
  }, []);

  return null;
}
