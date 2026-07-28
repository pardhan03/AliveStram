import { pexelsApiClient } from './api/client';
import { ENDPOINTS } from './api/endpoints';

export interface StreamerItem {
  id: string;
  name: string;
  views: string;
  flag: string;
  countryId: string;
  imageUri: string;
  avatarUri: string;
  isLive: boolean; // Added live indicator status
}

const STREAMERS_DATA = [
  { name: "Emma Wilson", flag: "🇮🇳", countryId: "india" },
  { name: "Sophia Chen", flag: "🇵🇭", countryId: "philippines" },
  { name: "Olivia Brown", flag: "🇧🇷", countryId: "brazil" },
  { name: "Ava Martinez", flag: "🇻🇳", countryId: "vietnam" },
  { name: "Mia Anderson", flag: "🇮🇳", countryId: "india" },
  { name: "Charlotte Lee", flag: "🇵🇭", countryId: "philippines" },
  { name: "Emily Garcia", flag: "🇧🇷", countryId: "brazil" },
  { name: "Luna Kim", flag: "🇻🇳", countryId: "vietnam" },
  { name: "Isabella Davis", flag: "🇮🇳", countryId: "india" },
  { name: "Harper Clark", flag: "🇵🇭", countryId: "philippines" },
];

const randomViewCount = () => {
  const value = (Math.random() * 40 + 1).toFixed(1);
  return `${value}K`;
};

export async function getLiveStreamers(
  searchQuery?: string,
  countryFilter?: string
): Promise<StreamerItem[]> {
  try {
    const response = await pexelsApiClient.get(ENDPOINTS.PEXELS_SEARCH);
    const data = response.data;

    let streamers: StreamerItem[] = data.photos.map((photo: any, index: number) => {
      const meta = STREAMERS_DATA[index % STREAMERS_DATA.length];
      return {
        id: String(photo.id),
        name: meta.name,
        views: randomViewCount(),
        flag: meta.flag,
        countryId: meta.countryId,
        imageUri: photo.src.large,
        avatarUri: photo.src.medium,
        isLive: true, // Set live status
      };
    });

    // 1. Filter by Search Query (Name)
    if (searchQuery && searchQuery.trim() !== '') {
      streamers = streamers.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }

    // 2. Filter by Country ID
    if (countryFilter && countryFilter !== 'global') {
      streamers = streamers.filter((item) => item.countryId === countryFilter);
    }

    return streamers;
  } catch (error) {
    console.error('Error fetching live streamers:', error);
    return [];
  }
}