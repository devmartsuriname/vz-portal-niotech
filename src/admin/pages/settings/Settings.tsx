import { useState } from 'react';
import PageTitle from '@/admin/components/PageTitle';
import ResendAPITab from './tabs/ResendAPITab';
import GeneralSettingsTab from './tabs/GeneralSettingsTab';
import DocumentSettingsTab from './tabs/DocumentSettingsTab';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'documents'>('general');

  return (
    <div className="container-fluid">
      <PageTitle subName="Admin" title="Systeem Instellingen" />

      <div className="card">
        <div className="card-body">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                <i className="bx bx-cog me-2"></i>
                Algemeen
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'email' ? 'active' : ''}`}
                onClick={() => setActiveTab('email')}
              >
                <i className="bx bx-envelope me-2"></i>
                Email (Resend API)
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
                onClick={() => setActiveTab('documents')}
              >
                <i className="bx bx-file me-2"></i>
                Documenten
              </button>
            </li>
          </ul>

          {activeTab === 'general' && <GeneralSettingsTab />}
          {activeTab === 'email' && <ResendAPITab />}
          {activeTab === 'documents' && <DocumentSettingsTab />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
