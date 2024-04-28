import bodyParser from 'body-parser';
import cors from 'cors';
import { Application } from 'express';
import helmet from 'helmet';

export default (app: Application): void => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.enable('trust proxy');
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json({ limit: '10000mb' }));
};
