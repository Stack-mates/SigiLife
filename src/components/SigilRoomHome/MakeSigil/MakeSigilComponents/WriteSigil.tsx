import BackButton from "../../../Parts/BackButton"
import NextButton from "../../../Parts/NextButton"
import { useState } from 'react';

export default function WriteSigil({ user }: { user: any }) {
  const [intention, setIntention] = useState('');

  const getUniqueChars = (text: string): string => {
    // Remove vowels, non-alphabetic characters, and duplicate characters
    const nonAlphaOrVowels = /[^a-zA-Z]|[aeiouAEIOU]/g;
    const cleanText = text.replace(nonAlphaOrVowels, '').toUpperCase();
    const seen = new Set<string>();
    const uniqueChars = cleanText.split('').filter(char => {
      if (seen.has(char)) return false;
      seen.add(char);
      return true;
    });
    return uniqueChars.join('');
  };

  const handleNext = () => {
    const uniqueChars = getUniqueChars(intention);
    // Store in localStorage for the next page
    localStorage.setItem('sigilIntention', intention);
    localStorage.setItem('sigilUniqueChars', uniqueChars);
  };

  console.log(user)
  return (
    <div className='maincontainer'>
    <div>
      <BackButton name={'Go Back'}/>
      <h1>Write Your Sigil</h1>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Enter your intention.
      </p>
      <textarea
        value={intention}
        onChange={(e) => setIntention(e.target.value)}
        placeholder="e.g., I am healthy and strong"
        style={{
          width: '100%',
          minHeight: '150px',
          padding: '1rem',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          resize: 'vertical',
          marginBottom: '1rem'
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#666', fontSize: '14px' }}>
          Unique characters: {getUniqueChars(intention)}
        </span>
        <NextButton to="/make-sigil/draw" onClick={handleNext} />
      </div>
    </div>
    </div>
  )
}
