import { useNavigate } from 'react-router-dom'

type ApiCallType = (typeCall?: string, endpoint?: string, request?: any) => Promise<any>;

export default function GoogleAuth({ ApiCall, setUser }: { ApiCall: ApiCallType, setUser: (user: any) => void }) {

  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await ApiCall('POST', '/auth');
    setUser(user);
    navigate('/home');
  }

  return (
    <div>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  )
};