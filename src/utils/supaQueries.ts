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

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
  *,
  tasks(
    id,
    name,
    status,
    due_date
  )
`
    )
    .eq('slug', slug)
    .single()

export type Project = QueryData<ReturnType<typeof projectQuery>>
