import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with clsx + tailwind-merge so later classes
 * deterministically override earlier ones.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
