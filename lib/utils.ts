import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateMiddle(str: string, startChars = 8, endChars = 8) {
  if (str.length <= startChars + endChars) {
    return str
  }
  return `${str.slice(0, startChars)}...${str.slice(-endChars)}`
}

