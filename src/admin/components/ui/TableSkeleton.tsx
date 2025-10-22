interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton = ({ rows = 5, columns = 5 }: TableSkeletonProps) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i}>
                <div className="placeholder-glow">
                  <span className="placeholder col-8"></span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex}>
                  <div className="placeholder-glow">
                    <span className="placeholder col-10"></span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
