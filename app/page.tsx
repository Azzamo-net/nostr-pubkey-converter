"use client"

import { useState } from "react"
import { nip19 } from "nostr-tools"
import { Zap, RotateCcw, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from "@/components/copy-button"
import { KeyInput } from "@/components/key-input"
import { truncateMiddle } from "@/lib/utils"
import Link from "next/link"

export default function NostrConverter() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [mode, setMode] = useState<"npub" | "hex">("npub")

  const convert = () => {
    try {
      if (mode === "npub") {
        const { type, data } = nip19.decode(input)
        if (type !== "npub") {
          throw new Error("Invalid npub format")
        }
        setResult(data)
      } else {
        if (!/^[0-9a-f]{64}$/i.test(input)) {
          throw new Error("Invalid hex format (must be 64 characters)")
        }
        setResult(nip19.npubEncode(input))
      }
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid format")
      setResult("")
    }
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
      <main className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold">Azzamo Pubkey Converter</h1>
          <p className="text-muted-foreground">Convert between Nostr npub and hex public key formats</p>
        </div>

        <div className="space-y-6 bg-card/50 p-6 rounded-lg border border-border/50">
          <KeyInput
            id="input"
            label={mode === "npub" ? "Npub Address" : "Hex Public Key"}
            value={input}
            onChange={setInput}
            placeholder={mode === "npub" ? "npub1..." : "Enter 64-character hex public key"}
            error={error}
          />

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
              <Label className="text-sm font-medium">{mode === "npub" ? "Hex Public Key" : "Npub Address"}</Label>
              <div className="flex gap-2">
                <Input value={result} readOnly className="bg-secondary/50 border-0 font-mono text-sm" />
                <CopyButton value={result} />
              </div>
              <p className="text-xs text-muted-foreground">{truncateMiddle(result, 12, 12)}</p>
            </div>
          )}
        </div>

        <div className="text-center space-y-4">
          <Button variant="ghost" onClick={toggleMode} className="text-muted-foreground hover:text-foreground">
            Switch to {mode === "npub" ? "Hex to Npub" : "Npub to Hex"}
          </Button>
          <div>
            <Button variant="outline" asChild>
              <Link href="/bulk">
                <List className="w-4 h-4 mr-2" />
                Bulk Convert
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

