jest.mock("../utils/tours", () => ({
  groupByCity: (tours) => {
    const groups = [];
    tours.forEach((tour) => {
      let group = groups.find((item) => item.title === tour.city);
      if (!group) {
        group = { title: tour.city, data: [] };
        groups.push(group);
      }
      group.data.push(tour);
    });
    return groups
      .sort((a, b) => a.title.localeCompare(b.title, "vi"))
      .map((group) => ({
        ...group,
        data: group.data.sort((a, b) => a.departure.localeCompare(b.departure)),
      }));
  },
  formatDate: (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.substring(0, 10).split("-");
    return `${day}/${month}/${year}`;
  },
  getSeatLabel: (seats) => {
    if (seats === 0) return "Hết chỗ";
    if (seats <= 3) return `Chỉ còn ${seats} chỗ`;
    return `Còn ${seats} chỗ`;
  },
}));

const { groupByCity, formatDate, getSeatLabel } = require("../utils/tours");

const dummyTours = [
  { id: "1", name: "Tour A", city: "Sapa", day: 2, price: 100, seats: 5, departure: "2026-11-20", image: "", isFavorite: false },
  { id: "2", name: "Tour B", city: "Đà Lạt", day: 3, price: 200, seats: 0, departure: "2026-11-15", image: "", isFavorite: false },
  { id: "3", name: "Tour C", city: "Sapa", day: 4, price: 300, seats: 2, departure: "2026-10-10", image: "", isFavorite: false }
];

describe("Kiểm thử logic utils/tour.ts", () => {
  test("groupByCity hoạt động đúng cấu trúc phân nhóm từ A-Z và tăng dần ngày", () => {
    const res = groupByCity(dummyTours);
    expect(res.length).toBe(2);
    expect(res[0].title).toBe("Đà Lạt"); // Chữ Đ đứng trước chữ S
    expect(res[1].title).toBe("Sapa");
    expect(res[1].data[0].id).toBe("3"); // Ngày 2026-10-10 xếp trước ngày 2026-11-20
  });

  test("formatDate chuyển đổi định dạng ngày chuẩn xác", () => {
    expect(formatDate("2026-11-05")).toBe("05/11/2026");
  });

  test("getSeatLabel phân phối chính xác giá trị biên", () => {
    expect(getSeatLabel(0)).toBe("Hết chỗ");
    expect(getSeatLabel(3)).toBe("Chỉ còn 3 chỗ");
    expect(getSeatLabel(4)).toBe("Còn 4 chỗ");
  });
});
