import { getAll, create, createManyStores, QueryOptions, GetAllResponse } from '../db/dal/Store';
import { IStore } from '../db/models/Store';
import Logger from '../utils/logger';

export default class StoreService {
  static async getAllStores({ page = 1, limit = 10 }: QueryOptions): Promise<GetAllResponse> {
    const stores = await getAll({ page, limit });

    Logger.info('Successfully retrieved all stores', stores);

    return stores;
  }

  static async createStore(newStore: IStore): Promise<IStore> {
    const createdStore = await create(newStore);

    Logger.info('Successfully created new store', createdStore);

    return createdStore;
  }

  static async createMultipleStores(newStores: IStore[]): Promise<IStore[]> {
    const createdStores = await createManyStores(newStores);

    Logger.info('Successfully created new stores', createdStores);

    return createdStores;
  }
}
