import { postLoader } from './PostLoader';

export interface Loaders {
  postLoader: typeof postLoader;
}

export default {
  postLoader,
} as Loaders;
