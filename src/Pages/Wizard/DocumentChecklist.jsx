import { useState } from 'react';
import FileUploader from './FileUploader';
import { toast } from 'sonner';

const DocumentChecklist = ({ requiredDocuments, onComplete }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (documentTypeId, files) => {
    const newFiles = files.map(file => ({
      ...file,
      documentTypeId
    }));
    
    setUploadedFiles(prev => [
      ...prev.filter(f => f.documentTypeId !== documentTypeId),
      ...newFiles
    ]);
  };

  const handleContinue = () => {
    const mandatoryDocs = requiredDocuments.filter(doc => doc.is_mandatory);
    const uploadedDocTypes = [...new Set(uploadedFiles.map(f => f.documentTypeId))];
    
    const missingDocs = mandatoryDocs.filter(
      doc => !uploadedDocTypes.includes(doc.document_type_id)
    );

    if (missingDocs.length > 0) {
      toast.error('Upload alle verplichte documenten voordat u doorgaat');
      return;
    }

    onComplete(uploadedFiles);
  };

  if (!requiredDocuments || requiredDocuments.length === 0) {
    console.log('No documents required, showing continue button');
    return (
      <div className="text-center py-5">
        <i className="bx bx-check-circle text-success" style={{ fontSize: '3rem' }}></i>
        <h4 className="mt-3">Geen documenten vereist</h4>
        <p className="text-muted">Voor deze aanvraag zijn geen documenten nodig. Klik op doorgaan om verder te gaan met uw persoonlijke gegevens.</p>
        <button 
          onClick={() => {
            console.log('Continue button clicked, calling onComplete with empty array');
            onComplete([]);
          }} 
          className="btn btn-primary btn-lg mt-3"
        >
          Doorgaan naar Persoonlijke Gegevens
          <i className="bx bx-right-arrow-alt ms-2"></i>
        </button>
      </div>
    );
  }

  return (
    <div className="document-checklist">
      <h3 className="mb-4 text-primary">Benodigde Documenten</h3>
      <p className="text-muted mb-4">
        Upload de volgende documenten om uw aanvraag te voltooien. Documenten met een <span className="text-danger">*</span> zijn verplicht.
      </p>

      <div className="row g-4">
        {requiredDocuments.map((doc) => (
          <div key={doc.document_type_id} className="col-12">
            <div className="card border">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="mb-1">
                      {doc.document_type_name || 'Document'}
                      {doc.is_mandatory && <span className="text-danger ms-1">*</span>}
                    </h5>
                    {doc.description && (
                      <p className="text-muted small mb-0">{doc.description}</p>
                    )}
                  </div>
                  {uploadedFiles.some(f => f.documentTypeId === doc.document_type_id) && (
                    <span className="badge bg-success">
                      <i className="bx bx-check-circle me-1"></i>
                      Geüpload
                    </span>
                  )}
                </div>

                <FileUploader
                  documentTypeId={doc.document_type_id}
                  onFilesSelected={(files) => handleFileUpload(doc.document_type_id, files)}
                  maxFiles={1}
                  maxSizeMB={5}
                  acceptedFormats={doc.allowed_formats || ['pdf', 'jpg', 'png']}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-light rounded">
        <h6>Uploadstatus</h6>
        <p className="mb-2">
          <strong>{uploadedFiles.length}</strong> van <strong>{requiredDocuments.length}</strong> documenten geüpload
        </p>
        <div className="progress" style={{ height: '8px' }}>
          <div
            className="progress-bar bg-success"
            style={{ width: `${(uploadedFiles.length / requiredDocuments.length) * 100}%` }}
          />
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="btn btn-primary btn-lg w-100 mt-4"
      >
        Doorgaan naar Persoonlijke Gegevens
        <i className="bx bx-right-arrow-alt ms-2"></i>
      </button>
    </div>
  );
};

export default DocumentChecklist;
