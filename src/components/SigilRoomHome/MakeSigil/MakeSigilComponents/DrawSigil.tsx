import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as fabric from 'fabric';
import axios from 'axios';
import { useUser } from '@/context/UserContext'
import Menu from '../../../Parts/Menu'
import { usePageTutorial } from '../../../../context/TutorialContext';
import TutorialCharacters from '../../../Tutorial/Tutorialcharacters';
import { saveTutorialStepToSession } from '../../../Tutorial/Tutorialscript';

export default function DrawSigil() {
  const { user } = useUser();
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 2160, height: 1260 });
  const [step, setStep] = useState<'draw' | 'style'>('draw');
  const [isDrawingMode, setIsDrawingMode] = useState(true);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(5);
  const [sigilName, setSigilName] = useState('My New Sigil');
  const [styleColor, setStyleColor] = useState('#9e38fd');
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const isRestoringHistory = useRef(false);
  const [showStyleTip, setShowStyleTip] = useState(false);

  const { currentStep: tutorialStep, isActive, advance, skip } = usePageTutorial('draw');
  const showTutorialNext = isActive && tutorialStep?.advanceOn === 'next';
  const showTutorialSkip = isActive && (tutorialStep?.skippable ?? false);

  const styleTipStep = {
    id: 999,
    page: 'draw' as const,
    speaker: 'harper' as const,
    harperText: "Make sure to name your new sigil, or it will default to My New Sigil. You can add a color, ring or a glow here. When you're finished, click Review.",
    advanceOn: 'next' as const,
    skippable: true,
    showOverlay: false,
  };

  useEffect(() => {
    const calculate = () => {
      const scale = window.innerHeight / 1260;
      setDims({ width: Math.round(2160 * scale), height: window.innerHeight });
    };
    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    setTimeout(() => { el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2; }, 50);
  }, [dims]);

  const updateUndoRedo = useCallback(() => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  }, []);

  const saveHistory = useCallback(() => {
    if (isRestoringHistory.current || !fabricCanvasRef.current) return;
    const json = JSON.stringify(fabricCanvasRef.current.toJSON());
    const currentHistory = historyRef.current;
    if (historyIndexRef.current < currentHistory.length - 1) {
      historyRef.current = currentHistory.slice(0, historyIndexRef.current + 1);
    }
    historyRef.current.push(json);
    historyIndexRef.current = historyRef.current.length - 1;
    updateUndoRedo();
  }, [updateUndoRedo]);

  const handleDeleteSelected = useCallback(() => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      canvas.discardActiveObject();
      activeObjects.forEach((obj) => canvas.remove(obj));
      saveHistory();
    }
  }, [saveHistory]);

  useEffect(() => {
    if (!canvasRef.current || fabricCanvasRef.current) return;
    const wrapper = wrapperRef.current;
    const initialSize = wrapper ? Math.min(wrapper.clientWidth, wrapper.clientHeight) : 500;
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: initialSize, height: initialSize,
      backgroundColor: 'transparent', isDrawingMode: true
    });
    const brush = new fabric.PencilBrush(canvas);
    brush.color = '#000000';
    brush.width = 5;
    canvas.freeDrawingBrush = brush;
    fabricCanvasRef.current = canvas;
    saveHistory();
    canvas.on('path:created', saveHistory);
    canvas.on('object:modified', saveHistory);
    canvas.on('object:removed', () => { if (!isRestoringHistory.current) saveHistory(); });

    const loadCharacters = async () => {
      const uniqueChars = localStorage.getItem('sigilUniqueChars');
      if (uniqueChars && fabricCanvasRef.current) {
        const canvas = fabricCanvasRef.current;
        try {
          const response = await axios.post('/api/vectors/character-vectors', { chars: uniqueChars });
          const vectors = response.data;
          if (!vectors || vectors.length === 0) return;
          for (const vector of vectors) {
            const { objects } = await fabric.loadSVGFromString(
              `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">${vector.vectorData}</svg>`
            );
            if (objects && objects.length > 0) {
              const pathObj = objects[0] as fabric.FabricObject;
              pathObj.set({
                fill: 'transparent', stroke: 'black', strokeWidth: 2,
                left: canvas.width ? (canvas.width / 2) + (Math.random() * 80 - 40) : 250,
                top: canvas.height ? (canvas.height / 2) + (Math.random() * 80 - 40) : 250,
                originX: 'center', originY: 'center', selectable: true,
              });
              if (pathObj.width && canvas.width && pathObj.width > canvas.width * 0.4) {
                pathObj.scaleToWidth(canvas.width * 0.4);
              }
              canvas.add(pathObj);
            }
          }
          canvas.renderAll();
          setIsDrawingMode(false);
          saveHistory();
        } catch (error) {
          console.error("Error loading character vectors:", error);
        }
      }
    };

    loadCharacters();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (document.activeElement?.tagName === 'INPUT') return;
        handleDeleteSelected();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (fabricCanvasRef.current) {
          const { width, height } = entry.contentRect;
          const size = Math.min(width, height);
          fabricCanvasRef.current.setDimensions({ width: size, height: size });
        }
      }
    });
    if (wrapperRef.current) resizeObserver.observe(wrapperRef.current);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      resizeObserver.disconnect();
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [saveHistory, handleDeleteSelected]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.isDrawingMode = isDrawingMode;
      if (isDrawingMode) {
        fabricCanvasRef.current.discardActiveObject();
        fabricCanvasRef.current.requestRenderAll();
      }
    }
  }, [isDrawingMode]);

  useEffect(() => {
    if (fabricCanvasRef.current && fabricCanvasRef.current.freeDrawingBrush) {
      fabricCanvasRef.current.freeDrawingBrush.color = brushColor;
      fabricCanvasRef.current.freeDrawingBrush.width = brushWidth;
    }
  }, [brushColor, brushWidth]);

  const handleClear = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      fabricCanvasRef.current.backgroundColor = 'transparent';
      fabricCanvasRef.current.renderAll();
      saveHistory();
    }
  };

  const undo = async () => {
    if (historyIndexRef.current > 0 && fabricCanvasRef.current) {
      isRestoringHistory.current = true;
      historyIndexRef.current -= 1;
      const jsonStr = historyRef.current[historyIndexRef.current]!;
      await fabricCanvasRef.current.loadFromJSON(JSON.parse(jsonStr));
      fabricCanvasRef.current.renderAll();
      isRestoringHistory.current = false;
      updateUndoRedo();
    }
  };

  const redo = async () => {
    if (historyIndexRef.current < historyRef.current.length - 1 && fabricCanvasRef.current) {
      isRestoringHistory.current = true;
      historyIndexRef.current += 1;
      const jsonStr = historyRef.current[historyIndexRef.current]!;
      await fabricCanvasRef.current.loadFromJSON(JSON.parse(jsonStr));
      fabricCanvasRef.current.renderAll();
      isRestoringHistory.current = false;
      updateUndoRedo();
    }
  };

  const handleExport = () => {
    if (!fabricCanvasRef.current) return;
    const dataURL = fabricCanvasRef.current.toDataURL({ format: 'png', multiplier: 2 });
    const link = document.createElement('a');
    link.download = `${sigilName.replace(/\s+/g, '_')}_sigil.png`;
    link.href = dataURL;
    link.click();
  };

  const handleSVGUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (f) => {
      const data = f.target?.result;
      if (typeof data === 'string' && data && fabricCanvasRef.current) {
        try {
          const { objects, options } = await fabric.loadSVGFromString(data);
          if (!objects || objects.length === 0) return;
          const validObjects = objects.filter((o): o is fabric.FabricObject => o !== null);
          const obj = fabric.util.groupSVGElements(validObjects, options) as fabric.Group;
          obj.set({
            left: fabricCanvasRef.current.width ? fabricCanvasRef.current.width / 2 : 250,
            top: fabricCanvasRef.current.height ? fabricCanvasRef.current.height / 2 : 250,
            originX: 'center', originY: 'center', selectable: true,
          });
          if (obj.width && fabricCanvasRef.current.width && obj.width > fabricCanvasRef.current.width * 0.8) {
            obj.scaleToWidth(fabricCanvasRef.current.width * 0.8);
          }
          fabricCanvasRef.current.add(obj);
          fabricCanvasRef.current.renderAll();
          setIsDrawingMode(false);
          saveHistory();
        } catch (error) {
          console.error("Error parsing SVG:", error);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleAddRing = () => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    const ring = new fabric.Circle({
      radius: canvas.width ? canvas.width * 0.4 : 150,
      fill: 'transparent', stroke: styleColor, strokeWidth: brushWidth,
      left: canvas.width ? canvas.width / 2 : 250,
      top: canvas.height ? canvas.height / 2 : 250,
      originX: 'center', originY: 'center', selectable: true
    });
    canvas.add(ring);
    canvas.renderAll();
    saveHistory();
  };

  const handleChangeColor = () => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    const activeObjects = canvas.getActiveObjects();
    const objectsToChange = activeObjects.length > 0 ? activeObjects : canvas.getObjects();
    objectsToChange.forEach(obj => {
      obj.set('stroke', styleColor);
      if (obj.type === 'group') {
        (obj as fabric.Group).forEachObject(innerObj => { innerObj.set('stroke', styleColor); });
      }
    });
    canvas.renderAll();
    saveHistory();
  };

  const handleAddGlow = () => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    const activeObjects = canvas.getActiveObjects();
    const objectsToChange = activeObjects.length > 0 ? activeObjects : canvas.getObjects();
    objectsToChange.forEach(obj => {
      obj.set('shadow', new fabric.Shadow({ color: styleColor, blur: 20, offsetX: 0, offsetY: 0 }));
    });
    canvas.renderAll();
    saveHistory();
  };

  const handleNextToStyle = () => {
    if (!fabricCanvasRef.current) return;
    const canvasData = JSON.stringify(fabricCanvasRef.current.toJSON());
    const imageData = fabricCanvasRef.current.toDataURL({ format: 'png', multiplier: 1 });
    localStorage.setItem('sigilCanvasData', canvasData);
    localStorage.setItem('sigilImageData', imageData);
    localStorage.setItem('sigilName', sigilName);
    navigate('/make-sigil/style');
    window.scrollTo(0, 0);
  };

  if (!user) return null;

  return (
    <div className='maincontainer'>
      <div ref={scrollRef} className='scrollcontainer'>
        <div className="drawsigil art-page-base" style={{
          width: `${Math.max(dims.width, window.innerWidth)}px`, height: `${dims.height}px`,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Menu />
          <div ref={cardRef} className="flex flex-col justify-evenly bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] pointer-events-auto border border-white/20 transition-all duration-500"
            style={{ width: 'min(55dvh, 85dvw)', height: '88dvh' }}>
            <h1 style={{ fontSize: "clamp(26px, 4vw, 42px)", textAlign: "center" }}>
              {step === 'draw' ? 'Draw Your Sigil' : 'Style Your Sigil'}
            </h1>
            <div className="drawsigilmenu" style={{ fontSize: "clamp(13px, 2vw, 17px)" }}>
              {step === 'draw' ? (
                <>
                  <button className="pinkbutton" onClick={() => setIsDrawingMode(!isDrawingMode)}
                    style={{  fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px", color: isDrawingMode ? 'white' : 'black', cursor: 'pointer' }}>
                    {isDrawingMode ? "🖐 Manipulate Mode" : "✍️ Draw Mode"}
                  </button>
                  {user.isAdmin === true &&
                    <label>
                      📂 Import SVG
                      <input type="file" accept=".svg" style={{ display: 'none' }} onChange={handleSVGUpload} />
                    </label>}
                </>
              ) : (
                <div>
                  <label htmlFor="sigilName">Name Your Sigil:</label>
                  <input type="text" style={{ color: "black" }} className='textinput' id="sigilName" value={sigilName} onChange={(e) => setSigilName(e.target.value)} />
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
                    <p>select <br />color:</p>
                    <input type="color" value={styleColor} onChange={(e) => setStyleColor(e.target.value)} style={{ cursor: 'pointer', width: '80px', height: '80px', alignSelf: "center" }} />
                    <button className="pinkbutton" onClick={handleChangeColor} style={{  fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px" }}>🎨 Color</button>
                    <button className="pinkbutton" onClick={handleAddRing} style={{  fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px" }}>⭕ Ring</button>
                    <button className="pinkbutton" onClick={handleAddGlow} style={{  fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px" }}>✨ Glow</button>
                  </div>
                </div>
              )}
              {user.isAdmin === true && <button className="btn" onClick={handleExport}>💾</button>}
            </div>
            {step === 'draw' && isDrawingMode && (
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center", fontSize: "clamp(13px, 2vw, 16px)" }}>
                <div>
                  <label htmlFor="brushColor">Color:</label>
                  <input type="color" id="brushColor" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} style={{ cursor: 'pointer' }} />
                </div>
                <div>
                  <label htmlFor="brushWidth">Thickness ({brushWidth}px):</label>
                  <input type="range" id="brushWidth" min="1" max="50" value={brushWidth} onChange={(e) => setBrushWidth(parseInt(e.target.value))} style={{ cursor: 'pointer' }} />
                </div>
              </div>
            )}
            <div ref={wrapperRef} style={{ width: 'min(100%, 60vh)', aspectRatio: '1 / 1', margin: '0 auto', border: '2px solid #ccc', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
              <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            </div>
            {!isDrawingMode && (
              <div className='rowbox' style={{ justifyContent: "center", gap: "8px" }}>
                <button className="pinkbutton" onClick={handleDeleteSelected} style={{  opacity: canUndo ? 1 : 0.5, fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px" }}>🗑️ Delete</button>
                <button className="pinkbutton" onClick={undo} disabled={!canUndo} style={{  opacity: canUndo ? 1 : 0.5, fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px" }}>↶ Undo</button>
                <button className="pinkbutton" onClick={redo} disabled={!canRedo} style={{  opacity: canRedo ? 1 : 0.5, fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px" }}>↷ Redo</button>
              </div>
            )}
            {step === 'draw' ? (
              <div className='rowbox' style={{ justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
                <button className="pinkbutton" onClick={handleClear} style={{  fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px" }}>Clear All</button>
                <button className="pinkbutton" onClick={() => {
                  setStep('style');
                  setIsDrawingMode(false);
                  const skipped = sessionStorage.getItem('sigilTutorialSkipped');
                  if (!skipped && !user.hasCompletedTutorial) setShowStyleTip(true);
                }} style={{  fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px" }}>Next: Style Sigil</button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                <button className="pinkbutton" onClick={() => setStep('draw')} style={{  fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px" }}>⬅ Back</button>
                <button className="pinkbutton" onClick={handleNextToStyle} style={{  fontSize: "clamp(16px, 2.5vw, 22px)", padding: "10px 32px" }}>Review</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isActive && tutorialStep && !showStyleTip && (
        <TutorialCharacters
          step={tutorialStep}
          onNext={advance}
          onSkip={skip}
          showNext={showTutorialNext}
          showSkip={showTutorialSkip}
          cardRef={cardRef}
        />
      )}

      {showStyleTip && (
        <TutorialCharacters
          step={styleTipStep}
          onNext={() => {
            setShowStyleTip(false);
            saveTutorialStepToSession(6);
          }}
          onSkip={() => {
            setShowStyleTip(false);
            sessionStorage.setItem('sigilTutorialSkipped', 'true');
          }}
          showNext={true}
          showSkip={true}
          cardRef={cardRef}
        />
      )}
    </div>
  );
}
