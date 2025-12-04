import express from 'express';
import cors from 'cors';
import { updateEstadoPipeline } from './updateEstadoPipeline.js';
import { asociadosRepository } from './repository.js';
import { MESSAGES, API_ENDPOINTS, GITHUB_DATA_URL } from './constants.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post(API_ENDPOINTS.UPDATE_ESTADO, updateEstadoPipeline);

app.get(API_ENDPOINTS.HEALTH, (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const seedData = async () => {
  try {
    const response = await fetch(GITHUB_DATA_URL);
    const data = await response.json();
    asociadosRepository.seed(data);
    console.log(`✅ ${MESSAGES.SUCCESS.SEEDED(data.length)}`);
  } catch (error) {
    console.error(`❌ ${MESSAGES.ERRORS.SEED_DATA}:`, error);
  }
};

app.listen(PORT, async () => {
  console.log(`🚀 ${MESSAGES.INFO.SERVER_RUNNING(Number(PORT))}`);
  await seedData();
});
