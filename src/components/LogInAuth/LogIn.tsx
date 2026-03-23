import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
type ApiCallType = (typeCall?: string, endpoint?: string, request?: any) => Promise<any>;


export default function Login({ ApiCall, setUser }: { ApiCall: ApiCallType, setUser: (user:any) => void }) {
  return (
    <div>
      <h1>Login</h1>
      <br />
      <GoogleAuth ApiCall={ApiCall} setUser={setUser}/>
      <br />
      Or:
      <br />
      <Link to="/make-profile">Create an account</Link>
    </div>
  )
}
