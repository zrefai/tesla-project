import dotenv from 'dotenv';
import dbClient from '@config/db-client';
import startApolloServer from '@config/apollo-server';
import { verifyEnvVariables } from '../../../libraries/utils/dist';

dotenv.config();

verifyEnvVariables(['MONGO_DB_CONNECTION_STRING', 'MONGO_DB_NAME']);

dbClient
  .then(async () => {
    console.log('DB client connected');
    startApolloServer();
  })
  .catch((reason: string) => {
    console.log('An error occurred started the DB client');
    console.log(reason);
  });
