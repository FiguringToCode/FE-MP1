

export function PriceRangeBar({selectedRange, setSelectedRange, priceOptions}) {

  const selectedOption = priceOptions.find(option => option.id === selectedRange)

  const progressMap = {
    low: "33%",
    medium: "66%",
    high: "100%",
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
        <div className="progress" style={{ height: "8px" }}>
          <div
            className="progress-bar bg-primary"
            role="progressbar"
            style={{
              width: progressMap[selectedRange],
              transition: "width 0.3s ease-out",
            }}
          />
        </div>

        {/* Buttons */}
        <div className="row mt-4 g-2">
          {priceOptions.map(option => (
            <div key={option.id} className="col-4">
              <button
                onClick={() => setSelectedRange(option.id)}
                className={`btn w-100 p-3 text-center position-relative ${
                  selectedRange === option.id ? "btn-primary" : "btn-outline-secondary"
                }`}
                style={{ height: "150px" }}
              >

                <div>
                  <div className="fw-medium small">{option.label}</div>
                  <div className="small opacity-75">{option.description}</div>
                  <div className="small font-monospace mt-1">{option.range}</div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Selected info */}
      {/* <div className="alert alert-light border">
        <div className="d-flex justify-content-between align-items-center">
          <span className="small text-muted">Selected Range:</span>
          <span className="fw-semibold text-dark">
            {selectedOption?.label} ({selectedOption?.range})
          </span>
        </div>
      </div> */}
    </div>
  )
}
