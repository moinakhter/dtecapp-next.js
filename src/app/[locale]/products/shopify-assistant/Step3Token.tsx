"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useSearchParams, useParams } from "next/navigation"
import type { ClientApplication } from "@shopify/app-bridge"
import { Redirect } from "@shopify/app-bridge/actions"

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

interface AuthResponse {
  status: boolean
  auth_url?: string
  storefront_token?: string
  shop?: string
  error?: string
  debug?: unknown
}

interface AppBridgeState {
  app: ClientApplication
  Redirect: typeof Redirect
}

type AuthStep = "checking" | "need_auth" | "processing" | "complete" | "error"

export default function Step3Token() {
  const [token, setToken] = useState<string | null>(null)
  const [tokenError, setTokenError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [appBridge, setAppBridge] = useState<AppBridgeState | null>(null)
  const [isEmbedded, setIsEmbedded] = useState<boolean>(false)
  const [authStep, setAuthStep] = useState<AuthStep>("checking")

  const searchParams = useSearchParams()
  const params = useParams()
  const locale = (params.locale as string) || "en"

  // Initialize App Bridge using npm package with official types
  useEffect(() => {
    const initAppBridge = async (): Promise<void> => {
      try {
        const { createApp } = await import("@shopify/app-bridge")
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

    void initAppBridge()
  }, [searchParams])

  // Main authentication flow
  useEffect(() => {
    const handleAuth = async (): Promise<void> => {
      // Check if we already have a token in session storage
      const existingToken = sessionStorage.getItem("shopify_storefront_token")
      if (existingToken) {
        console.log("🎉 Found existing token in session storage")
        setToken(existingToken)
        setAuthStep("complete")
        setLoading(false)
        return
      }

      const shop = searchParams.get("shop")
      const code = searchParams.get("code")
      const hmac = searchParams.get("hmac")
      const embedded = searchParams.get("embedded")
      const host = searchParams.get("host")

      console.log("URL params:", { shop, hmac, code, embedded, locale })

      if (!shop) {
        console.error("No shop parameter found")
        setTokenError("Missing shop parameter")
        setAuthStep("error")
        setLoading(false)
        return
      }

      // Build query parameters
      const queryParams = new URLSearchParams()
      queryParams.set("shop", shop)
      if (code) queryParams.set("code", code)
      if (hmac) queryParams.set("hmac", hmac)
      if (embedded) queryParams.set("embedded", embedded)
      if (host) queryParams.set("host", host)

      try {
        console.log("Calling auth API with:", queryParams.toString())
        setAuthStep("processing")

        const response = await fetch(`/api/shopify/auth?${queryParams.toString()}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: AuthResponse = await response.json()
        console.log("Auth API response:", data)

        if (!data.status && data.auth_url) {
          // Need to authenticate - redirect to Shopify OAuth
          console.log("Need to authenticate, redirecting to:", data.auth_url)
          setAuthStep("need_auth")

          if (isEmbedded && appBridge) {
            try {
              console.log("Using App Bridge for OAuth redirect")
              const redirect = appBridge.Redirect.create(appBridge.app)
              redirect.dispatch(appBridge.Redirect.Action.REMOTE, {
                url: data.auth_url,
                newContext: true,
              })
              console.log("App Bridge redirect dispatched")
              return
            } catch (error) {
              console.error("App Bridge redirect failed:", error)
            }
          }

          // Fallback to regular redirect
          console.log("Using regular redirect for OAuth")
          window.location.href = data.auth_url
          return
        }

        if (data.status && data.storefront_token) {
          // Success! We have the token
          console.log("🎉 Token received:", data.storefront_token)
          setToken(data.storefront_token)
          sessionStorage.setItem("shopify_storefront_token", data.storefront_token)
          sessionStorage.setItem("shopify_shop", shop)
          setAuthStep("complete")
        } else if (data.error) {
          console.error("Auth API error:", data.error)
          if (data.debug) {
            console.error("Debug info:", data.debug)
          }
          setTokenError(data.error)
          setAuthStep("error")
        } else {
          console.error("Unexpected response format:", data)
          setTokenError("Unexpected response from server")
          setAuthStep("error")
        }
      } catch (error) {
        console.error("Auth request failed:", error)
        const errorMessage = error instanceof Error ? error.message : "Failed to communicate with server"
        setTokenError(errorMessage)
        setAuthStep("error")
      } finally {
        setLoading(false)
      }
    }

    // Only run if App Bridge is initialized (or we're not in embedded mode)
    if (isEmbedded === false || appBridge) {
      void handleAuth()
    }
  }, [searchParams, appBridge, isEmbedded, locale])

  const handleRetry = (): void => {
    sessionStorage.clear()
    setLoading(true)
    setTokenError(null)
    setToken(null)
    setAuthStep("checking")

    // Remove URL parameters and reload
    const url = new URL(window.location.href)
    url.search = ""
    window.history.replaceState({}, "", url.toString())
    window.location.reload()
  }

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text)
      console.log("Token copied to clipboard")
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand("copy")
        console.log("Token copied to clipboard (fallback)")
      } catch (fallbackError) {
        console.error("Fallback copy failed:", fallbackError)
      }
      document.body.removeChild(textArea)
    }
  }

  if (loading || authStep === "checking" || authStep === "processing") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>
            {authStep === "checking" && "Checking authentication status..."}
            {authStep === "processing" && "Processing Shopify authentication..."}
            {loading && "Loading..."}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {isEmbedded ? "Embedded context detected" : "Standalone context"}
          </p>
        </div>
      </div>
    )
  }

  if (authStep === "need_auth") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Redirecting to Shopify for authentication...</p>
          <p className="text-sm text-muted-foreground mt-2">
            If you are not redirected automatically, please check your popup blocker.
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
            {authStep === "error" && tokenError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{tokenError}</p>
                <Button className="mt-2" onClick={handleRetry}>
                  Try Again
                </Button>
              </div>
            )}

            {authStep === "complete" && token && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Your StoreFront API Access Token:</p>
                <div className="flex bg-card w-fit items-center gap-2 p-2">
                  <code className="px-2 py-1 bg-muted rounded font-semibold text-black dark:text-white">{token}</code>
                  <Button size="sm" onClick={() => void copyToClipboard(token)} type="button">
                    Copy
                  </Button>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-600">✅ Authentication successful! Your token is ready to use.</p>
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
