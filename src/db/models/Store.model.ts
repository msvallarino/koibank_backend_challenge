import mongoose, { PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export interface IStore {
  _id?: string;
  name: string;
  cuit: string;
  concepts: string[];
  currentBalance: number;
  active: boolean;
  lastSale: Date;
}

const StoreSchema = new mongoose.Schema<IStore>(
  {
    name: String,
    cuit: String,
    concepts: Array,
    currentBalance: Number,
    active: Boolean,
    lastSale: Date,
  },
  { timestamps: true }
);

StoreSchema.plugin(paginate);

/**
 * This ideally should be on its own pagination config file but for
 * simplicity we leave it here.
 */
export const paginationCustomLabels = {
  docs: 'stores',
  page: 'page',
  totalPages: 'pages',
  limit: 'limit',
  totalDocs: 'total',
};

export interface IStoreDoc extends IStore, Document {}

export default mongoose.model<IStoreDoc, PaginateModel<IStoreDoc>>('Store', StoreSchema);
