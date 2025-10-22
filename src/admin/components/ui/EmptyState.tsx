interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = ({ icon = 'bx bx-package', title, description, action }: EmptyStateProps) => {
  return (
    <div className="text-center py-5">
      <div className="mb-4">
        <i className={`${icon} display-1 text-muted`}></i>
      </div>
      <h4 className="mb-2">{title}</h4>
      {description && <p className="text-muted mb-4">{description}</p>}
      {action && (
        <button className="btn btn-primary" onClick={action.onClick}>
          <i className="bx bx-plus me-2"></i>
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
