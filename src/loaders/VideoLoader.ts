import DataLoader from 'dataloader';
import { In } from 'typeorm';
import Video from '../entity/Video';

type BatchVideo = (keys: readonly number[]) => Promise<Video[]>;

const batchVideos: BatchVideo = async (keys: readonly number[]) => {
  const videos = await Video.find({
    where: { postId: In(keys as number[]) },
  });

  const videosMap: Record<number, Video> = {};
  videos.forEach((video) => {
    videosMap[video.id] = video;
  });

  return keys.map((key) => videosMap[key]);
};

export const videoLoader: DataLoader<number, Video> = new DataLoader(batchVideos);
