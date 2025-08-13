-- Create reminders table for notifications
CREATE TABLE IF NOT EXISTS reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
    vaccine_id UUID NOT NULL REFERENCES vaccines(id) ON DELETE CASCADE,
    schedule_id UUID REFERENCES vaccine_schedules(id),
    parent_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reminder_type VARCHAR(20) NOT NULL CHECK (reminder_type IN ('sms', 'email', 'whatsapp', 'push')),
    due_date DATE NOT NULL,
    reminder_date DATE NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'cancelled')),
    sent_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for reminder processing
CREATE INDEX IF NOT EXISTS idx_reminders_child_id ON reminders(child_id);
CREATE INDEX IF NOT EXISTS idx_reminders_parent_id ON reminders(parent_id);
CREATE INDEX IF NOT EXISTS idx_reminders_reminder_date ON reminders(reminder_date);
CREATE INDEX IF NOT EXISTS idx_reminders_status ON reminders(status);
CREATE INDEX IF NOT EXISTS idx_reminders_due_date ON reminders(due_date);
