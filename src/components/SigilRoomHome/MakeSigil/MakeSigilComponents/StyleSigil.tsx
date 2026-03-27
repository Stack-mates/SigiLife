import BackButton from "../../../Parts/BackButton"
import NextButton from "../../../Parts/NextButton"

//this is where we will need a call to the db to save

export default function StyleSigil({ user }: { user: any }) {
  console.log(user)
  return (
    <div className='maincontainer'>
    <div>
      <h1>Style Your Sigil</h1>
      <BackButton name={"Go Back"} />
      <br />
      <NextButton to="/sigil-page" />
      <br />

    </div>
    </div>
  )
}
