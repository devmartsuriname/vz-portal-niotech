import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface DocumentPreviewModalProps {
  show: boolean;
  onHide: () => void;
  fileId: string;
  fileName: string;
  filePath: string;
  mimeType: string;
}

const DocumentPreviewModal = ({ 
  show, 
  onHide, 
  fileId, 
  fileName, 
  filePath, 
  mimeType 
}: DocumentPreviewModalProps) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && filePath) {
      loadFileUrl();
    }

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [show, filePath]);

  const loadFileUrl = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('submission-files')
        .download(filePath);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      setFileUrl(url);
    } catch (error: any) {
      toast.error('Fout bij het laden van document: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!fileUrl) return;

    try {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Document wordt gedownload');
    } catch (error: any) {
      toast.error('Fout bij het downloaden: ' + error.message);
    }
  };

  const renderPreview = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Laden...</span>
          </div>
          <p className="mt-3 text-muted">Document laden...</p>
        </div>
      );
    }

    if (!fileUrl) {
      return (
        <div className="alert alert-warning">
          Kan document niet laden
        </div>
      );
    }

    // Preview based on mime type
    if (mimeType.startsWith('image/')) {
      return (
        <div className="text-center">
          <img 
            src={fileUrl} 
            alt={fileName} 
            className="img-fluid"
            style={{ maxHeight: '70vh' }}
          />
        </div>
      );
    }

    if (mimeType === 'application/pdf') {
      return (
        <iframe
          src={fileUrl}
          title={fileName}
          className="w-100"
          style={{ height: '70vh', border: 'none' }}
        />
      );
    }

    // For other file types, show download option
    return (
      <div className="text-center py-5">
        <i className="bx bx-file fs-1 text-muted mb-3"></i>
        <p className="text-muted">
          Preview niet beschikbaar voor dit bestandstype
        </p>
        <button 
          className="btn btn-primary mt-3"
          onClick={handleDownload}
        >
          <i className="bx bx-download me-2"></i>
          Download Document
        </button>
      </div>
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{fileName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderPreview()}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Sluiten
        </button>
        {fileUrl && (
          <button className="btn btn-primary" onClick={handleDownload}>
            <i className="bx bx-download me-2"></i>
            Download
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentPreviewModal;
