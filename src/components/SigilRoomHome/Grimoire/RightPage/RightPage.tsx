import { Link } from 'react-router-dom'
import BackButton from "../../../Parts/BackButton"
import SigiLibrary from './SigiLibrary/SigiLibrary'
import { useEffect, useState } from 'react'

export default function RightPage({ user }: { user: any }) {
  const [sigils, setSigils] = useState([])


  useEffect(() => {
    fetch(`http://localhost:3000/api/sigils/user/${user.id}/sigils`)
      .then(res => res.json())
      .then(data => setSigils(data))
  }, [])


  return (
    <div className="rightpage">
      <SigiLibrary items={sigils} user={user} />
      <Link to="/make-sigil"> 🪶 MakeSigil </Link>
      <BackButton name={"Go Back"} />
    </div>
  )
}
