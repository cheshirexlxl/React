import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as auth from '../apis/auth'

const useOwner = () => {
  const { username } = useParams()
  const [owner, setOwner] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username) {
      setNotFound(true)
      setLoading(false)
      return
    }
    const fetchOwner = async () => {
      try {
        const response = await auth.getOwnerByUsername(username)
        setOwner(response.data)
      } catch (e) {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }
    fetchOwner()
  }, [username])

  return { owner, notFound, loading }
}

export default useOwner
