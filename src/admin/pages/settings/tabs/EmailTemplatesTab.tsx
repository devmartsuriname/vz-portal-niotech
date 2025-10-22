import { useState } from "react";
import { useEmailTemplates } from "@/integrations/supabase/hooks/useEmailTemplates";
import type { EmailTemplate } from "@/integrations/supabase/hooks/useEmailTemplates";
import IconifyIcon from "@/admin/components/wrapper/IconifyIcon";

const EmailTemplatesTab = () => {
  const { templates, isLoading, createTemplate, updateTemplate, deleteTemplate, sendTestEmail } = useEmailTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState<Partial<EmailTemplate>>({});
  const [showTestEmailModal, setShowTestEmailModal] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleSelectTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditedTemplate(template);
    setIsEditing(false);
    setShowPreview(false);
  };

  const handleSave = async () => {
    if (!selectedTemplate) return;
    
    await updateTemplate.mutateAsync({
      id: selectedTemplate.id,
      ...editedTemplate,
    });
    
    setIsEditing(false);
    if (editedTemplate.name) {
      setSelectedTemplate({ ...selectedTemplate, ...editedTemplate } as EmailTemplate);
    }
  };

  const handleSendTestEmail = async () => {
    if (!selectedTemplate || !testEmailAddress) return;
    
    await sendTestEmail.mutateAsync({
      templateId: selectedTemplate.id,
      testEmail: testEmailAddress,
    });
    
    setShowTestEmailModal(false);
    setTestEmailAddress("");
  };

  const handleDelete = async (template: EmailTemplate) => {
    if (window.confirm(`Weet u zeker dat u template "${template.name}" wilt verwijderen?`)) {
      await deleteTemplate.mutateAsync(template.id);
      if (selectedTemplate?.id === template.id) {
        setSelectedTemplate(null);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Laden...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      {/* Template List (Left Sidebar) */}
      <div className="col-lg-4">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Email Templates</h5>
            <button 
              className="btn btn-sm btn-primary"
              onClick={() => {
                setSelectedTemplate(null);
                setEditedTemplate({
                  template_key: "",
                  name: "",
                  subject: "",
                  body_html: "",
                  body_text: "",
                  variables: [],
                  is_active: true,
                });
                setIsEditing(true);
              }}
            >
              <IconifyIcon icon="solar:add-circle-bold-duotone" className="me-1" />
              Nieuw
            </button>
          </div>
          <div className="card-body p-0">
            <div className="list-group list-group-flush">
              {templates?.map((template) => (
                <button
                  key={template.id}
                  className={`list-group-item list-group-item-action ${
                    selectedTemplate?.id === template.id ? "active" : ""
                  }`}
                  onClick={() => handleSelectTemplate(template)}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <strong className="d-block">{template.name}</strong>
                      <small className="text-muted d-block">{template.template_key}</small>
                    </div>
                    {!template.is_active && (
                      <span className="badge bg-secondary">Inactief</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card mt-3">
          <div className="card-body">
            <h6 className="mb-3">
              <IconifyIcon icon="solar:info-circle-bold-duotone" className="me-2" />
              Variabelen Syntax
            </h6>
            <p className="small text-muted mb-2">
              Gebruik dubbele accolades voor variabelen:
            </p>
            <code className="d-block p-2 bg-light rounded small mb-2">
              {`{{applicant_name}}`}
            </code>
            <p className="small text-muted mb-2">
              Voorwaardelijke secties:
            </p>
            <code className="d-block p-2 bg-light rounded small">
              {`{{#if notes}}...{{/if}}`}
            </code>
          </div>
        </div>
      </div>

      {/* Template Editor (Right Content) */}
      <div className="col-lg-8">
        {selectedTemplate || isEditing ? (
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                {isEditing 
                  ? (selectedTemplate ? "Bewerk Template" : "Nieuwe Template") 
                  : selectedTemplate?.name}
              </h5>
              <div className="btn-group">
                {!isEditing ? (
                  <>
                    <button 
                      className="btn btn-sm btn-light"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <IconifyIcon icon="solar:eye-bold-duotone" className="me-1" />
                      {showPreview ? "Editor" : "Preview"}
                    </button>
                    <button 
                      className="btn btn-sm btn-light"
                      onClick={() => setIsEditing(true)}
                    >
                      <IconifyIcon icon="solar:pen-2-bold-duotone" className="me-1" />
                      Bewerk
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => selectedTemplate && handleDelete(selectedTemplate)}
                    >
                      <IconifyIcon icon="solar:trash-bin-minimalistic-bold-duotone" />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="btn btn-sm btn-light"
                      onClick={() => {
                        setIsEditing(false);
                        if (!selectedTemplate) setSelectedTemplate(null);
                      }}
                    >
                      <IconifyIcon icon="solar:close-circle-bold-duotone" className="me-1" />
                      Annuleer
                    </button>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={handleSave}
                    >
                      <IconifyIcon icon="solar:check-circle-bold-duotone" className="me-1" />
                      Opslaan
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="card-body">
              {showPreview && !isEditing ? (
                <div>
                  <h6 className="mb-3">Email Preview</h6>
                  <div 
                    className="border rounded p-3 bg-light"
                    dangerouslySetInnerHTML={{ __html: selectedTemplate?.body_html || "" }}
                  />
                </div>
              ) : (
                <div>
                  {/* Template Key */}
                  <div className="mb-3">
                    <label className="form-label">Template Key <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={editedTemplate.template_key || ""}
                      onChange={(e) => setEditedTemplate({ ...editedTemplate, template_key: e.target.value })}
                      disabled={!isEditing || !!selectedTemplate}
                      placeholder="bijv. submission_confirmation"
                    />
                    <small className="text-muted">Unieke identifier voor deze template (kan niet worden gewijzigd)</small>
                  </div>

                  {/* Template Name */}
                  <div className="mb-3">
                    <label className="form-label">Naam <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={editedTemplate.name || ""}
                      onChange={(e) => setEditedTemplate({ ...editedTemplate, name: e.target.value })}
                      disabled={!isEditing}
                      placeholder="bijv. Aanvraag Bevestiging"
                    />
                  </div>

                  {/* Subject */}
                  <div className="mb-3">
                    <label className="form-label">Onderwerp <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      value={editedTemplate.subject || ""}
                      onChange={(e) => setEditedTemplate({ ...editedTemplate, subject: e.target.value })}
                      disabled={!isEditing}
                      placeholder="bijv. Bevestiging van uw aanvraag - {{application_type}}"
                    />
                  </div>

                  {/* HTML Body */}
                  <div className="mb-3">
                    <label className="form-label">Email Body (HTML) <span className="text-danger">*</span></label>
                    <textarea
                      className="form-control font-monospace"
                      rows={15}
                      value={editedTemplate.body_html || ""}
                      onChange={(e) => setEditedTemplate({ ...editedTemplate, body_html: e.target.value })}
                      disabled={!isEditing}
                      placeholder="HTML inhoud van de email..."
                    />
                  </div>

                  {/* Plain Text Body */}
                  <div className="mb-3">
                    <label className="form-label">Plain Text Body</label>
                    <textarea
                      className="form-control font-monospace"
                      rows={8}
                      value={editedTemplate.body_text || ""}
                      onChange={(e) => setEditedTemplate({ ...editedTemplate, body_text: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Plain text versie (optioneel)..."
                    />
                  </div>

                  {/* Variables */}
                  <div className="mb-3">
                    <label className="form-label">Beschikbare Variabelen</label>
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {(Array.isArray(editedTemplate.variables) ? editedTemplate.variables : []).map((variable) => (
                        <code key={variable} className="badge bg-secondary fs-6">
                          {`{{${variable}}}`}
                        </code>
                      ))}
                    </div>
                    {isEditing && (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Voeg variabelen toe, gescheiden door komma's (bijv. naam, email, datum)"
                        onChange={(e) => {
                          const vars = e.target.value.split(",").map(v => v.trim()).filter(Boolean);
                          setEditedTemplate({ ...editedTemplate, variables: vars });
                        }}
                      />
                    )}
                  </div>

                  {/* Status */}
                  <div className="mb-3">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="templateActive"
                        checked={editedTemplate.is_active ?? true}
                        onChange={(e) => setEditedTemplate({ ...editedTemplate, is_active: e.target.checked })}
                        disabled={!isEditing}
                      />
                      <label className="form-check-label" htmlFor="templateActive">
                        Template actief
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  {!isEditing && selectedTemplate && (
                    <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                      <button 
                        className="btn btn-outline-primary"
                        onClick={() => setShowTestEmailModal(true)}
                      >
                        <IconifyIcon icon="solar:letter-bold-duotone" className="me-2" />
                        Verstuur Test Email
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body text-center py-5">
              <IconifyIcon icon="solar:letter-opened-bold-duotone" className="fs-1 text-muted mb-3" />
              <p className="text-muted">Selecteer een template om te bekijken of bewerken</p>
            </div>
          </div>
        )}
      </div>

      {/* Test Email Modal */}
      {showTestEmailModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Verstuur Test Email</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowTestEmailModal(false)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Email Adres</label>
                  <input
                    type="email"
                    className="form-control"
                    value={testEmailAddress}
                    onChange={(e) => setTestEmailAddress(e.target.value)}
                    placeholder="test@example.com"
                  />
                  <small className="text-muted">
                    Test email wordt verzonden met placeholder data
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowTestEmailModal(false)}
                >
                  Annuleer
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleSendTestEmail}
                  disabled={!testEmailAddress || sendTestEmail.isPending}
                >
                  {sendTestEmail.isPending ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Verzenden...
                    </>
                  ) : (
                    <>
                      <IconifyIcon icon="solar:letter-bold-duotone" className="me-2" />
                      Verstuur
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplatesTab;
