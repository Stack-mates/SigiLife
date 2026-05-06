import { Link } from 'react-router-dom'

export default function NextButton({ to, onClick }: { to: string, onClick?: () => void }) {
  return (
    <Link to={to} onClick={onClick}>
      <button className="btn"
            >
        Next
      </button>
    </Link>
  )
}