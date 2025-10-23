const LoadingSkeleton = ({ type = 'card', count = 3 }) => {
  if (type === 'table') {
    return (
      <div className="loading-skeleton-table">
        {[...Array(count)].map((_, index) => (
          <div key={index} className="skeleton-row">
            <div className="skeleton-cell skeleton-text"></div>
            <div className="skeleton-cell skeleton-text skeleton-short"></div>
            <div className="skeleton-cell skeleton-badge"></div>
            <div className="skeleton-cell skeleton-button"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="loading-skeleton-grid">
        {[...Array(count)].map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-icon"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text skeleton-short"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="loading-skeleton-list">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="skeleton-item">
          <div className="skeleton-text"></div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
