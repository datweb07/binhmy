import express from "express";
import path from "path";

import { createServer } from "http";
import { Server } from "socket.io";

export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  pageIndex: number;
  color: string;
  width: number;
  points: Point[];
}

interface RoomData {
  pdfBuffer: Buffer | null;
  pdfName: string | null;
  strokes: Stroke[];
}

const rooms = new Map<string, RoomData>();

function getRoom(roomId: string) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, { pdfBuffer: null, pdfName: null, strokes: [] });
  }
  return rooms.get(roomId)!;
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3001;
  const httpServer = createServer(app);
  
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
    maxHttpBufferSize: 1e8 // 100 MB
  });

  // Enable CORS for Express APIs
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Upload PDF endpoint
  app.post("/api/pdf/:roomId", (req, res) => {
    const roomId = req.params.roomId;
    if (!roomId) return res.status(400).json({ error: "Missing roomId" });

    const { pdfBase64, name } = req.body;
    if (!pdfBase64) {
      console.error("Missing pdfBase64 in request body!");
      return res.status(400).json({ error: "Missing pdfBase64" });
    }
    console.log(`Received PDF upload - Room: ${roomId}, Size: ${pdfBase64.length} bytes, Name: ${name}`);
    let base64Data = pdfBase64;
    if (pdfBase64.includes(',')) {
      base64Data = pdfBase64.split(',')[1];
    }
    
    const room = getRoom(roomId);
    room.pdfBuffer = Buffer.from(base64Data, 'base64');
    room.pdfName = name || 'document.pdf';
    room.strokes = []; // reset strokes when new PDF uploaded
    
    io.to(roomId).emit("pdf:changed", { hasPdf: true, name: room.pdfName });
    io.to(roomId).emit("strokes:sync", room.strokes);
    
    console.log("PDF saved and broadcasted successfully.");
    res.json({ success: true });
  });

  // Get PDF endpoint
  app.get("/api/pdf/:roomId", (req, res) => {
    const roomId = req.params.roomId;
    const room = getRoom(roomId);

    if (!room.pdfBuffer) {
      console.warn(`Requested PDF but no buffer exists for room ${roomId}`);
      return res.status(404).send("No PDF currently loaded");
    }
    console.log(`Sending PDF buffer of size: ${room.pdfBuffer.length} bytes for room ${roomId}`);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(room.pdfName || 'document.pdf')}"`);
    res.send(room.pdfBuffer);
  });

  // Socket.io handlers
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-room", (roomId: string) => {
      if (socket.data.roomId) {
        socket.leave(socket.data.roomId);
      }
      socket.join(roomId);
      socket.data.roomId = roomId;

      const room = getRoom(roomId);
      socket.emit("sync:state", {
        hasPdf: !!room.pdfBuffer,
        pdfName: room.pdfName,
        strokes: room.strokes
      });
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on("draw:start", (stroke: Stroke) => {
      const roomId = socket.data.roomId;
      if (!roomId) return;
      const room = getRoom(roomId);
      room.strokes.push(stroke);
      socket.to(roomId).emit("draw:start", stroke);
    });

    socket.on("draw:move", (data: { id: string, point: Point }) => {
      const roomId = socket.data.roomId;
      if (!roomId) return;
      const room = getRoom(roomId);
      const stroke = room.strokes.find(s => s.id === data.id);
      if (stroke) {
        stroke.points.push(data.point);
        socket.to(roomId).emit("draw:move", data);
      }
    });

    socket.on("draw:end", (data: { id: string }) => {
      const roomId = socket.data.roomId;
      if (!roomId) return;
      socket.to(roomId).emit("draw:end", data);
    });

    socket.on("draw:clear", () => {
      const roomId = socket.data.roomId;
      if (!roomId) return;
      const room = getRoom(roomId);
      room.strokes = [];
      io.to(roomId).emit("strokes:sync", room.strokes);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  // Since this is now a standalone backend, we don't serve Vite here anymore.
  app.get('/', (req, res) => {
    res.send("Co-Sign PDF Backend is running.");
  });

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
