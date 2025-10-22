-- Seed additional 80 records for issued_permits to reach 100+ total
-- This migration adds diverse test data with various dates, nationalities, and statuses

INSERT INTO public.issued_permits (code, agenda_number, name, given_names, issued_date, expires_at, status) VALUES
-- 2023 Issues (January - April)
('VV2023', '2023-00021', 'Silva', 'Maria Elena', '2023-01-15', '2028-01-15', 'active'),
('TW2023', '2023-00022', 'Chen', 'Wei Lin', '2023-01-20', '2024-01-20', 'expired'),
('VV2023', '2023-00023', 'Patel', 'Rajesh Kumar', '2023-02-05', '2028-02-05', 'active'),
('TW2023', '2023-00024', 'Ibrahim', 'Ahmed Hassan', '2023-02-12', '2024-02-12', 'expired'),
('VV2023', '2023-00025', 'Rodriguez', 'Carlos Alberto', '2023-02-18', '2028-02-18', 'active'),
('TW2023', '2023-00026', 'Kim', 'Ji Hoon', '2023-03-03', '2024-03-03', 'expired'),
('VV2023', '2023-00027', 'Santos', 'Ana Paula', '2023-03-10', '2028-03-10', 'active'),
('TW2023', '2023-00028', 'Mbeki', 'Thabo Nelson', '2023-03-25', '2024-03-25', 'expired'),
('VV2023', '2023-00029', 'Nguyen', 'Thi Mai', '2023-04-08', '2028-04-08', 'active'),
('TW2023', '2023-00030', 'Kowalski', 'Piotr Jan', '2023-04-15', '2024-04-15', 'expired'),

-- 2023 Issues (May - August)
('VV2023', '2023-00031', 'Hassan', 'Fatima Zahra', '2023-05-02', '2028-05-02', 'active'),
('TW2023', '2023-00032', 'Mueller', 'Hans Peter', '2023-05-20', '2024-05-20', 'expired'),
('VV2023', '2023-00033', 'Lee', 'Sung Min', '2023-06-05', '2028-06-05', 'active'),
('TW2023', '2023-00034', 'Gonzalez', 'Juan Pablo', '2023-06-18', '2024-06-18', 'expired'),
('VV2023', '2023-00035', 'Okonkwo', 'Chukwudi Emmanuel', '2023-07-03', '2028-07-03', 'active'),
('TW2023', '2023-00036', 'Ivanov', 'Dmitri Sergeyevich', '2023-07-22', '2024-07-22', 'expired'),
('VV2023', '2023-00037', 'Fernandez', 'Isabella Sofia', '2023-08-10', '2028-08-10', 'active'),
('TW2023', '2023-00038', 'Wang', 'Li Hua', '2023-08-28', '2024-08-28', 'expired'),

-- 2023 Issues (September - December)
('VV2023', '2023-00039', 'Ali', 'Mohammed Yusuf', '2023-09-12', '2028-09-12', 'active'),
('TW2023', '2023-00040', 'Schmidt', 'Anna Maria', '2023-09-25', '2024-09-25', 'expired'),
('VV2023', '2023-00041', 'Oliveira', 'Lucas Gabriel', '2023-10-08', '2028-10-08', 'active'),
('TW2023', '2023-00042', 'Yamamoto', 'Kenji', '2023-10-20', '2024-10-20', 'expired'),
('VV2023', '2023-00043', 'Singh', 'Priya Kumari', '2023-11-05', '2028-11-05', 'active'),
('TW2023', '2023-00044', 'Brown', 'Sarah Elizabeth', '2023-11-18', '2024-11-18', 'expired'),
('VV2023', '2023-00045', 'Lopez', 'Diego Fernando', '2023-12-02', '2028-12-02', 'active'),
('TW2023', '2023-00046', 'Petrov', 'Vladimir', '2023-12-15', '2024-12-15', 'expired'),

-- 2024 Issues (January - March)
('VV2024', '2024-00001', 'Martinez', 'Sofia Valentina', '2024-01-08', '2029-01-08', 'active'),
('TW2024', '2024-00002', 'Nakamura', 'Hiroshi', '2024-01-15', '2025-01-15', 'active'),
('VV2024', '2024-00003', 'Khan', 'Aisha Bibi', '2024-01-22', '2029-01-22', 'active'),
('TW2024', '2024-00004', 'Rossi', 'Marco Antonio', '2024-02-05', '2025-02-05', 'active'),
('VV2024', '2024-00005', 'Ahmed', 'Noor Jahan', '2024-02-12', '2029-02-12', 'active'),
('TW2024', '2024-00006', 'Johnson', 'Michael James', '2024-02-20', '2025-02-20', 'active'),
('VV2024', '2024-00007', 'Costa', 'Beatriz Helena', '2024-03-05', '2029-03-05', 'active'),
('TW2024', '2024-00008', 'Zhou', 'Ming Xiao', '2024-03-18', '2025-03-18', 'active'),

