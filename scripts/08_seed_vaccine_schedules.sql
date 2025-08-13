-- Seed vaccine schedule data (Indian immunization schedule)
INSERT INTO vaccine_schedules (vaccine_id, dose_number, recommended_age_days, age_range_start_days, age_range_end_days, dose_description) VALUES
-- BCG (at birth)
((SELECT id FROM vaccines WHERE short_name = 'BCG'), 1, 0, 0, 365, 'Birth dose'),

-- Hepatitis B (birth, 6 weeks, 14 weeks)
((SELECT id FROM vaccines WHERE short_name = 'Hep B'), 1, 0, 0, 7, 'Birth dose'),
((SELECT id FROM vaccines WHERE short_name = 'Hep B'), 2, 42, 35, 70, 'Second dose'),
((SELECT id FROM vaccines WHERE short_name = 'Hep B'), 3, 98, 91, 126, 'Third dose'),

-- OPV (birth, 6 weeks, 10 weeks, 14 weeks, 16-24 months)
((SELECT id FROM vaccines WHERE short_name = 'OPV'), 1, 0, 0, 14, 'Birth dose'),
((SELECT id FROM vaccines WHERE short_name = 'OPV'), 2, 42, 35, 56, 'First dose'),
((SELECT id FROM vaccines WHERE short_name = 'OPV'), 3, 70, 63, 84, 'Second dose'),
((SELECT id FROM vaccines WHERE short_name = 'OPV'), 4, 98, 91, 112, 'Third dose'),
((SELECT id FROM vaccines WHERE short_name = 'OPV'), 5, 547, 487, 730, 'Booster'),

-- DPT (6 weeks, 10 weeks, 14 weeks, 16-24 months, 5-6 years)
((SELECT id FROM vaccines WHERE short_name = 'DPT'), 1, 42, 35, 56, 'First dose'),
((SELECT id FROM vaccines WHERE short_name = 'DPT'), 2, 70, 63, 84, 'Second dose'),
((SELECT id FROM vaccines WHERE short_name = 'DPT'), 3, 98, 91, 112, 'Third dose'),
((SELECT id FROM vaccines WHERE short_name = 'DPT'), 4, 547, 487, 730, 'First booster'),
((SELECT id FROM vaccines WHERE short_name = 'DPT'), 5, 1825, 1642, 2190, 'Second booster'),

-- MMR (9-12 months, 16-24 months)
((SELECT id FROM vaccines WHERE short_name = 'MMR'), 1, 274, 243, 365, 'First dose'),
((SELECT id FROM vaccines WHERE short_name = 'MMR'), 2, 547, 487, 730, 'Second dose'),

-- JE (9-12 months, 16-24 months)
((SELECT id FROM vaccines WHERE short_name = 'JE'), 1, 274, 243, 365, 'First dose'),
((SELECT id FROM vaccines WHERE short_name = 'JE'), 2, 547, 487, 730, 'Second dose');
