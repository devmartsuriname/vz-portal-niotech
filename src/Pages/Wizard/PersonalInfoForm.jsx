import { useState } from 'react';
import { toast } from 'sonner';

const PersonalInfoForm = ({ onComplete, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    dateOfBirth: initialData.dateOfBirth || '',
    address: initialData.address || '',
    city: initialData.city || '',
    postalCode: initialData.postalCode || ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Naam is verplicht';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail is verplicht';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ongeldig e-mailadres';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefoonnummer is verplicht';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Geboortedatum is verplicht';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Adres is verplicht';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Stad is verplicht';
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postcode is verplicht';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onComplete(formData);
      toast.success('Persoonlijke gegevens opgeslagen');
    } else {
      toast.error('Vul alle verplichte velden correct in');
    }
  };

  return (
    <div className="personal-info-form">
      <h3 className="mb-4 text-primary">Persoonlijke Gegevens</h3>
      <p className="text-muted mb-4">
        Vul uw persoonlijke gegevens in. Deze informatie wordt gebruikt voor uw aanvraag.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">
              Volledige Naam <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Bijv. Jan Jansen"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">
              E-mailadres <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="voorbeeld@email.com"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Telefoonnummer <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              placeholder="+597 123 4567"
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Geboortedatum <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
            />
            {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth}</div>}
          </div>

          <div className="col-12">
            <label className="form-label">
              Adres <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              placeholder="Straatnaam en huisnummer"
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Stad <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`form-control ${errors.city ? 'is-invalid' : ''}`}
              placeholder="Bijv. Paramaribo"
            />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Postcode <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
              placeholder="1234 AB"
            />
            {errors.postalCode && <div className="invalid-feedback">{errors.postalCode}</div>}
          </div>
        </div>

        <div className="alert alert-info mt-4">
          <i className="bx bx-info-circle me-2"></i>
          Uw gegevens worden veilig opgeslagen en alleen gebruikt voor deze aanvraag.
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">
          Doorgaan naar Overzicht
          <i className="bx bx-right-arrow-alt ms-2"></i>
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
