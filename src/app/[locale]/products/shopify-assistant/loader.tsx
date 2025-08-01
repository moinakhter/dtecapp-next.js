"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    ShopifyApp?: unknown
  }
}

const ShopifyAppBridgeLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return

    // Check if script is already loaded
    if (window.ShopifyApp) {
      setIsLoaded(true)
      return
    }

    // Check if script tag already exists
    const existingScript = document.querySelector('script[src*="app-bridge.js"]')
    if (existingScript) {
      // If script exists but ShopifyApp is not available, wait for it
      const checkInterval = setInterval(() => {
        if (window.ShopifyApp) {
          setIsLoaded(true)
          clearInterval(checkInterval)
        }
      }, 100)

      // Clear interval after 10 seconds to avoid infinite checking
      setTimeout(() => clearInterval(checkInterval), 10000)
      return
    }

    try {
      // Add meta tag for API key first
      const existingMeta = document.querySelector('meta[name="shopify-api-key"]')
      if (!existingMeta) {
        const metaTag = document.createElement("meta")
        metaTag.name = "shopify-api-key"
        metaTag.content = "9a0b89206045b51e5c07c821e340a610"
        document.head.insertBefore(metaTag, document.head.firstChild)
      }

      // Create and inject the script tag manually
      const script = document.createElement("script")
      script.src = "https://cdn.shopify.com/shopifycloud/app-bridge.js"

      script.onload = () => {
        setIsLoaded(true)
        console.log("App Bridge loaded successfully")
      }

      script.onerror = () => {
        setError("Failed to load App Bridge script")
        console.error("Failed to load App Bridge script")
      }

      // Insert as the very first script in head
      const firstChild = document.head.firstChild
      document.head.insertBefore(script, firstChild)
    } catch (err) {
      setError("Error setting up App Bridge")
      console.error("Error setting up App Bridge:", err)
    }
  }, [])

  // Only show status in development
  if (process.env.NODE_ENV === "development") {
    if (error) {
      return (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded z-50">
          {error}
        </div>
      )
    }

    if (!isLoaded) {
      return (
        <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded z-50">
          Loading App Bridge...
        </div>
      )
    }

    return (
      <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded z-50">
        App Bridge Ready
      </div>
    )
  }

  return null
}

export default ShopifyAppBridgeLoader
