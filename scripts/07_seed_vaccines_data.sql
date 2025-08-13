-- Seed basic vaccine data (Indian immunization schedule)
INSERT INTO vaccines (name, short_name, description, vaccine_type, route_of_administration, importance_info, is_mandatory) VALUES
('Bacillus Calmette-Guérin', 'BCG', 'Protects against tuberculosis', 'live', 'intradermal', 'Essential for protection against TB, especially important in high TB burden countries like India', true),
('Hepatitis B', 'Hep B', 'Protects against Hepatitis B virus infection', 'inactivated', 'intramuscular', 'Prevents chronic liver disease and liver cancer caused by Hepatitis B virus', true),
('Oral Polio Vaccine', 'OPV', 'Protects against poliomyelitis', 'live', 'oral', 'Critical for polio eradication. India has been polio-free since 2014', true),
('Diphtheria, Pertussis, Tetanus', 'DPT', 'Protects against diphtheria, whooping cough, and tetanus', 'inactivated', 'intramuscular', 'Prevents three serious bacterial infections that can be life-threatening in children', true),
('Haemophilus influenzae type b', 'Hib', 'Protects against Hib bacteria', 'inactivated', 'intramuscular', 'Prevents serious infections like meningitis and pneumonia caused by Hib bacteria', true),
('Pneumococcal Conjugate Vaccine', 'PCV', 'Protects against pneumococcal infections', 'inactivated', 'intramuscular', 'Prevents pneumonia, meningitis, and other serious infections caused by pneumococcus bacteria', true),
('Rotavirus', 'RV', 'Protects against rotavirus gastroenteritis', 'live', 'oral', 'Prevents severe diarrhea and dehydration caused by rotavirus, leading cause of childhood diarrhea', true),
('Measles, Mumps, Rubella', 'MMR', 'Protects against measles, mumps, and rubella', 'live', 'intramuscular', 'Prevents three viral infections that can cause serious complications including brain damage', true),
('Japanese Encephalitis', 'JE', 'Protects against Japanese Encephalitis virus', 'inactivated', 'intramuscular', 'Prevents brain infection caused by JE virus, endemic in many parts of Asia', true),
('Varicella', 'Chickenpox', 'Protects against chickenpox', 'live', 'intramuscular', 'Prevents chickenpox and reduces risk of shingles later in life', false),
('Hepatitis A', 'Hep A', 'Protects against Hepatitis A virus', 'inactivated', 'intramuscular', 'Prevents liver infection caused by Hepatitis A virus, spread through contaminated food/water', false),
('Typhoid', 'Typhoid', 'Protects against typhoid fever', 'inactivated', 'intramuscular', 'Prevents typhoid fever caused by Salmonella typhi bacteria', false);
