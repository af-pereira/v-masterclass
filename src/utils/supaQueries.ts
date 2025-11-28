import { supabase } from '@lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

// Tasks
export const tasksWithProjectQuery = supabase.from('tasks').select(`
    *,
    projects(
      id,
      slug,
      name
    )
  `)

export type TasksWithProjects = QueryData<typeof tasksWithProjectQuery>

// Projects
export const projectsQuery = supabase.from('projects').select()

export type Projects = QueryData<typeof projectsQuery>
