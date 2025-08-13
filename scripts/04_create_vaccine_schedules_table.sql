-- Create vaccine schedules table (age-based schedule templates)
CREATE TABLE IF NOT EXISTS vaccine_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vaccine_id UUID NOT NULL REFERENCES vaccines(id) ON DELETE CASCADE,
    dose_number INTEGER NOT NULL,
    recommended_age_days INTEGER NOT NULL, -- Age in days when vaccine should be given
    age_range_start_days INTEGER, -- Minimum age for this dose
    age_range_end_days INTEGER, -- Maximum age for this dose
    dose_description VARCHAR(255), -- e.g., "First dose", "Booster"
    is_booster BOOLEAN DEFAULT FALSE,
    interval_from_previous_days INTEGER, -- Minimum days from previous dose
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(vaccine_id, dose_number)
);

-- Create indexes for schedule calculations
CREATE INDEX IF NOT EXISTS idx_vaccine_schedules_vaccine_id ON vaccine_schedules(vaccine_id);
CREATE INDEX IF NOT EXISTS idx_vaccine_schedules_age ON vaccine_schedules(recommended_age_days);
