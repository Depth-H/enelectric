import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data.json");

// Initial data if file doesn't exist
const initialData = {
  siteInfo: {
    name: "주식회사 이엔전력",
    tagline: "호텔 & 모텔 프리미엄 전기공사 전문",
    description: "최고의 기술력과 신뢰를 바탕으로 호텔 및 모텔 전기공사의 새로운 기준을 제시합니다.",
    logo: "/logo.png",
    contact: {
      phone: "010-1234-5678",
      email: "info@enpower.co.kr",
      address: "서울특별시 강남구 테헤란로 123, 4층",
      kakao: "enpower_official"
    }
  },
  portfolio: [
    {
      id: "1",
      title: "그랜드 럭셔리 호텔 전기 시스템 구축",
      category: "호텔",
      description: "전 객실 스마트 조명 제어 및 전력 안정화 시스템 시공",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
      date: "2024-01-15"
    },
    {
      id: "2",
      title: "부티크 모텔 '더 스테이' 리모델링",
      category: "모텔",
      description: "노후 전기 설비 전면 교체 및 경관 조명 디자인 시공",
      image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1000",
      date: "2023-11-20"
    },
    {
      id: "3",
      title: "프리미어 비즈니스 호텔 소방 전기 공사",
      category: "호텔",
      description: "최첨단 화재 감지 및 비상 전력 시스템 구축",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
      date: "2023-09-05"
    }
  ],
  services: [
    {
      title: "호텔/모텔 특화 조명 설계",
      description: "분위기와 효율성을 동시에 잡는 최첨단 조명 시스템 설계 및 시공"
    },
    {
      title: "전력 시스템 안정화",
      description: "대규모 숙박 시설을 위한 안정적인 전력 공급 및 부하 분산 시스템"
    },
    {
      title: "소방 및 안전 시스템",
      description: "법적 기준을 상회하는 철저한 소방 전기 및 안전 설비 구축"
    }
  ]
};

async function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    await fs.writeJson(DATA_FILE, initialData, { spaces: 2 });
  }
}

async function startServer() {
  await ensureDataFile();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Request logger
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

  // API Routes
  app.get("/api/content", async (req, res) => {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        console.log("DATA_FILE not found, creating initial data...");
        await fs.writeJson(DATA_FILE, initialData, { spaces: 2 });
      }
      const data = await fs.readJson(DATA_FILE);
      res.json(data);
    } catch (err) {
      console.error("Error reading data.json:", err);
      res.status(500).json({ error: "Failed to read data" });
    }
  });

  app.post("/api/content", async (req, res) => {
    try {
      const newData = req.body;
      await fs.writeJson(DATA_FILE, newData, { spaces: 2 });
      res.json({ success: true, data: newData });
    } catch (err) {
      console.error("Error writing data.json:", err);
      res.status(500).json({ error: "Failed to write data" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  app.post("/api/contact", async (req, res) => {
    console.log("Contact form submission:", req.body);
    res.json({ success: true, message: "문의가 접수되었습니다." });
  });

  // Catch-all for API to prevent falling through to index.html
  app.all("/api/*", (req, res) => {
    console.log(`[API 404] ${req.method} ${req.url}`);
    res.status(404).json({ error: "API route not found", path: req.url });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
