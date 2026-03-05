import { useState, useEffect } from 'react'
import {
  collection, addDoc, deleteDoc, doc, onSnapshot,
  serverTimestamp, query, orderBy
} from 'firebase/firestore'
import { db } from '../lib/firebase'

const COLLECTION = 'quotes'

export function useQuotes() {
  const [quotes, setQuotes]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(
      q,
      (snap) => {
        setQuotes(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoading(false)
      },
      (err) => {
        setError(err.message)
        setLoading(false)
      }
    )
    return unsub
  }, [])

  const addQuote = async ({ author, text, addedBy, addedByName }) => {
    await addDoc(collection(db, COLLECTION), {
      author,
      text,
      addedBy,
      addedByName,
      createdAt: serverTimestamp(),
    })
  }

  const deleteQuote = async (id) => {
    await deleteDoc(doc(db, COLLECTION, id))
  }

  const randomQuote = () => {
    if (!quotes.length) return null
    return quotes[Math.floor(Math.random() * quotes.length)]
  }

  return { quotes, loading, error, addQuote, deleteQuote, randomQuote }
}
