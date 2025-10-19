import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * A utility function to combine and conditionally apply class names,
 * with conflict resolution for Tailwind CSS classes.
 *
 * It uses `clsx` for conditional class application and
 * `twMerge` to ensure correct Tailwind precedence and merge conflicts.
 *
 * @param inputs - An array of class values (strings, arrays, objects, etc.)
 * @returns A single, merged string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}