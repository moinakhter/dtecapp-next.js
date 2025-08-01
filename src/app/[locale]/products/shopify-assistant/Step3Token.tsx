"use client"

import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Copy, Loader2 } from "lucide-react"
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
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [copied, setCopied] = useState<boolean>(false)
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
    const shop = searchParams.get("shop")
    const host = searchParams.get("host")
    const embedded = searchParams.get("embedded")
    const tokenParam = searchParams.get("token")
    const status = searchParams.get("status")
    const errorParam = searchParams.get("error")
    const debugScope = searchParams.get("debug_scope")

    console.log("URL params:", { shop, host, embedded, tokenParam, status, errorParam, debugScope })

    // If we have a token in URL, display it
    if (tokenParam && status === "success") {
      setToken(tokenParam)
      setLoading(false)
      return
    }

    // If we have an error in URL, display it
    if (errorParam || status === "error") {
      setError(errorParam || "Unknown error occurred")
      if (debugScope) {
        setDebugInfo(`Granted scopes: ${debugScope}`)
      }
      setLoading(false)
      console.error("Token generation error:", errorParam)
      return
    }

    // Check if we're in iframe and have shop - start OAuth automatically
    if (shop && host && embedded === "1" && !tokenParam && !errorParam) {
      console.log("Detected iframe context, starting OAuth flow...")

      // Add a small delay to ensure App Bridge is ready
      setTimeout(() => {
        const authUrl = new URL("https://dtec.app/api/shopify/auth")
        authUrl.searchParams.set("shop", shop)
        authUrl.searchParams.set("host", host)
        authUrl.searchParams.set("embedded", embedded)

        if (isEmbedded && appBridge) {
          const redirect = appBridge.Redirect.create(appBridge.app)
          redirect.dispatch(appBridge.Redirect.Action.REMOTE, {
            url: authUrl.toString(),
            newContext: true,
          })
        } else {
          // Fallback to direct redirect if App Bridge not ready
          window.location.href = authUrl.toString()
        }
      }, 1000)
      return
    }

    // If no iframe context, show error
    if (!shop || !host || embedded !== "1") {
      setError("This page must be opened from within the Shopify admin")
      setLoading(false)
      return
    }

    setLoading(false)
  }, [searchParams, appBridge, isEmbedded])

  const handleCopy = async () => {
    if (!token) return

    try {
      await navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textArea = document.createElement("textarea")
      textArea.value = token
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleRetry = () => {
    const shop = searchParams.get("shop")
    const host = searchParams.get("host")
    const embedded = searchParams.get("embedded")

    if (shop && host && embedded) {
      // Clear URL params and restart
      const url = new URL(window.location.href)
      url.searchParams.delete("token")
      url.searchParams.delete("status")
      url.searchParams.delete("error")
      url.searchParams.delete("debug_scope")
      window.history.replaceState({}, document.title, url.toString())

      setLoading(true)
      setError(null)
      setDebugInfo(null)
      setToken(null)

      // Restart OAuth flow using App Bridge
      const authUrl = new URL("https://dtec.app/api/shopify/auth")
      authUrl.searchParams.set("shop", shop)
      authUrl.searchParams.set("host", host)
      authUrl.searchParams.set("embedded", embedded)

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
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg font-medium">Generating your Storefront API token...</p>
            <p className="text-sm text-muted-foreground mt-2">
              {isEmbedded ? "Embedded context detected" : "Standalone context"}
            </p>
          </div>
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

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-red-600 font-medium">Failed to generate token</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                  {debugInfo && <p className="text-red-600 text-xs mt-2 font-mono">{debugInfo}</p>}
                  <div className="mt-3 space-x-2">
                    <Button size="sm" onClick={handleRetry}>
                      Try Again
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => window.open("/debug-logs", "_blank")}>
                      View Debug Logs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {token && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-green-600 font-medium">Token generated successfully!</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Your Storefront API Access Token:</p>
                <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg border">
                  <code className="flex-1 text-sm font-mono break-all">{token}</code>
                  <Button size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-1" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Next Steps:</h5>
                <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                  <li>Copy your Storefront API Access Token above</li>
                  <li>Use this token in your API requests</li>
 
                </ol>
              </div>
            </div>
          )}

          <div className="relative overflow-hidden mt-8">
            <div className="w-full h-px bg-border" />
            <div className="absolute top-0 left-0 h-px bg-secondary w-0 group-hover:w-full transition-all duration-500 ease-out" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
