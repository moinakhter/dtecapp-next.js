"use client"

import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useSearchParams, useParams } from "next/navigation"
import type { ClientApplication } from "@shopify/app-bridge"
import type { Redirect } from "@shopify/app-bridge/actions"

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
  debug?: unknown
}

interface AppBridgeState {
  app: ClientApplication
  Redirect: typeof Redirect
}

export default function Step3Token() {
  const [token, setToken] = useState<string | null>(null)
  const [tokenError, setTokenError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [appBridge, setAppBridge] = useState<AppBridgeState | null>(null)
  const [isEmbedded, setIsEmbedded] = useState<boolean>(false)
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = (params.locale as string) || "en"

  // Initialize App Bridge using npm package with official types
  useEffect(() => {
    const initAppBridge = async (): Promise<void> => {
      try {
        const { createApp } = await import("@shopify/app-bridge")
        const { Redirect } = await import("@shopify/app-bridge/actions")

        const host = searchParams.get("host")
        const embedded = searchParams.get("embedded")

        console.log("Initializing App Bridge with:", { host, embedded })

        if (embedded === "1" && host) {
          const app = createApp({
            apiKey: "9a0b89206045b51e5c07c821e340a610",
            host: host,
          })

          setAppBridge({ app, Redirect })
          setIsEmbedded(true)
          console.log("App Bridge initialized successfully")
        } else {
          console.log("Not in embedded context or missing host")
          setIsEmbedded(false)
        }
      } catch (error) {
        console.error("Failed to initialize App Bridge:", error)
        setIsEmbedded(false)
      }
    }

    initAppBridge()
  }, [searchParams])

  useEffect(() => {
    const shop = searchParams.get("shop")
    const hmac = searchParams.get("hmac")
    const code = searchParams.get("code")
    const embedded = searchParams.get("embedded")
const timestamp = searchParams.get("timestamp")
const state = searchParams.get("state")

    console.log("URL params:", { shop, hmac, code, embedded, locale })

    if (!shop) {
      console.error("No shop parameter found")
      setTokenError(true)
      setLoading(false)
      return
    }

    const queryParams = new URLSearchParams()
queryParams.set("shop", shop!)
if (hmac) queryParams.set("hmac", hmac)
if (code) queryParams.set("code", code)
if (embedded) queryParams.set("embedded", embedded)
if (timestamp) queryParams.set("timestamp", timestamp)
if (state) queryParams.set("state", state)



    console.log("Calling API with:", queryParams.toString())

    // Call the backend API
    fetch(`/api/shopify/callback?${queryParams.toString()}`)
      .then((res) => {
        console.log("API response status:", res.status)
        return res.json() as Promise<TokenResponse>
      })
      .then((data: TokenResponse) => {
        console.log("API response data:", data)

        if (data.status === false && data.redirect_url) {
          console.log("Need to redirect to OAuth:", data.redirect_url)

          // Check if we're in an embedded context and App Bridge is available
          if (isEmbedded && appBridge) {
            try {
              console.log("Using App Bridge for redirect")

              const redirect = appBridge.Redirect.create(appBridge.app)
              redirect.dispatch(appBridge.Redirect.Action.REMOTE, {
                url: data.redirect_url,
                newContext: true,
              })

              console.log("App Bridge redirect dispatched")
              return
            } catch (error) {
              console.error("App Bridge redirect failed:", error)
              // Fallback to regular redirect
            }
          }

          // Not embedded or App Bridge failed, use regular redirect
          console.log("Using regular redirect")
          window.location.href = data.redirect_url
          return
        }

        if (data.status && data.storefront_access_token) {
          if (data.storefront_access_token.error) {
            console.error("Storefront token error:", data.storefront_access_token.error)
            setTokenError(true)
          } else if (data.storefront_access_token.storefrontAccessToken?.accessToken) {
            console.log("Token received:", data.storefront_access_token.storefrontAccessToken.accessToken)
            setToken(data.storefront_access_token.storefrontAccessToken.accessToken)
          } else {
            console.error("No access token in response")
            setTokenError(true)
          }
        } else if (data.error) {
          console.error("API error:", data.error)
          if (data.debug) {
            console.error("Debug info:", data.debug)
          }
          setTokenError(true)
        } else {
          console.error("Unexpected response format:", data)
          setTokenError(true)
        }
        setLoading(false)
      })
      .catch((error: Error) => {
        console.error("Fetch error:", error)
        setTokenError(true)
        setLoading(false)
      })
  }, [searchParams, appBridge, isEmbedded, locale])

  const handleRetry = () => {
    setLoading(true)
    setTokenError(false)
    setToken(null)

    // Reload the page to restart the OAuth flow
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Processing Shopify authentication...</p>
          <p className="text-sm text-muted-foreground mt-2">
            {isEmbedded ? "Embedded context detected" : "Standalone context"}
          </p>
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
                <Button className="mt-2" onClick={handleRetry}>
                  Try Again
                </Button>
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
