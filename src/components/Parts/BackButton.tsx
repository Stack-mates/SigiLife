import { useNavigate } from 'react-router-dom'

export default function BackButton({ name }: { name: any }) {
  const navigate = useNavigate();
  return (
    <button className="nav-button"
      style={{ backgroundColor: "#9e38fd" }}
      onClick={() => navigate(-1)}>
      { name }
    </button>
  )
}

