import { ServicesSection as ServicesSectionType } from '@/types/pageBuilder';
import servicesData from '@/Data/services.json';

interface ServicesSectionProps {
  section: ServicesSectionType;
}

const ServicesSection = ({ section }: ServicesSectionProps) => {
  const { 
    title = 'Onze Diensten', 
    description, 
    displayStyle = 'cards' 
  } = section.props;

  return (
    <section className="services-section py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {description && <p className="lead text-muted">{description}</p>}
        </div>
        
        {displayStyle === 'cards' ? (
          <div className="row g-4">
            {servicesData.map((service) => (
              <div key={service.id} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm hover-lift">
                  <div className="card-body text-center">
                    <i className={`${service.icon} display-4 text-primary mb-3`}></i>
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text text-muted">{service.description}</p>
                    <a href={service.link} className="btn btn-outline-primary btn-sm">
                      Meer Info
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="list-group">
                {servicesData.map((service) => (
                  <a 
                    key={service.id}
                    href={service.link} 
                    className="list-group-item list-group-item-action"
                  >
                    <div className="d-flex align-items-center">
                      <i className={`${service.icon} fs-3 text-primary me-3`}></i>
                      <div className="flex-grow-1">
                        <h5 className="mb-1">{service.title}</h5>
                        <p className="mb-0 text-muted">{service.description}</p>
                      </div>
                      <i className="bx bx-right-arrow-alt text-muted"></i>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
