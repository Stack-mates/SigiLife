import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SigiLifeLogo from '../../assets/SigilifeLogo.svg';
import GoogleAuth from './GoogleAuth';
import { useUser } from '@/context/UserContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import WriteSigil from '../../assets/SSWriteSigil.svg';
import SigilFriends from '../../assets/SSSigilFriends.svg';
import SigilCharge from '../../assets/SSSigilCharge.svg';
import SigilDestroy from '../../assets/SSSigilDestroy.svg';
import TheOffice from '../../assets/SSTheOffice.svg'
import SigilMap from '../../assets/SSSigilMap.svg'


export default function LandingPage() {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const handleSlideClick = useCallback(() => {
    carouselApi?.scrollNext();
  }, [carouselApi]);

  useEffect(() => {
    if (!isLoading && user) {
      const needsProfile = !user.username || user.avatar === null || user.theme === null || !user.homeLocation;
      if (needsProfile) {
        navigate('/create-profile');
      } else {
        navigate('/home');
      }
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (!carouselApi) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 8000);

    return () => clearInterval(interval)
  }, [carouselApi]);

  const slides = [
    <></>,

    <>You ever feel something<br />in a place that doesn’t belong to you? <br/> A strange sadness,<br /> sudden certainty, <br /> or a memory that isn’t yours?</>,

    <>For decades, The Office<br />has documented emotional imprints<br />appearing across the world.<br /><br />Symbols from intention that remain behind.</>,

    <>They’re called Sigils.<br /><br />And if you’re here now,<br />it means you noticed one.</>,

    <>SigiLife is a map of hidden intentions.<br />Yours,<br /> & everyone else’s.</>,

    <>Every sigil begins with a statement.<br />A want.<br />A fear.<br />A promise.<br />A thing you cannot let go of.</>,

    <>You do not simply write it down.<br />You reduce it.<br />Distill it.<br />Strip it to its meaning.</>,
    <img src={WriteSigil} alt="Write Sigil" style={{ objectFit: "contain", width: "100%", height: "25vh", borderRadius: '12px' }} />,

    <>Then SigiLife transforms it into something symbolic.<br /> Abstract, Unique, Tangible. <br /> & Entirely Yours- </>,
    <><h1 style={{fontFamily: 'Pompiere'}}>A Sigil.</h1></>,
    <img src={SigilMap} alt="Sigil Map" style={{ width: "100%", height: "25vh", objectFit: "contain", borderRadius: '12px' }} />,

    <>Then, place it somewhere real.<br /> A street corner, or a park.<br /> A graveyard.<br /> A bar you should not return to.</>,

    <>Choose whether to <br />share with others <br /> or keep it totally private.</>,

    <img src={SigilFriends} alt="Sigil Friends" style={{ width: "100%", height: "25vh", objectFit: "contain", borderRadius: '12px' }} />,

    <>Next comes the emotional Charge.<br /><br />Hope.<br />Grief.<br />Relief.<br />Joy.</>,

    <>Emotion leaves residue.<br />That residue gives the Sigil weight.</>,
    <img src={SigilCharge} alt="Sigil Charge" style={{ width: "100%", height: "25vh", objectFit: "contain", borderRadius: '12px' }} />,

    <>Some people use Sigils to manifest.<br />Some use them to remember.<br />Others use them to bury things.</>,

    <>Over time, the world fills with traces.<br />Invisible layers of human intention<br />hidden beneath ordinary places.</>,

    <>You can build or destroy Sigils left by others.<br />Strengthen your own.<br />Or simply observe what lingers.</>,

    <>Nothing lasts forever.</>,

    <>When the time comes,<br />you may destroy your sigil.<br /><br />Not delete.<br />Destroy.</>,

    <>The charge breaks.<br />The symbol collapses.<br />The intention dissolves.<br /><br />And that matters.</>,
    <img src={SigilDestroy} alt="Sigil Destroy" style={{ width: "100%", height: "25vh", objectFit: "contain", borderRadius: '12px' }} />,

    <>Right now, sigils can be shared<br />between  just your trusted contacts.<br />Soon, The Office may expand access.</>,
    <img src={TheOffice} alt="The Office" style={{ width: "100%", height: "25vh", objectFit: "contain", borderRadius: '12px' }} />,
    <></>,
    <><br />The world is already full<br />of invisible meaning.<br /><br />SigiLife just makes it visible.</>,
    <></>







  ];

  return (
    <>
      <div className='maincontainer'>
        <div className='scrollcontainer'>
          <div className="landingpage">
            <>

              <img src={SigiLifeLogo} className="logo" alt="Sigil-Life-Logo" style={{ width: "min(70dvh, 88dvw)" }} />
              <div className="logo" style={{
                height: "fit-content",
                color: "white",
                padding: "5px",
                margin: "5px",
                borderRadius: "12px",
                width: "min(70dvh, 88dvw)",
                textWrap: "wrap",
                minWidth: "300px"
              }}><p style={{ color: "white" }}>
                  SigiLife is an augmented reality, location-based, social, ritualized lifestyle game where emotional intention becomes digitally visible.
                </p>
              </div>
              <div className='displaypitch' style={{ height: "30vh", margin: "0", width: "min(70dvh, 88dvw)", paddingTop: ".3rem" }}>
                <Carousel setApi={setCarouselApi}
                  opts={{ loop: true }}
                  orientation="vertical"
                  className="slidebox"
                  style={{ height: "29.5vh", margin: "0", width: "min(70dvh, 88dvw)" }}>
                  <CarouselContent style={{
                    height: "25vh",
                    fontSize: "clamp(18px, 5vw, 42px)",
                    fontFamily: "Pompiere",
                    textAlign: "center",
                    alignSelf: "center",
                    color: "white",
                  }}>
                    {slides.map((content, i) => (
                      <CarouselItem key={i} onClick={handleSlideClick} className="cursor-pointer select-none" >
                        {content}
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <GoogleAuth />
            </>
          </div>
        </div>
      </div>
    </>
  );
}