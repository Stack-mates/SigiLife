import BackButton from "../Parts/BackButton"
import { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

export default function DrawSigil() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Initialize the Fabric canvas
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 500,
        height: 500,
        backgroundColor: '#f5f5f5',
        isDrawingMode: true 
      });
      
      // Explicitly instantiate the PencilBrush for Fabric v7
      const brush = new fabric.PencilBrush(canvas);
      brush.color = '#000000';
      brush.width = 5;
      canvas.freeDrawingBrush = brush;

      fabricCanvasRef.current = canvas;

      return () => {
        canvas.dispose();
      };
    }
  }, []);

  const handleClear = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      fabricCanvasRef.current.backgroundColor = '#f5f5f5';
      fabricCanvasRef.current.renderAll(); 
    }
  };

  return (
    <div className="draw-sigil-container">
      <h2>Draw Your Sigil</h2>
      <BackButton />
      
      {/* Wrap the canvas in a styled div rather than styling the canvas directly, 
          which prevents Fabric's internal wrapper from messing up borders */}
      <div style={{ display: 'inline-block', border: '2px solid #ccc', borderRadius: '8px', overflow: 'hidden', marginTop: '1rem' }}>
        <canvas ref={canvasRef} />
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleClear}>Clear Sigil</button>
      </div>
    </div>
  );
}
