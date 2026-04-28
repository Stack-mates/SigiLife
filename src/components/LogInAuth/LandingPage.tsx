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
    <><br/>Mark your intent.<br />Leave a trace.<br /><br />Nothing disappears without a ritual.</>,
    <>SigiLife is a map of hidden intentions: <br />yours and everyone else's.<br />
    Every sigil is a statement, a feeling,<br /> a moment made permanent…<br /> until you choose to let it go.</>,
    <><br/><br/>How It Works:</>,
    <>You don't just write goals.<br /> You encode them.<br />Write your intention. <br />Strip it down. <br />Distill it.</>,
    <>Turn it into a Sigil:<br />something abstract, <br />something unique, <br /> something yours.</>,
    <>Then, choose how it feels: <br /> Hope. Anger. Obsession. Relief.<br />Emotion becomes the Charge.</>,
    <>Place it somewhere real:<br />A street corner.<br />Your bedroom.<br />A bar you shouldn't go back to.</>,
    <>Use SigiLife to:<br />Let go of things you <br />can't carry anymore...<br />Anchor moments you <br /> don't want to forget.</>,
    <>Track personal transformations...<br />Leave something behind <br /> for someone else to find </>,
    <><br />Or just see what's <br /> hidden in the world <br />around you </>,
    <> </>,
    <>Nothing lasts forever.<br />When you are ready,<br /> you can destroy your sigil.<br />Not delete—destroy.</>,
    <>The intention dissolves.<br />The charge breaks.<br />The mark is gone.<br /><br />And that matters.</>,
    <>Right now, you can see and use what your friends make.<br />Soon, you'll be able to do much more.</>,
    <><br/>Every moment can leave a trace.<br /> SigiLife lets you decide what remains.</>,
  ];

  return (
    <>
      <div className='maincontainer'>
        <div className="landingpage">
          <>
            <img src={SigiLifeLogo} className="logo" alt="Sigil-Life-Logo" />
            <div className='rowbox'>
              <h1 className="glasscard" style={{ height: "10vh", width: "80vw", color: "white", padding: "15px", margin: "5px", borderRadius: "12px" }}>
                SigiLife is a location-based ritual platform where users transform personal intentions into digital sigils
              </h1>
            </div>
            <div className='displaypitch '>
              <Carousel setApi={setCarouselApi} opts={{ loop: true }} orientation="vertical" className="slidebox" style={{height: "30vh"}}>
                <CarouselContent className="h-72" style={{height: "23vh"}}>
                  {slides.map((content, i) => (
                    <CarouselItem key={i} onClick={handleSlideClick} className="cursor-pointer select-none" style={{fontSize: 48}}>
                      {content}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </>

          <div className='landingrowbox'>
            <GoogleAuth />
          </div>
        </div>
      </div>
    </>
  );
}