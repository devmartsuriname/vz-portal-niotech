import { useState, useRef } from 'react';
import { toast } from 'sonner';

const FileUploader = ({ documentTypeId, onFilesSelected, maxFiles = 1, maxSizeMB = 5, acceptedFormats = ['pdf'] }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const validateFile = (file) => {
    const fileExt = file.name.split('.').pop().toLowerCase();
    
    if (!acceptedFormats.includes(fileExt)) {
      toast.error(`Bestandstype .${fileExt} is niet toegestaan. Gebruik: ${acceptedFormats.join(', ')}`);
      return false;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast.error(`Bestand is te groot. Maximale grootte: ${maxSizeMB}MB`);
      return false;
    }

    return true;
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > maxFiles) {
      toast.error(`U kunt maximaal ${maxFiles} bestand(en) uploaden`);
      return;
    }

    const validFiles = files.filter(validateFile);
    
    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      onFilesSelected(validFiles);
      toast.success(`${validFiles.length} bestand(en) geselecteerd`);
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="file-uploader">
      <div
        className="border border-dashed rounded p-4 text-center"
        style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
        onClick={handleBrowseClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept={acceptedFormats.map(f => `.${f}`).join(',')}
          multiple={maxFiles > 1}
          className="d-none"
        />
        
        <i className="bi bi-cloud-upload text-primary" style={{ fontSize: '2.5rem' }}></i>
        <p className="mb-2 mt-3">
          <strong>Klik om bestand(en) te selecteren</strong>
        </p>
        <p className="text-muted small mb-0">
          Toegestane formaten: {acceptedFormats.map(f => `.${f}`).join(', ')} • Max {maxSizeMB}MB
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-3">
          {selectedFiles.map((file, index) => (
            <div key={index} className="d-flex align-items-center justify-content-between p-3 bg-light rounded mb-2">
              <div className="d-flex align-items-center">
                <i className="bi bi-file-earmark-pdf text-danger me-3" style={{ fontSize: '1.5rem' }}></i>
                <div>
                  <div className="fw-medium">{file.name}</div>
                  <small className="text-muted">{formatBytes(file.size)}</small>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFile(index)}
                className="btn btn-sm btn-outline-danger"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
