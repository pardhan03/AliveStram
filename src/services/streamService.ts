import { pexelsApiClient } from './api/client';
import { ENDPOINTS } from './api/endpoints';

export interface StreamerItem {
  id: string;
  name: string;
  views: string;
  flag: string;
  imageUri: string;
  avatarUri: string;
}

const names = [
  "Emma Wilson",
  "Sophia Chen",
  "Olivia Brown",
  "Ava Martinez",
  "Mia Anderson",
  "Charlotte Lee",
  "Emily Garcia",
  "Luna Kim",
  "Isabella Davis",
  "Harper Clark",
];

const flags = ["🇮🇳", "🇵🇭", "🇧🇷", "🇻🇳", "🇹🇭", "🇺🇸"];

const randomViewCount = () => {
  const value = (Math.random() * 40 + 1).toFixed(1);
  return `${value}K`;
};

export async function getLiveStreamers(): Promise<StreamerItem[]> {
  try {
    const response = await pexelsApiClient.get(ENDPOINTS.PEXELS_SEARCH);
    const data = response.data;

    return data.photos.map((photo: any, index: number): StreamerItem => ({
      id: String(photo.id),
      name: names[index % names.length],
      views: randomViewCount(),
      flag: flags[index % flags.length],
      imageUri: photo.src.large,
      avatarUri: photo.src.medium,
    }));
  } catch (error) {
    console.error('Error fetching live streamers:', error);
    return [];
  }
}
