type ApiCallType = (typeCall?: string, endpoint?: string, request?: any) => Promise<any>;

export default function GoogleAuth({ ApiCall }: { ApiCall: ApiCallType }) {
  ApiCall();
  return (
    <div>
      This is where your Google Auth will Go
    </div>
  )
};