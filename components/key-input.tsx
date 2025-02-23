import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface KeyInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

export function KeyInput({ id, label, value, onChange, placeholder, error }: KeyInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn("bg-secondary/50 border-0", error && "border-2 border-destructive")}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}

