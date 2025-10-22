interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = 'Bevestigen',
  cancelText = 'Annuleren',
  variant = 'danger',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal show d-block" tabIndex={-1} role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">{message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                {cancelText}
              </button>
              <button type="button" className={`btn btn-${variant}`} onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
};

export default ConfirmDialog;
