import { Star } from "lucide-react"



export function StarRating({ rating, maxRating = 5, size = "md", showValue = false, className }) {
  const clampedRating = Math.max(0, Math.min(rating, maxRating))

  // Size variants using Bootstrap-compatible sizing
  const sizeClasses = {
    sm: { width: "16px", height: "16px" },
    md: { width: "20px", height: "20px" },
    lg: { width: "24px", height: "24px" },
  }

  const textSizeClasses = {
    sm: "small",
    md: "",
    lg: "fs-5",
  }

  return (
    <div className={`d-flex align-items-center ${className || ""}`} style={{ gap: "4px" }}>
      <div className="d-flex align-items-center">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= clampedRating
          const isPartial = starValue > clampedRating && starValue - 1 < clampedRating
          const partialFill = isPartial ? (clampedRating % 1) * 100 : 0

          return (
            <div key={index} className="position-relative">
              {isPartial ? (
                <>
                  {/* Background star (empty) */}
                  <Star style={sizeClasses[size]} className="text-muted" />
                  {/* Foreground star (partial fill) */}
                  <div
                    className="position-absolute top-0 start-0 overflow-hidden"
                    style={{ width: `${partialFill}%`, height: "100%" }}
                  >
                    <Star style={sizeClasses[size]} className="text-warning" fill="currentColor" />
                  </div>
                </>
              ) : (
                <Star
                  style={sizeClasses[size]}
                  className={isFilled ? "text-warning" : "text-muted"}
                  fill={isFilled ? "currentColor" : "none"}
                />
              )}
            </div>
          )
        })}
      </div>

      {showValue && (
        <span className={`fw-medium text-muted ms-1 ${textSizeClasses[size]}`}>{clampedRating.toFixed(1)}</span>
      )}
    </div>
  )
}
