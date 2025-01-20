import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formateDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  // Format the date as "Dec, 20, 2024"
  const parts = formattedDate.split(" ");
  const finalFormattedDate = `${parts[0]}, ${parts[1]} ${parts[2]}`;

  return finalFormattedDate
}