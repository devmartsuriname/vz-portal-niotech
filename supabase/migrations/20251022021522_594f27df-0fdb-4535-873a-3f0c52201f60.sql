-- Create issued_permits table for public permit listings
CREATE TABLE public.issued_permits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) NOT NULL,
  agenda_number VARCHAR(20) NOT NULL,
  name TEXT NOT NULL,
  given_names TEXT NOT NULL,
  issued_date DATE,
  expires_at DATE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for search performance
CREATE INDEX idx_issued_permits_agenda ON issued_permits(agenda_number);
CREATE INDEX idx_issued_permits_name ON issued_permits(name);
CREATE INDEX idx_issued_permits_given_names ON issued_permits(given_names);
CREATE INDEX idx_issued_permits_status ON issued_permits(status);

-- Full-text search index
CREATE INDEX idx_issued_permits_search ON issued_permits 
  USING gin(to_tsvector('dutch', name || ' ' || given_names));

-- Enable RLS
ALTER TABLE issued_permits ENABLE ROW LEVEL SECURITY;

-- Allow public to view active permits
CREATE POLICY "Anyone can view active permits"
ON issued_permits FOR SELECT
USING (status = 'active');

-- Admin-only access for management
CREATE POLICY "Admins can manage all permits"
ON issued_permits FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_issued_permits_updated_at
BEFORE UPDATE ON issued_permits
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Seed sample data for testing
INSERT INTO issued_permits (code, agenda_number, name, given_names, issued_date)
VALUES
  ('VVA', '18/0016', 'CRESPO CATA', 'ANGEL FELIX', '2018-01-15'),
  ('VVA', '18/0014', 'RODRIGUEZ PERALTA', 'ROSSY MARIBEL', '2018-01-12'),
  ('VVA', '18/0011', 'JOHNKEREL ERRATE', 'JOSE ANTONIO', '2018-01-08'),
  ('VVA', '19/0234', 'SILVA SANTOS', 'MARIA ELENA', '2019-03-22'),
  ('VVA', '19/0189', 'GONZALEZ LOPEZ', 'CARLOS ALBERTO', '2019-02-14'),
  ('VVA', '20/0456', 'MARTINEZ DIAZ', 'PEDRO JOSE', '2020-05-18'),
  ('VVA', '20/0398', 'FERNANDEZ RUIZ', 'ANA LUCIA', '2020-04-23'),
  ('VVA', '21/0567', 'GARCIA MORENO', 'LUIS FERNANDO', '2021-06-10'),
  ('VVA', '21/0489', 'RAMIREZ CASTRO', 'SOFIA ISABEL', '2021-05-07'),
  ('VVA', '22/0678', 'TORRES MENDEZ', 'MIGUEL ANGEL', '2022-07-15'),
  ('VVA', '22/0612', 'SANCHEZ ORTIZ', 'CARMEN ROSA', '2022-06-20'),
  ('VVA', '23/0789', 'LOPEZ VARGAS', 'JUAN CARLOS', '2023-08-12'),
  ('VVA', '23/0723', 'HERNANDEZ CRUZ', 'LAURA PATRICIA', '2023-07-25'),
  ('VVA', '24/0890', 'GOMEZ REYES', 'ROBERTO DANIEL', '2024-09-08'),
  ('VVA', '24/0834', 'JIMENEZ FLORES', 'GABRIELA MARIA', '2024-08-18'),
  ('VTB', '19/0045', 'VAN DER BERG', 'HENDRIK PIETER', '2019-01-20'),
  ('VTB', '20/0156', 'DE JONG', 'SANDRA LOUISE', '2020-03-15'),
  ('VTB', '21/0267', 'BAKKER', 'THOMAS JOHANNES', '2021-04-22'),
  ('VTB', '22/0378', 'VISSER', 'EMMA CHRISTINE', '2022-05-30'),
  ('VTB', '23/0489', 'SMIT', 'DAVID ALEXANDER', '2023-06-14');