export function PriceRangeBar({ selectedRange, setSelectedRange, priceOptions }) {
  const selectedOption = priceOptions.find(option => option.id === selectedRange)

  const progressMap = {
    low: "33%",
    medium: "66%",
    high: "100%",
  }

  // Map option index for slider
  const selectedIndex = priceOptions.findIndex(option => option.id === selectedRange)

  const handleSliderChange = e => {
    const newIndex = parseInt(e.target.value, 10)
    setSelectedRange(priceOptions[newIndex].id)
  }

  return (
    <div className="mb-4">
      {/* Heading */}
      <div className="mb-3">
        <h3 className="h5 fw-semibold text-dark mb-2">Select Price Range</h3>
        <p className="small text-muted mb-0">
          Current selection:{" "}
          <span className="fw-medium">{selectedOption?.range}</span>
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        {/* <div className="progress" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{
              width: progressMap[selectedRange],
              transition: "width 0.3s ease-out",
            }}
          />
        </div> */}

        {/* Price Slider */}
        <div className="mt-4">
          <input
            type="range"
            min="0"
            max={priceOptions.length - 1}
            step="1"
            value={selectedIndex}
            onChange={handleSliderChange}
            className="form-range"
          />
          <div className="d-flex justify-content-between mt-2">
            {priceOptions.map(option => (
              <div key={option.id} className="text-center small">
                <div className={`fw-medium ${selectedRange === option.id ? "text-primary" : ""}`}>
                  {option.label}
                </div>
                <div className="opacity-75">{option.range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
