import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gbbgbrcqcylhujyphgue.supabase.co'

const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiYmdicmNxY3lsaHVqeXBoZ3VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3ODY5MjIsImV4cCI6MjA5NDM2MjkyMn0.Pk3EwnNPe7cajRwjH4JofTmjFeD1wON07zrT8e1enAk'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)