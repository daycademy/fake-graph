import DataLoader from 'dataloader';
import { In } from 'typeorm';
import Video from '../entity/Video';

type BatchVideo = (keys: readonly number[]) => Promise<Video[][]>;

const batchVideos: BatchVideo = async (keys: readonly number[]) => {
  const videos = await Video.find({
    where: { id: In(keys as number[]) },
  });

  const videosMap: Record<number, Video[]> = {};
  // FIXME: make it prettier
  videos.forEach((video) => {
    videosMap[video.id] = videos.filter((video2) => video2.id === video.id);
  });

  return keys.map((key) => videosMap[key]);
};

export const videoLoader: DataLoader<number, Video[]> = new DataLoader(batchVideos);
