"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function generateState(length = 20) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function Step3Token() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shop = urlParams.get("shop");
    const code = urlParams.get("code");
    const hmac = urlParams.get("hmac");

    if (!shop) {
      setTokenError(true);
      return;
    }

    if (!code) {
 
      const state = generateState();
      const clientId = process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!;
      const redirectUri = encodeURIComponent(
        `${window.location.origin}/products/shopify-assistant`
      );
      const scopes =
        "unauthenticated_write_checkouts,unauthenticated_read_product_listings,unauthenticated_read_customers,unauthenticated_read_checkouts";

      const shopifyAuthUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=${state}`;
      window.location.href = shopifyAuthUrl;
      return;
    }

 
    fetch(`/api/shopify/callback?shop=${shop}&hmac=${hmac}&code=${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.storefront_access_token) {
          setToken(data.storefront_access_token);
        } else {
          setTokenError(true);
        }
      })
      .catch(() => setTokenError(true));
  }, []);

  return (
    <motion.div
      variants={stepVariants}
      className="grid md:grid-cols-[150px_1fr] gap-9 items-start group"
    >
      <div>
        <h3 className="md:text-[32px] text-lg font-medium">Step 3:</h3>
      </div>

      <div className="space-y-4 max-w-2xl">
        <h4 className="text-xl font-medium">
          Get Your Storefront API Access Token
        </h4>

        <ul className="space-y-2 text-base font-light">
          <li>Generate the Storefront API Access Token:</li>

          {tokenError && (
            <li className="text-red-500">
              Access Token not found. Please reinstall the app or check
              permissions.
            </li>
          )}

          {token && (
            <li>
              <div className="flex bg-card w-fit items-center gap-2">
                <code className="px-2 py-1 bg-muted rounded font-semibold text-black dark:text-white">
                  {token}
                </code>
                <Button
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(token)}
                >
                  Copy
                </Button>
              </div>
            </li>
          )}

          <li>
            <p>Copy your Storefront API Access Token.</p>
          </li>
        </ul>

        <div className="relative overflow-hidden max-w-1/3 mt-auto">
          <div className="w-full h-px bg-border" />
          <div className="absolute top-0 left-0 h-px bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-out" />
        </div>
      </div>
    </motion.div>
  );
}
