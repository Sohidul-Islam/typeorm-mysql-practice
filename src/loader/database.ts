

import { Container } from 'typeorm-typedi-extensions';
import Logger from '../logger';
import { Connection, createConnection, useContainer } from 'typeorm';





useContainer(Container);


export default async (): Promise<Connection> => {
  try {
    // useContainer(Container);
    return await createConnection();
  } catch (err) {
    Logger.debug(err);
    throw err;
  }
};
