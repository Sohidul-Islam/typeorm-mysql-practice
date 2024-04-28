import { Application } from 'express';

import databaseLoader from './database';
import expressLoader from './express';
import Logger from '../logger';

export default async (app: Application): Promise<void> => {
  try {
    await databaseLoader();
    console.log('Database loaded and connected!');
    expressLoader(app);
    Logger.info('Express loaded!');
  } catch (err) {
    Logger.error('ERROR From loaded ::: ', err);
    throw err;
  }
};
