export interface SampleProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  salesCount: number;
  image: string;
  description: string;
  specs: {
    screen: string;
    ram: string;
    storage: string;
    battery: string;
  };
}

export const SAMPLE_PRODUCTS: SampleProduct[] = [
  {
    id: 'p1',
    name: 'Vsmart Joy 3 64GB',
    category: 'Điện thoại',
    price: 1790000,
    originalPrice: 2290000,
    rating: 4.8,
    salesCount: 1420,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80',
    description: 'Vsmart Joy 3 với màn hình lớn 6.5 inch, 3 camera AI chụp ảnh sắc nét, viên pin khủng 5000mAh hỗ trợ sạc nhanh Quick Charge 3.0.',
    specs: {
      screen: '6.5" HD+ IPS LCD',
      ram: '3 GB',
      storage: '32 GB / 64 GB',
      battery: '5000 mAh, Sạc nhanh 18W',
    },
  },
  {
    id: 'p2',
    name: 'iPhone 15 Pro 128GB',
    category: 'Điện thoại',
    price: 25490000,
    originalPrice: 28990000,
    rating: 4.9,
    salesCount: 890,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80',
    description: 'Khung viền Titan chuẩn hàng không vũ trụ siêu nhẹ, chip A17 Pro đỉnh cao và camera 48MP chất lượng điện ảnh.',
    specs: {
      screen: '6.1" Super Retina XDR OLED 120Hz',
      ram: '8 GB',
      storage: '128 GB',
      battery: '3274 mAh, Sạc 20W',
    },
  },
  {
    id: 'p3',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Điện thoại',
    price: 27990000,
    originalPrice: 31990000,
    rating: 4.9,
    salesCount: 650,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80',
    description: 'Quyền năng Galaxy AI tiên tiến, màn hình phẳng Dynamic AMOLED 2X sáng 2600 nits, bút S Pen tích hợp.',
    specs: {
      screen: '6.8" QHD+ AMOLED 120Hz',
      ram: '12 GB',
      storage: '256 GB',
      battery: '5000 mAh, Sạc siêu nhanh 45W',
    },
  },
  {
    id: 'p4',
    name: 'Sony WH-1000XM5',
    category: 'Tai nghe',
    price: 6990000,
    originalPrice: 8490000,
    rating: 4.7,
    salesCount: 430,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'Công nghệ chống ồn chủ động dẫn đầu ngành công nghiệp với 8 micro và 2 bộ xử lý Auto NC Optimizer.',
    specs: {
      screen: 'Không có màn hình',
      ram: 'Bluetooth 5.2 LDAC',
      storage: 'Thời lượng pin 30h',
      battery: 'Sạc nhanh 3 phút nghe 3 giờ',
    },
  },
  {
    id: 'p5',
    name: 'Apple Watch Series 9',
    category: 'Đồng hồ',
    price: 9990000,
    originalPrice: 11490000,
    rating: 4.8,
    salesCount: 380,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    description: 'Chip S9 SiP mạnh mẽ mới, thao tác chạm hai lần Double Tap kỳ diệu, màn hình sáng gấp đôi.',
    specs: {
      screen: '1.9" OLED Always-On 2000 nits',
      ram: '1 GB',
      storage: '64 GB',
      battery: '18 giờ sử dụng liên tục',
    },
  },
  {
    id: 'p6',
    name: 'MacBook Air M3 13 inch',
    category: 'Laptop',
    price: 27990000,
    originalPrice: 29990000,
    rating: 5.0,
    salesCount: 512,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    description: 'Thiết kế nhôm siêu mỏng nhẹ dưới 1.2kg, sức mạnh đột phá từ vi xử lý Apple M3 3nm, pin lên đến 18 tiếng.',
    specs: {
      screen: '13.6" Liquid Retina 500 nits',
      ram: '16 GB Unified Memory',
      storage: '512 GB SSD siêu tốc',
      battery: 'Pin 52.6Wh, sạc MagSafe 3',
    },
  },
];
