import React, { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Stroke, Point } from '../../types/cosign';

interface PdfPageProps {
  pdf: pdfjsLib.PDFDocumentProxy;
  pageNumber: number;
  scale: number;
  strokes: Stroke[];
  onDrawStart: (stroke: Stroke) => void;
  onDrawMove: (id: string, point: Point) => void;
  onDrawEnd: (id: string) => void;
  color: string;
  lineWidth: number;
}

export function PdfPage({ 
  pdf, 
  pageNumber, 
  scale, 
  strokes, 
  onDrawStart, 
  onDrawMove, 
  onDrawEnd,
  color,
  lineWidth
}: PdfPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<pdfjsLib.PageViewport | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStrokeId, setCurrentStrokeId] = useState<string | null>(null);

  useEffect(() => {
    let renderTask: pdfjsLib.RenderTask | null = null;
    let isMounted = true;

    async function renderPage() {
      try {
        setRenderError(null);
        const page = await pdf.getPage(pageNumber);
        if (!isMounted) return;
        
        const vp = page.getViewport({ scale });
        setViewport(vp);

        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Use pixel ratio for high DPI displays, but force at least 3 for crisp output
        const outputScale = Math.max(window.devicePixelRatio || 1, 3);
        
        canvas.width = Math.floor(vp.width * outputScale);
        canvas.height = Math.floor(vp.height * outputScale);
        canvas.style.width = Math.floor(vp.width) + "px";
        canvas.style.height = Math.floor(vp.height) + "px";

        const renderContext: any = {
          canvasContext: ctx,
          viewport: vp
        };

        if (outputScale !== 1) {
          renderContext.transform = [outputScale, 0, 0, outputScale, 0, 0];
        }

        renderTask = page.render(renderContext);
        await renderTask.promise;
      } catch (err) {
        if (err instanceof pdfjsLib.RenderingCancelledException) {
          // Expected on re-render / unmount
        } else {
          console.error(`Error rendering page ${pageNumber}`, err);
          if (isMounted) setRenderError(String(err));
        }
      }
    }

    renderPage();

    return () => {
      isMounted = false;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdf, pageNumber, scale]);

  // Handle resizing the overlay canvas to match the pdf
  useEffect(() => {
    if (!viewport || !overlayRef.current) return;
    
    const canvas = overlayRef.current;
    
    const outputScale = Math.max(window.devicePixelRatio || 1, 3);
    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = Math.floor(viewport.width) + "px";
    canvas.style.height = Math.floor(viewport.height) + "px";
  }, [viewport]);

  // Redraw all strokes on overlay when strokes alter
  useEffect(() => {
    if (!viewport || !overlayRef.current) return;
    
    const canvas = overlayRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const outputScale = Math.max(window.devicePixelRatio || 1, 3);
    ctx.save();
    ctx.scale(outputScale, outputScale);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    strokes.forEach(stroke => {
      if (stroke.points.length === 0) return;
      
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width * scale; // Scale line width too
      
      const start = stroke.points[0];
      ctx.moveTo(start.x * scale, start.y * scale);
      
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x * scale, stroke.points[i].y * scale);
      }
      
      ctx.stroke();
    });
    
    ctx.restore();
  }, [strokes, viewport, scale]);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = overlayRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Only accept left mouse button or touch/pen
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    
    // Prevent scrolling when drawing on touch devices
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    
    const point = getCoordinates(e);
    const newStrokeId = crypto.randomUUID();
    
    const newStroke: Stroke = {
      id: newStrokeId,
      pageIndex: pageNumber,
      color,
      width: lineWidth,
      points: [point]
    };
    
    setIsDrawing(true);
    setCurrentStrokeId(newStrokeId);
    onDrawStart(newStroke);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStrokeId) return;
    
    const point = getCoordinates(e);
    onDrawMove(currentStrokeId, point);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStrokeId) return;
    
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    onDrawEnd(currentStrokeId);
    setIsDrawing(false);
    setCurrentStrokeId(null);
  };

  return (
    <div 
      ref={containerRef} 
      className="relative"
      style={{
        width: viewport ? viewport.width : 'auto',
        height: viewport ? viewport.height : 'auto',
        minHeight: '200px',
        minWidth: '200px'
      }}
    >
      {renderError && (
        <div className="absolute inset-0 flex items-center justify-center p-4 z-50 bg-red-50 text-red-600 text-sm border border-red-200">
          Error rendering page: {renderError}
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 bg-white" 
        style={{ pointerEvents: 'none' }}
      />
      <canvas 
        ref={overlayRef} 
        className="absolute top-0 left-0 z-10 touch-none cursor-crosshair"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      />
    </div>
  );
}
