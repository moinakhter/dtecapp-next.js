"use client"

import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Copy, RefreshCw } from "lucide-react"

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

export default function Step3Token() {
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<"loading" | "success" | "error" | "pending">("pending")
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const searchParams = useSearchParams()
 
 

  useEffect(() => {
    const urlStatus = searchParams.get("status")
    const storefrontToken = searchParams.get("storefront_token")
    const errorMessage = searchParams.get("error")
    const shop = searchParams.get("shop")

    if (urlStatus === "success" && storefrontToken) {
      setToken(storefrontToken)
      setStatus("success")
      // Store in session storage for persistence
      sessionStorage.setItem("shopify_storefront_token", storefrontToken)
      sessionStorage.setItem("shopify_shop", shop || "")
    } else if (urlStatus === "error") {
      setStatus("error")
      setError(errorMessage || "Unknown error occurred")
    } else if (shop && !storefrontToken) {
      // Check if we have a stored token
      const storedToken = sessionStorage.getItem("shopify_storefront_token")
      const storedShop = sessionStorage.getItem("shopify_shop")

      if (storedToken && storedShop === shop) {
        setToken(storedToken)
        setStatus("success")
      } else {
        setStatus("pending")
      }
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

    setStatus("loading")

    const authUrl = new URL("https://dtec.app/api/shopify/auth")
    authUrl.searchParams.set("shop", shop)
    if (host) authUrl.searchParams.set("host", host)
    if (embedded) authUrl.searchParams.set("embedded", embedded)

    window.location.href = authUrl.toString()
  }

  const handleCopyToken = async () => {
    if (!token) return

    try {
      await navigator.clipboard.writeText(token)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
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
    sessionStorage.clear()
    setStatus("pending")
    setError(null)
    setToken(null)
    // Reload the page to reset state
    window.location.reload()
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg font-medium">Installing Shopify App...</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please wait while we set up your storefront access token.
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

        <div className="space-y-6 max-w-2xl">
          <h4 className="text-xl font-medium">Generate the Storefront API Access Token:</h4>

          {status === "pending" && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Click the button below to install the Shopify app and generate your storefront access token.
              </p>
              <Button onClick={handleInstallApp} size="lg">
                Install Shopify App
              </Button>
            </div>
          )}

          {status === "error" && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p>
                    <strong>Error:</strong> {error}
                  </p>
                  <p>Please try installing the app again.</p>
                  <Button variant="outline" size="sm" onClick={handleRetry}>
                    Try Again
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {status === "success" && token && (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  <strong>Success!</strong> Your Storefront API Access Token has been generated.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <p className="text-sm font-medium">Your StoreFront API Access Token:</p>
                <div className="flex bg-card items-center gap-2 p-3 border rounded-lg">
                  <code className="flex-1 px-3 py-2 bg-muted rounded font-mono text-sm break-all">{token}</code>
                  <Button size="sm" onClick={handleCopyToken} className="shrink-0">
                    <Copy className="h-4 w-4 mr-1" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Next Steps:</h5>
                <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800 dark:text-blue-200">
                  <li>Copy your Storefront API Access Token above</li>
                  <li>Use this token to access your Shopify storefront data</li>
                  <li>Keep this token secure and dont share it publicly</li>
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
