import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
type ApiCallType = (typeCall?: string, endpoint?: string, request?: any) => Promise<any>;


export default function Login({ ApiCall }: { ApiCall: ApiCallType }) {
  return (
    <div>
      <h1>Login</h1>
      <br />
      <GoogleAuth ApiCall={ApiCall} />
      <br />
      Or:
      <br />
      <Link to="/make-profile">Create an account</Link>
    </div>
  )
}
