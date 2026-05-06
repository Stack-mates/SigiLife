
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext'
import Menu from '../../../Parts/Menu'
import axios from 'axios';


export default function WriteSigil() {
  const { user } = useUser();

  if (!user) { return null; }


  const [intention, setIntention] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uniqueChars, setUniqueChars] = useState('');

  const navigate = useNavigate();



  const getUniqueChars = async (text: string): Promise<{ chars: string; censored: string }> => {
    let censored = text;
    try {
      const response = await axios.post(
        'https://api.apilayer.com/bad_words',
        { text },
        {
          headers: {
            apikey: import.meta.env.VITE_BAD_WORDS,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data?.censored_content) {
        censored = response.data.censored_content.slice(9, -2);

      }
    } catch (error) {
      console.error('Error checking for bad words:', (error as Error).message);
      throw error;
    }

    // Remove vowels, non-alphabetic characters, and duplicate characters

    const nonAlphaOrVowels = /[^a-zA-Z]|[aeiouAEIOU]/g;
    const cleanText = censored.replace(nonAlphaOrVowels, '').toUpperCase();
    const seen = new Set<string>();
    const uniqueChars = cleanText.split('').filter(char => {
      if (seen.has(char)) return false;
      seen.add(char);
      return true;
    });

    return { chars: uniqueChars.join(''), censored };
  };

  useEffect(() => {
    if (!intention) {
      setUniqueChars('');
      return;
    }
    getUniqueChars(intention)
      .then(({ chars }) => {
        setUniqueChars(chars);
      });
  }, [intention]);

  const handleNext = async () => {
    if (!intention) return;
    setIsProcessing(true);

    const { chars, censored } = await getUniqueChars(intention);
    localStorage.setItem('sigilIntention', censored);
    localStorage.setItem('sigilUniqueChars', chars);

    setIsProcessing(false);
    navigate('/make-sigil/draw');
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) {
      return;
    }
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
  }, []);



  // console.log(user)
  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="writesigil">
          <Menu />
          <div className="flex flex-col justify-evenly h-[90vh] bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-[80vw] m-6 pointer-events-auto border border-white/20 transform transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-8">
            <h1>Write Your Sigil</h1>
            <p style={{ fontSize: "clamp(14px, 2.5vw, 22px)", marginTop: "0.5rem" }}>
              Your sigil is created by writing a statement that defines your current desires:
            </p>
            <textarea
              className="textinput"
              style={{
                width: "100%",
                flex: "1",
                minHeight: "120px",
                padding: "15px",
                resize: "none",
                fontSize: "clamp(15px, 2vw, 18px)"
              }}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="e.g. I am going to crush it today!"

            />
            <div className="clmnbox">
              <span style={{ color: '#666', fontSize: 'clamp(13px, 2vw, 20px)' }}>
                Unique letters: {uniqueChars}
              </span>
              <button
                className="btn"
                onClick={handleNext}
                disabled={isProcessing}
                style={{
                  backgroundColor: isProcessing ? '#ccc' : '#9e38fd',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontSize: "clamp(16px, 2.5vw, 22px)",
                  padding: "10px 32px"
                }}
              >
                {isProcessing ? "Processing..." : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}