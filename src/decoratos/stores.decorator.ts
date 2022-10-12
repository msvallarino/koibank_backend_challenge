import { GetAllResponse } from '../db/dal/Store';
import { IStore } from '../db/models/Store';

export type FormattedGetAllStores = {
  stores: any;
  total: number;
  limit: number;
  pages: number;
  page: number;
};

export const formatGetAllStore = (getAllResponse: GetAllResponse) => {
  const { stores, total, limit, pages, page } = getAllResponse;
  const formattedStores = stores.map(formatStore);

  return {
    data: formattedStores,
    total,
    limit,
    pages,
    page,
  };
};

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatStore = (store: IStore) => {
  return {
    id: store._id,
    Comercio: store.name,
    CUIT: store.cuit,
    Conceptos: store.concepts,
    'Balance actual:': currencyFormatter.format(store.currentBalance),
    Activo: store.active ? 'Si' : 'No',
    'Ultima venta:': store.lastSale.toLocaleString(),
  };
};
