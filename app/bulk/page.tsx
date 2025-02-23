"use client"

import { useState } from "react"
import { nip19 } from "nostr-tools"
import { Zap, RotateCcw, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function BulkConverter() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [mode, setMode] = useState<"npub" | "hex">("npub")

  const convert = () => {
    const lines = input.split("\n").filter((line) => line.trim() !== "")
    const converted: string[] = []
    let hasError = false

    lines.forEach((line) => {
      try {
        if (mode === "npub") {
          const { type, data } = nip19.decode(line.trim())
          if (type !== "npub") {
            throw new Error(`Invalid npub format: ${line}`)
          }
          converted.push(data)
        } else {
          if (!/^[0-9a-f]{64}$/i.test(line.trim())) {
            throw new Error(`Invalid hex format: ${line}`)
          }
          converted.push(nip19.npubEncode(line.trim()))
        }
      } catch (err) {
        hasError = true
        converted.push(`Error: ${err instanceof Error ? err.message : "Invalid format"}`)
      }
    })

    setResult(converted.join("\n"))
    setError(hasError ? "Some conversions failed. Check the output for details." : "")
  }

  const toggleMode = () => {
    setMode(mode === "npub" ? "hex" : "npub")
    resetForm()
  }

  const resetForm = () => {
    setInput("")
    setResult("")
    setError("")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold">Bulk Azzamo Pubkey Converter</h1>
          <p className="text-muted-foreground">
            Convert multiple Nostr {mode === "npub" ? "npubs to hex public keys" : "hex public keys to npubs"}
          </p>
        </div>

        <div className="space-y-6 bg-card/50 p-6 rounded-lg border border-border/50">
          <div className="space-y-2">
            <Label htmlFor="input" className="text-sm font-medium">
              {mode === "npub" ? "Npub Addresses" : "Hex Public Keys"} (one per line)
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "npub" ? "npub1...\nnpub2...\n..." : "hex1...\nhex2...\n..."}
              className="h-40 bg-secondary/50 border-0"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={convert} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              Convert
            </Button>
            <Button onClick={resetForm} variant="outline" size="icon" title="Reset">
              <RotateCcw className="h-4 w-4" />
              <span className="sr-only">Reset</span>
            </Button>
          </div>

          {result && (
            <div className="space-y-2">
              <Label htmlFor="result" className="text-sm font-medium">
                {mode === "npub" ? "Hex Public Keys" : "Npub Addresses"}
              </Label>
              <Textarea
                id="result"
                value={result}
                readOnly
                className="h-40 bg-secondary/50 border-0 font-mono text-sm"
              />
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <div className="text-center space-y-4">
          <Button variant="ghost" onClick={toggleMode} className="text-muted-foreground hover:text-foreground">
            Switch to {mode === "npub" ? "Hex to Npub" : "Npub to Hex"}
          </Button>
          <div>
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Standard Converter
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

