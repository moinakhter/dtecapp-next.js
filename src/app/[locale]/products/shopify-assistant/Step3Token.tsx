"use client"

import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

interface TokenResponse {
  status: boolean
  redirect_url?: string
  storefront_access_token?: {
    storefrontAccessToken?: {
      accessToken: string
    }
    error?: string
  }
  error?: string
}

export default function ShopifyAssistant() {
  const [token, setToken] = useState<string | null>(null)
  const [tokenError, setTokenError] = useState(false)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const shop = searchParams.get("shop")
    const hmac = searchParams.get("hmac")
    const code = searchParams.get("code")

    if (!shop) {
      setTokenError(true)
      setLoading(false)
      return
    }

    // Build query string for API call
    const queryParams = new URLSearchParams()
    queryParams.set("shop", shop)
    if (hmac) queryParams.set("hmac", hmac)
    if (code) queryParams.set("code", code)

    // Call the backend API
    fetch(`/api/shopify/callback?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data: TokenResponse) => {
        if (data.status === false && data.redirect_url) {
          // Redirect to Shopify OAuth
          window.location.href = data.redirect_url
          return
        }

        if (data.status && data.storefront_access_token) {
          if (data.storefront_access_token.error) {
            setTokenError(true)
          } else if (data.storefront_access_token.storefrontAccessToken?.accessToken) {
            setToken(data.storefront_access_token.storefrontAccessToken.accessToken)
          } else {
            setTokenError(true)
          }
        } else {
          setTokenError(true)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error("OAuth error:", error)
        setTokenError(true)
        setLoading(false)
      })
  }, [searchParams])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Processing Shopify authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={stepVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-[150px_1fr] gap-9 items-start group"
      >
        <div>
          <h3 className="md:text-[32px] text-lg font-medium">Step 3:</h3>
        </div>
        <div className="space-y-4 max-w-2xl">
          <h4 className="text-xl font-medium">Generate the Storefront API Access Token:</h4>

          <div className="space-y-4">
            {tokenError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">
                  Access Token not found, please reinstall the app to generate a new Storefront API access token.
                </p>
              </div>
            )}

            {token && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Your StoreFront API Access Token:</p>
                <div className="flex bg-card w-fit items-center gap-2 p-2 border rounded-md">
                  <code className="px-2 py-1 bg-muted rounded font-semibold text-black dark:text-white">{token}</code>
                  <Button
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(token)
                      // Optional: show toast notification
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            )}

            <ol className="list-decimal list-inside space-y-2 text-base font-light">
              <li>Copy your Storefront API Access Token</li>
            </ol>
          </div>

          <div className="relative overflow-hidden max-w-1/3 mt-auto">
            <div className="w-full h-px bg-border" />
            <div className="absolute top-0 left-0 h-px bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-out" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
