import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  eventKey: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ title, children, isOpen, onToggle }: AccordionItemProps) => {
  return (
    <div className={cn("accordion-item mb-3", isOpen && "active")}>
      <h5 className="accordion-header">
        <button
          className="accordion-button collapsed w-full text-left"
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          {title}
        </button>
      </h5>
      <div className={cn("accordion-collapse collapse", isOpen && "show")}>
        <div className="accordion-body">
          {children}
        </div>
      </div>
    </div>
  );
};

interface NativeAccordionProps {
  defaultActiveKey?: string;
  children: React.ReactNode;
}

const NativeAccordion = ({ defaultActiveKey, children }: NativeAccordionProps) => {
  const [openKey, setOpenKey] = useState(defaultActiveKey || '');

  const handleToggle = (eventKey: string) => {
    setOpenKey(openKey === eventKey ? '' : eventKey);
  };

  // Clone children and inject props
  const items = Array.isArray(children) ? children : [children];
  
  return (
    <div className="accordion">
      {items.map((child: any, index) => {
        if (!child?.props) return null;
        return (
          <AccordionItem
            key={child.props.eventKey || index}
            eventKey={child.props.eventKey}
            title={child.props.title}
            isOpen={openKey === child.props.eventKey}
            onToggle={() => handleToggle(child.props.eventKey)}
          >
            {child.props.children}
          </AccordionItem>
        );
      })}
    </div>
  );
};

// Helper component for creating accordion items
interface NativeAccordionItemProps {
  eventKey: string;
  title: string;
  children: React.ReactNode;
}

NativeAccordion.Item = ({ eventKey, title, children }: NativeAccordionItemProps) => {
  // This is just a placeholder that gets processed by the parent
  return null;
};

export { NativeAccordion };
