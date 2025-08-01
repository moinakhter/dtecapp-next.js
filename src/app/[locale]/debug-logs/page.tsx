"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DebugInfo {
  environment: string
  siteUrl: string | undefined
  shopifyClientId: string | undefined
  hasClientSecret: boolean
  currentUrl: string
  searchParams: Record<string, string>
}

export default function ShopifyDebug() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const params: Record<string, string> = {}

    for (const [key, value] of searchParams.entries()) {
      params[key] = value
    }

    setDebugInfo({
      environment: process.env.NODE_ENV || "unknown",
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
      shopifyClientId: process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID,
      hasClientSecret: !!process.env.SHOPIFY_CLIENT_SECRET,
      currentUrl: window.location.href,
      searchParams: params,
    })
  }, [])

  const testEnvironmentVariables = async () => {
    try {
      const response = await fetch("/api/shopify/debug")
      const data = await response.json()
      console.log("Environment variables test:", data)
      alert(`Environment test: ${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      console.error("Environment test failed:", error)
      alert("Environment test failed - check console")
    }
  }

  if (!debugInfo) {
    return <div>Loading debug info...</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Shopify OAuth Debug Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Environment</h3>
              <Badge variant={debugInfo.environment === "production" ? "default" : "secondary"}>
                {debugInfo.environment}
              </Badge>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Site URL</h3>
              <code className="text-sm bg-muted p-1 rounded">{debugInfo.siteUrl || "NOT SET"}</code>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Shopify Client ID</h3>
              <code className="text-sm bg-muted p-1 rounded">
                {debugInfo.shopifyClientId ? `${debugInfo.shopifyClientId.substring(0, 8)}...` : "NOT SET"}
              </code>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Client Secret</h3>
              <Badge variant={debugInfo.hasClientSecret ? "default" : "destructive"}>
                {debugInfo.hasClientSecret ? "SET" : "NOT SET"}
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Current URL</h3>
            <code className="text-sm bg-muted p-2 rounded block break-all">{debugInfo.currentUrl}</code>
          </div>

          <div>
            <h3 className="font-semibold mb-2">URL Parameters</h3>
            <div className="space-y-1">
              {Object.entries(debugInfo.searchParams).length > 0 ? (
                Object.entries(debugInfo.searchParams).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <Badge variant="outline">{key}</Badge>
                    <code className="text-sm">{value}</code>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No parameters found</p>
              )}
            </div>
          </div>

          <Button onClick={testEnvironmentVariables} className="w-full">
            Test Environment Variables
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
