"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugLogsPage() {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    // This will help us see the server logs
    const fetchLogs = async () => {
      try {
        const response = await fetch("/api/debug-logs")
        if (response.ok) {
          const data = await response.json()
          setLogs(data.logs || [])
        }
      } catch (error) {
        console.error("Failed to fetch logs:", error)
      }
    }

    fetchLogs()
    const interval = setInterval(fetchLogs, 2000) // Refresh every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Debug Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-muted-foreground">No logs available</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="text-sm font-mono bg-gray-100 p-2 rounded">
                  {log}
                </div>
              ))
            )}
          </div>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Refresh Logs
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
