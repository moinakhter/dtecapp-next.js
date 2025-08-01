"use client"
import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useSearchParams  } from "next/navigation"
import type { ClientApplication } from "@shopify/app-bridge"
import type { Redirect } from "@shopify/app-bridge/actions"

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

interface AppBridgeState {
  app: ClientApplication
  Redirect: typeof Redirect
}

export default function Step3Token() {
  const [token, setToken] = useState<string | null>(null)
  const [tokenError, setTokenError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [appBridge, setAppBridge] = useState<AppBridgeState | null>(null)
  const [isEmbedded, setIsEmbedded] = useState<boolean>(false)

  const searchParams = useSearchParams()
 

  useEffect(() => {
    const initAppBridge = async (): Promise<void> => {
      try {
        const { createApp } = await import("@shopify/app-bridge")
        const { Redirect } = await import("@shopify/app-bridge/actions")
        const host = searchParams.get("host")
        const embedded = searchParams.get("embedded")

        if (embedded === "1" && host) {
          const app = createApp({
            apiKey: "9a0b89206045b51e5c07c821e340a610",
            host: host,
          })
          setAppBridge({ app, Redirect })
          setIsEmbedded(true)
        } else {
          setIsEmbedded(false)
        }
      } catch (error) {
        console.error("App Bridge initialization failed:", error)
        setIsEmbedded(false)
      }
    }

    initAppBridge()
  }, [searchParams])

  useEffect(() => {
    // Check URL parameters first
    const status = searchParams.get("status")
    const storefrontToken = searchParams.get("storefront_token")
    const error = searchParams.get("error")
    const shop = searchParams.get("shop")

    if (status === "true" && storefrontToken) {
      setToken(storefrontToken)
      sessionStorage.setItem("shopify_storefront_token", storefrontToken)
      setLoading(false)
      setTokenError(false)
      return
    }

    if (status === "error") {
      setTokenError(true)
      setLoading(false)
      console.error("Token generation error:", error)
      return
    }

    // Check session storage for existing token
    const existingToken = sessionStorage.getItem("shopify_storefront_token")
    if (existingToken) {
      setToken(existingToken)
      setLoading(false)
      return
    }

    // If no token and we have shop, show install button
    if (shop && !storefrontToken && status !== "error") {
      setLoading(false)
    }
  }, [searchParams])

  const handleInstallApp = () => {
    const shop = searchParams.get("shop")
    const host = searchParams.get("host")
    const embedded = searchParams.get("embedded")

    if (!shop) {
      alert("Shop parameter is missing")
      return
    }

    setLoading(true)

    const authUrl = new URL("https://dtec.app/api/shopify/auth")
    authUrl.searchParams.set("shop", shop)
    if (host) authUrl.searchParams.set("host", host)
    if (embedded) authUrl.searchParams.set("embedded", embedded)

    if (isEmbedded && appBridge) {
      const redirect = appBridge.Redirect.create(appBridge.app)
      redirect.dispatch(appBridge.Redirect.Action.REMOTE, {
        url: authUrl.toString(),
        newContext: true,
      })
    } else {
      window.location.href = authUrl.toString()
    }
  }

  const handleRetry = () => {
    sessionStorage.clear()
    setLoading(false)
    setTokenError(false)
    setToken(null)

    // Remove URL parameters and reload
    const url = new URL(window.location.href)
    url.searchParams.delete("status")
    url.searchParams.delete("storefront_token")
    url.searchParams.delete("error")
    window.history.replaceState({}, document.title, url.toString())
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
                <p className="text-red-600">Failed to generate Storefront API access token. Please try again.</p>
                <Button className="mt-2" onClick={handleRetry}>
                  Try Again
                </Button>
              </div>
            )}

            {!token && !tokenError && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Click the button below to generate your Storefront API access token.
                </p>
                <Button onClick={handleInstallApp}>Generate Token</Button>
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
                      alert("Copied to clipboard!")
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
