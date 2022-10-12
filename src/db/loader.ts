import { createInitialStores, createInitialUsers } from './seeder';
import Logger from '../utils/logger';
import connectDB from './config';

export const dbLoader = async () => {
  try {
    const client = await connectDB();

    /**
     * Drop all existing collections
     * IMPORTANT: This is only for developing this demo, you SHOULD NOT do this for any environment
     * you will be dropping all your data.
     */
    const collections = await client.listCollections().toArray();
    await Promise.all(collections.map(collection => client.dropCollection(collection.name)));

    // Create initial User
    await createInitialStores();

    // Create initial Stores
    await createInitialUsers();
  } catch (error) {
    Logger.error('Could not load db');
    process.exit(1);
  }
};
