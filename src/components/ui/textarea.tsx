import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[200px] w-full rounded-md border-2 border-pink-300 bg-pink-50 px-4 py-3 text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:border-pink-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-pink-900 peer",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
