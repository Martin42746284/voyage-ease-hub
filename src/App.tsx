import { useState, useEffect } from 'react'
import supabase from './utils/supabase'

function Page() {
  const [todos, setTodos] = useState<any[]>([])

  useEffect(() => {
    async function getTodos() {
      const { data, error } = await supabase.from('todos').select()

      if (error) {
        console.error(error)
        return
      }

      if (data && data.length > 0) {
        setTodos(data)
      }
    }

    getTodos()
  }, [])

  return (
    <div>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li> 
        // adapte la clé et le champ selon les colonnes de ta table
      ))}
    </div>
  )
}

export default Page
