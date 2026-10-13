export interface Tour {
  id: string;
  name: string;
  city: string;
  day: number | string;    
  price: number | string;   
  seats: number | string;
  departure: string;
  image: string;
  isFavorite: boolean;
}

