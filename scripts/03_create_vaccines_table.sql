-- Create vaccines master table
CREATE TABLE IF NOT EXISTS vaccines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    description TEXT,
    manufacturer VARCHAR(255),
    vaccine_type VARCHAR(100), -- e.g., 'live', 'inactivated', 'toxoid'
    route_of_administration VARCHAR(50), -- e.g., 'intramuscular', 'oral'
    storage_temperature VARCHAR(50),
    contraindications TEXT,
    side_effects TEXT,
    importance_info TEXT,
    is_mandatory BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster name searches
CREATE INDEX IF NOT EXISTS idx_vaccines_name ON vaccines(name);
CREATE INDEX IF NOT EXISTS idx_vaccines_active ON vaccines(is_active);
