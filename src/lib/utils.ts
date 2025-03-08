import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export function getGMColor(gmPercentage: number): string {
  if (gmPercentage >= 0.4) return 'bg-green-100';
  if (gmPercentage >= 0.1) return 'bg-yellow-100';
  if (gmPercentage > 0.05) return 'bg-orange-100';
  return 'bg-red-100';
}