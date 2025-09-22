import { cn } from "@/lib/utils"

interface AAULoadingProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function AAULoading({ className, showText = true, size = "md" }: AAULoadingProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen bg-aau-blue p-4", className)}>
      {/* AAU Logo Container */}
      <div className="fade-in-up">
        <div
          className={cn(
            "rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-6",
            sizeClasses[size],
          )}
        >
          {/* AAU Logo Placeholder - Replace with actual logo */}
          <div className="text-white font-bold text-xl">AAU</div>
        </div>
      </div>

      {/* Portal Title */}
      {showText && (
        <div className="fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h1 className={cn("text-white font-bold text-center mb-8 tracking-wide", textSizeClasses[size])}>
            AAU Startups Portal
          </h1>
        </div>
      )}

      {/* Animated Loading Dots */}
      <div className="fade-in-up flex space-x-2" style={{ animationDelay: "0.4s" }}>
        <div className="w-3 h-3 bg-white rounded-full pulse-dot"></div>
        <div className="w-3 h-3 bg-aau-red rounded-full pulse-dot"></div>
        <div className="w-3 h-3 bg-white rounded-full pulse-dot"></div>
      </div>

      {/* Loading Text */}
      <div className="fade-in-up mt-4" style={{ animationDelay: "0.6s" }}>
        <p className="text-white/80 text-sm font-medium">Loading...</p>
      </div>
    </div>
  )
}