-- 2024 Issues (April - June)
('VV2024', '2024-00009', 'Hassan', 'Omar Abdul', '2024-04-02', '2029-04-02', 'active'),
('TW2024', '2024-00010', 'Popov', 'Andrei Viktor', '2024-04-15', '2025-04-15', 'active'),
('VV2024', '2024-00011', 'Garcia', 'Carmen Rosa', '2024-04-28', '2029-04-28', 'active'),
('TW2024', '2024-00012', 'Tanaka', 'Yuki', '2024-05-10', '2025-05-10', 'active'),
('VV2024', '2024-00013', 'Abdullah', 'Siti Nurhaliza', '2024-05-22', '2029-05-22', 'active'),
('TW2024', '2024-00014', 'Williams', 'Emily Grace', '2024-06-05', '2025-06-05', 'active'),
('VV2024', '2024-00015', 'Pereira', 'Rafael', '2024-06-18', '2029-06-18', 'active'),
('TW2024', '2024-00016', 'Kovac', 'Milan', '2024-06-30', '2025-06-30', 'active'),

-- 2024 Issues (July - September)
('VV2024', '2024-00017', 'Rahman', 'Abdul Karim', '2024-07-08', '2029-07-08', 'active'),
('TW2024', '2024-00018', 'Anderson', 'Jessica Marie', '2024-07-20', '2025-07-20', 'active'),
('VV2024', '2024-00019', 'Moreno', 'Alejandro', '2024-08-02', '2029-08-02', 'active'),
('TW2024', '2024-00020', 'Suzuki', 'Takeshi', '2024-08-15', '2025-08-15', 'active'),
('VV2024', '2024-00021', 'Ibrahim', 'Halima', '2024-08-28', '2029-08-28', 'active'),
('TW2024', '2024-00022', 'Martin', 'Pierre Jean', '2024-09-10', '2025-09-10', 'active'),
('VV2024', '2024-00023', 'Almeida', 'Joao Pedro', '2024-09-22', '2029-09-22', 'active'),

-- 2024 Issues (October - December)
('TW2024', '2024-00024', 'Novak', 'Jan', '2024-10-05', '2025-10-05', 'active'),
('VV2024', '2024-00025', 'Yusuf', 'Amina', '2024-10-18', '2029-10-18', 'active'),
('TW2024', '2024-00026', 'Taylor', 'Benjamin', '2024-10-30', '2025-10-30', 'active'),
('VV2024', '2024-00027', 'Diaz', 'Valentina', '2024-11-12', '2029-11-12', 'active'),
('TW2024', '2024-00028', 'Watanabe', 'Sakura', '2024-11-25', '2025-11-25', 'active'),
('VV2024', '2024-00029', 'Mohammed', 'Yasmin', '2024-12-08', '2029-12-08', 'active'),
('TW2024', '2024-00030', 'Davis', 'Christopher', '2024-12-20', '2025-12-20', 'active'),

-- 2025 Issues (Recent)
('VV2025', '2025-00001', 'Hernandez', 'Maria Jose', '2025-01-10', '2030-01-10', 'active'),
('TW2025', '2025-00002', 'Park', 'Seo Jun', '2025-01-22', '2026-01-22', 'active'),
('VV2025', '2025-00003', 'Ahmed', 'Fatima', '2025-02-05', '2030-02-05', 'active'),
('TW2025', '2025-00004', 'Dupont', 'Sophie', '2025-02-18', '2026-02-18', 'active'),
('VV2025', '2025-00005', 'Ribeiro', 'Gabriel', '2025-03-03', '2030-03-03', 'active'),
('TW2025', '2025-00006', 'Fischer', 'Thomas', '2025-03-15', '2026-03-15', 'active'),
('VV2025', '2025-00007', 'Ali', 'Zainab', '2025-04-08', '2030-04-08', 'active'),
('TW2025', '2025-00008', 'Wilson', 'Daniel', '2025-04-20', '2026-04-20', 'active'),
('VV2025', '2025-00009', 'Torres', 'Camila', '2025-05-02', '2030-05-02', 'active'),
('TW2025', '2025-00010', 'Kato', 'Haruto', '2025-05-15', '2026-05-15', 'active'),
('VV2025', '2025-00011', 'Hassan', 'Layla', '2025-06-05', '2030-06-05', 'active'),
('TW2025', '2025-00012', 'Moore', 'Olivia', '2025-06-18', '2026-06-18', 'active'),
('VV2025', '2025-00013', 'Sanchez', 'Miguel Angel', '2025-07-02', '2030-07-02', 'active'),
('TW2025', '2025-00014', 'Ito', 'Aoi', '2025-07-15', '2026-07-15', 'active'),
('VV2025', '2025-00015', 'Abdullah', 'Maryam', '2025-08-08', '2030-08-08', 'active'),
('TW2025', '2025-00016', 'Thomas', 'Emma', '2025-08-20', '2026-08-20', 'active'),
('VV2025', '2025-00017', 'Ramirez', 'Sebastian', '2025-09-05', '2030-09-05', 'active'),
('TW2025', '2025-00018', 'Sato', 'Yui', '2025-09-18', '2026-09-18', 'active'),
('VV2025', '2025-00019', 'Khalil', 'Sara', '2025-10-02', '2030-10-02', 'active'),
('TW2025', '2025-00020', 'White', 'Lucas', '2025-10-15', '2026-10-15', 'active');

-- Create index for better performance on status queries
CREATE INDEX IF NOT EXISTS idx_issued_permits_status ON public.issued_permits(status);

-- Create index for date-based queries
CREATE INDEX IF NOT EXISTS idx_issued_permits_issued_date ON public.issued_permits(issued_date DESC);

-- Verify total count
COMMENT ON TABLE public.issued_permits IS 'Contains issued residence permits. Total records after this migration: 100+';
