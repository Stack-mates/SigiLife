import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default function changeEmotion({ emotion, setEmotion }: { emotion: string, setEmotion: (emotion: string) => void }) {


  return (
    <div className="changeemotion">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="glassbutton" style={{ background: "transparent" }}>
            {emotion ? emotion : "Choose Emotion"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
          <DropdownMenuItem onClick={() => { setEmotion("Hope") }}>Hopeful</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEmotion("Joy") }} >Happy</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEmotion("Desire") }}>Want</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEmotion("Pride") }} >Proud</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEmotion("Relief") }}>Let it Go</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEmotion("Just Because") }} >No Reason</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEmotion("Fear") }}>Afraid</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEmotion("Anger") }} >Angry</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEmotion("Grief") }}>Sad</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEmotion("Guilt") }}>Mad at Myself</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEmotion("Shame") }}>Cant Believe I Did That</DropdownMenuItem>
          <DropdownMenuItem onClick={() => { setEmotion("Loneliness") }}>Alone</DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
      <div className="emotion">{emotion}</div>
    </div>
  )
}
