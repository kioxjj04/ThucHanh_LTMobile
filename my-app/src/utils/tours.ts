import { Tour } from "../types/Tour";

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const cleanDate = dateStr.substring(0, 10);
  const [year, month, day] = cleanDate.split("-");
  return `${day}/${month}/${year}`;
}

export function getSeatLabel(seats: number | string): string {
  const numSeats = Number(seats) || 0;
  if (numSeats === 0) {
    return "Hết chỗ";
  } else if (numSeats >= 1 && numSeats <= 3) {
    return `Chỉ còn ${numSeats} chỗ`;
  } else {
    return `Còn ${numSeats} chỗ`;
  }
}

export function groupByCity(tours: Tour[]) {
  const groups: { [key: string]: Tour[] } = {};

  tours.forEach((tour) => {
    if (!groups[tour.city]) {
      groups[tour.city] = [];
    }
    groups[tour.city].push(tour);
  });

  return Object.keys(groups)
    .sort((a, b) => a.localeCompare(b, "vi"))
    .map((city) => {
      const sortedData = groups[city].sort((a, b) =>
        a.departure.localeCompare(b.departure)
      );
      return {
        title: city,
        data: sortedData,
      };
    });
}
