import { Link } from 'react-router-dom'

export default function NextButton({ to, onClick }: { to: string, onClick?: () => void }) {
  return (
    <Link to={to} onClick={onClick}>
      <button className="nav-button"
        style={{ backgroundColor: "#9e38fd" }}>
        Next
      </button>
    </Link>
  )
}