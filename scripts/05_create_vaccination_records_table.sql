-- Create vaccination records table (actual vaccinations given)
CREATE TABLE IF NOT EXISTS vaccination_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    vaccine_id UUID NOT NULL REFERENCES vaccines(id) ON DELETE CASCADE,
    schedule_id UUID REFERENCES vaccine_schedules(id),
    doctor_id UUID REFERENCES users(id),
    dose_number INTEGER NOT NULL,
    vaccination_date DATE NOT NULL,
    batch_number VARCHAR(100),
    manufacturer VARCHAR(255),
    site_of_injection VARCHAR(100), -- e.g., 'left arm', 'right thigh'
    next_due_date DATE,
    notes TEXT,
    side_effects_reported TEXT,
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('completed', 'missed', 'delayed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_vaccination_records_child_id ON vaccination_records(child_id);
CREATE INDEX IF NOT EXISTS idx_vaccination_records_vaccine_id ON vaccination_records(vaccine_id);
CREATE INDEX IF NOT EXISTS idx_vaccination_records_date ON vaccination_records(vaccination_date);
CREATE INDEX IF NOT EXISTS idx_vaccination_records_next_due ON vaccination_records(next_due_date);
