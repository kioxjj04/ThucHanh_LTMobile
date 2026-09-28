export interface PhoneColor {
  id: string;
  name: string;
  codeName: string;
  hex: string;
  imageKey: 'silver' | 'red' | 'black' | 'blue';
  description: string;
}

export interface PhoneProduct {
  id: string;
  name: string;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  supplier: string;
  returnPolicyText: string;
  colors: PhoneColor[];
}

export const LOCAL_PHONE_DATA: PhoneProduct = {
  id: '1',
  name: 'Vsmart Joy 3',
  title: 'Điện Thoại Vsmart Joy 3 - Hàng chính hãng',
  price: 1790000,
  originalPrice: 1790000,
  rating: 5,
  reviewCount: 828,
  supplier: 'Tiki Trading',
  returnPolicyText: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
  colors: [
    {
      id: 'silver',
      name: 'Bạc Titan',
      codeName: 'bạc',
      hex: '#C5F1FB',
      imageKey: 'silver',
      description: 'Màu Bạc sang trọng, ánh kim thanh lịch',
    },
    {
      id: 'red',
      name: 'Đỏ Ruby',
      codeName: 'đỏ',
      hex: '#F30D0D',
      imageKey: 'red',
      description: 'Màu Đỏ cá tính, năng động nổi bật',
    },
    {
      id: 'black',
      name: 'Đen Huyền Bí',
      codeName: 'đen',
      hex: '#000000',
      imageKey: 'black',
      description: 'Màu Đen cổ điển, mạnh mẽ lịch lãm',
    },
    {
      id: 'blue',
      name: 'Xanh Dương',
      codeName: 'xanh dương',
      hex: '#234896',
      imageKey: 'blue',
      description: 'Màu Xanh chuyển sắc thời thượng, cuốn hút',
    },
  ],
};

// MockAPI endpoint (có thể dùng endpoint mockapi.io hoặc endpoint dự phòng)
const MOCK_API_URL = 'https://654877bbdd8ebcd4ab23075c.mockapi.io/api/v1/vsmart-joy-3';

export async function fetchPhoneFromApi(): Promise<{ data: PhoneProduct; isFromApi: boolean }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(MOCK_API_URL, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      const product = Array.isArray(json) ? json[0] : json;
      if (product && product.title) {
        return {
          data: {
            ...LOCAL_PHONE_DATA,
            ...product,
            colors: product.colors || LOCAL_PHONE_DATA.colors,
          },
          isFromApi: true,
        };
      }
    }
    // Fallback if API response is invalid
    return { data: LOCAL_PHONE_DATA, isFromApi: false };
  } catch (error) {
    // Graceful offline fallback
    console.log('Using local phone mock data (offline or API unavailable):', error);
    return { data: LOCAL_PHONE_DATA, isFromApi: false };
  }
}
