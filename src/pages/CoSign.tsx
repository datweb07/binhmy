import React, { useEffect, useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { socket } from '../utils/socket';
import { Stroke, Point } from '../types/cosign';
import { PdfPage } from '../components/CoSign/PdfPage';
import { Upload, Download, Trash2, PenTool, MousePointer2 } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsPDF } from 'jspdf';

// Use a secure unpkg CDN for the worker to avoid Vite build/HMR issues in preview
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [connected, setConnected] = useState(socket.connected);
  const [roomId, setRoomId] = useState<string>('');
  const [inputRoomId, setInputRoomId] = useState<string>('');
  const [joined, setJoined] = useState(false);

  const [pdfProxy, setPdfProxy] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pdfName, setPdfName] = useState<string>("document.pdf");
  const [numPages, setNumPages] = useState<number>(0);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [scale, setScale] = useState(1.5);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = params.get('room');
    if (room) {
      setRoomId(room);
      setInputRoomId(room);
    }
  }, []);

  useEffect(() => {
    // Check initial connection status
    if (socket.connected) {
      setConnected(true);
    }

    const onConnect = () => {
      setConnected(true);
      if (joined && roomId) {
        socket.emit('join-room', roomId);
      }
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", () => setConnected(false));
    
    socket.on("sync:state", async (state: { hasPdf: boolean, pdfName: string, strokes: Stroke[] }) => {
      setStrokes(state.strokes);
      if (state.hasPdf) {
        setPdfName(state.pdfName);
        await loadPdfFromServer();
      } else {
        setPdfProxy(null);
      }
    });

    socket.on("pdf:changed", async (data: { hasPdf: boolean, name: string }) => {
      if (data.hasPdf) {
        setPdfName(data.name);
        await loadPdfFromServer();
      }
    });

    socket.on("strokes:sync", (serverStrokes: Stroke[]) => {
      setStrokes(serverStrokes);
    });

    socket.on("draw:start", (stroke: Stroke) => {
      setStrokes(prev => [...prev, stroke]);
    });

    socket.on("draw:move", (data: { id: string, point: Point }) => {
      setStrokes(prev => {
        return prev.map(s => {
          if (s.id === data.id) {
            return { ...s, points: [...s.points, data.point] };
          }
          return s;
        });
      });
    });

    socket.on("draw:end", (data: { id: string }) => {
      // no op for now, stroke remains
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("sync:state");
      socket.off("pdf:changed");
      socket.off("strokes:sync");
      socket.off("draw:start");
      socket.off("draw:move");
      socket.off("draw:end");
    };
  }, [roomId, joined]);

  useEffect(() => {
    if (joined && roomId) {
      const url = new URL(window.location.href);
      url.searchParams.set('room', roomId);
      window.history.pushState({}, '', url);

      socket.emit('join-room', roomId);
    }
  }, [joined, roomId]);

  const loadPdfFromServer = async () => {
    if (!roomId) return;
    try {
      const timestamp = new Date().getTime();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const loadingTask = pdfjsLib.getDocument({ url: `${apiUrl}/api/pdf/${roomId}?t=${timestamp}` });
      const doc = await loadingTask.promise;
      setPdfProxy(doc);
      setNumPages(doc.numPages);
    } catch (err) {
      console.error("Failed to load PDF from server", err);
      alert(`Failed to load PDF from server: ${(err as Error).message}`);
    }
  };

  const handleJoinRoom = () => {
    if (inputRoomId.trim()) {
      setRoomId(inputRoomId.trim());
      setJoined(true);
    }
  };

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(newRoomId);
    setInputRoomId(newRoomId);
    setJoined(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !roomId) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const base64 = event.target?.result as string;
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
          const res = await fetch(`${apiUrl}/api/pdf/${roomId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pdfBase64: base64, name: file.name })
          });
          if (!res.ok) {
            console.error("Server responded with", res.status);
          }
        } catch (err) {
          console.error("Upload error", err);
        } finally {
          setIsUploading(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
    }
  };

  const handleDrawStart = (stroke: Stroke) => {
    setStrokes(prev => [...prev, stroke]);
    socket.emit("draw:start", stroke);
  };

  const handleDrawMove = (id: string, point: Point) => {
    setStrokes(prev => {
      return prev.map(s => {
        if (s.id === id) {
          return { ...s, points: [...s.points, point] };
        }
        return s;
      });
    });
    socket.volatile.emit("draw:move", { id, point });
  };

  const handleDrawEnd = (id: string) => {
    socket.emit("draw:end", { id });
  };

  const handleClearStrokes = () => {
    socket.emit("draw:clear");
  };

  const handleExportImage = () => {
    // Queries all rendering pages
    const pages = document.querySelectorAll('.pdf-page-container');
    if (pages.length === 0) return;
    
    let pdf: jsPDF | null = null;

    pages.forEach((pageEl, idx) => {
      const canvases = pageEl.querySelectorAll('canvas');
      if (canvases.length < 2) return;
      const pdfCanvas = canvases[0] as HTMLCanvasElement;
      const drawingCanvas = canvases[1] as HTMLCanvasElement;
      
      const outCanvas = document.createElement('canvas');
      outCanvas.width = pdfCanvas.width;
      outCanvas.height = pdfCanvas.height;
      
      const ctx = outCanvas.getContext('2d');
      if (!ctx) return;
      
      // draw white background just in case
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, outCanvas.width, outCanvas.height);
      
      // draw PDF
      ctx.drawImage(pdfCanvas, 0, 0);
      ctx.drawImage(drawingCanvas, 0, 0, outCanvas.width, outCanvas.height);
      
      const dataUrl = outCanvas.toDataURL('image/png');
      
      // Use logical CSS width/height for the PDF page size so high-DPI canvases (retina) 
      // are properly scaled down, resulting in sharp text in the exported PDF.
      const cssWidth = parseFloat(pdfCanvas.style.width) || drawingCanvas.width;
      const cssHeight = parseFloat(pdfCanvas.style.height) || drawingCanvas.height;
      const orientation = cssWidth > cssHeight ? 'landscape' : 'portrait';
      
      if (!pdf) {
        pdf = new jsPDF({
          orientation: orientation,
          unit: 'px',
          format: [cssWidth, cssHeight]
        });
      } else {
        pdf.addPage([cssWidth, cssHeight], orientation);
      }
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, cssWidth, cssHeight);
    });

    if (pdf) {
      pdf.save(`${pdfName.replace('.pdf', '')}_signed.pdf`);
    }
  };

  if (!joined) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 max-w-sm w-full mx-4">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6 mx-auto">
            <PenTool className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">SwiftSign Collab</h1>
          <p className="text-slate-500 text-center mb-8 text-sm">Join a session to sign PDFs together in real-time.</p>
          
          <div className="space-y-4">
            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Room Code</label>
               <input
                 type="text"
                 value={inputRoomId}
                 onChange={e => setInputRoomId(e.target.value.toUpperCase())}
                 placeholder="e.g. A1B2C3"
                 className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors uppercase font-mono text-center tracking-widest text-lg"
                 onKeyDown={e => e.key === 'Enter' && handleJoinRoom()}
               />
            </div>
            <button
               onClick={handleJoinRoom}
               disabled={!inputRoomId.trim()}
               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join Session
            </button>
            <div className="flex items-center justify-center my-4">
               <div className="h-px bg-slate-200 flex-1"></div>
               <span className="px-4 text-xs font-medium text-slate-400 uppercase">Or</span>
               <div className="h-px bg-slate-200 flex-1"></div>
            </div>
            <button
               onClick={handleCreateRoom}
               className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3 px-4 border border-slate-300 rounded-lg shadow-sm transition-colors"
            >
              Create New Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-slate-800">SwiftSign Collab</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-slate-400 font-medium">Session Room:</p>
              <span className="text-xs text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded tracking-widest">{roomId}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200 space-x-6">
          <div className="flex items-center space-x-2">
            <div className={cn("w-2 h-2 rounded-full", connected ? "bg-green-500 animate-pulse" : "bg-red-500")} />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {connected ? 'Real-time Sync Active' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-semibold hover:bg-slate-50 disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload PDF'}
          </button>
          
          <button
            onClick={handleExportImage}
            disabled={!pdfProxy}
            className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-bold shadow-lg shadow-blue-200 disabled:opacity-50"
          >
            Finish & Merge PDF
          </button>
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden">
        {/* Toolbar sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 p-4 space-y-6 overflow-y-auto">
          <section>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Document Properties</h3>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs font-bold truncate">{pdfName}</p>
              {pdfProxy && <p className="text-[10px] text-slate-500 mt-1">{numPages} Pages</p>}
            </div>
          </section>

          <section className="flex-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Toolbar</h3>
            <div className="mt-4 space-y-6">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold">Ink Color</span>
                <div className="flex space-x-1">
                  {['#2563eb', '#000000', '#dc2626', '#16a34a', '#d97706'].map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={cn(
                        "w-4 h-4 rounded-full",
                        color === c ? "border-2 border-white shadow-sm ring-1 ring-blue-600 scale-110" : ""
                      )}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="px-1">
                <span className="text-[10px] font-bold block mb-2">Pen Size: {lineWidth}px</span>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={lineWidth} 
                  onChange={(e) => setLineWidth(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="px-1">
                <span className="text-[10px] font-bold block mb-2">Zoom: {Math.round(scale * 100)}%</span>
                <input 
                  type="range" 
                  min="0.5" 
                  max="3" 
                  step="0.1"
                  value={scale} 
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </section>

          <section className="pt-4 border-t border-slate-100">
            <button
              onClick={handleClearStrokes}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-slate-300 bg-white hover:bg-slate-50 rounded-md text-sm font-semibold transition-colors text-slate-700"
            >
              <Trash2 className="w-4 h-4" />
              Clear Ink
            </button>
          </section>
        </aside>

        {/* Canvas area */}
        <div className="flex-1 bg-slate-200 p-8 flex flex-col relative overflow-auto">
          {pdfProxy && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-300 text-[10px] font-bold text-slate-500 flex items-center space-x-4 shadow-sm z-10">
              <span>{numPages} Page(s)</span>
              <span>{Math.round(scale * 100)}% Zoom</span>
            </div>
          )}

          <div className="flex-1 mt-8">
            {!pdfProxy ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <div className="w-20 h-20 bg-slate-300 rounded-full flex items-center justify-center mb-6 shadow-inner">
                   <MousePointer2 className="w-8 h-8 text-slate-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-700 tracking-tight mb-2">No Document Uploaded</h2>
                <p className="max-w-xs text-center text-sm text-slate-500 mb-6 font-medium">
                  Upload a PDF document to begin collaborative signing.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center pb-24">
                {Array.from({ length: numPages }).map((_, i) => (
                  <div key={`page-${i + 1}`} className="pdf-page-container relative mb-12 shadow-2xl rounded-sm ring-1 ring-slate-300 bg-white overflow-hidden text-slate-800 last:mb-0">
                    <PdfPage
                      pdf={pdfProxy}
                      pageNumber={i + 1}
                      scale={scale}
                      strokes={strokes.filter(s => s.pageIndex === i + 1)}
                      onDrawStart={handleDrawStart}
                      onDrawMove={handleDrawMove}
                      onDrawEnd={handleDrawEnd}
                      color={color}
                      lineWidth={lineWidth}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
