import { postLoader } from './PostLoader';
import { videoLoader } from './VideoLoader';

export interface Loaders {
  postLoader: typeof postLoader;
  videoLoader: typeof videoLoader;
}

export default {
  postLoader,
  videoLoader,
} as Loaders;
