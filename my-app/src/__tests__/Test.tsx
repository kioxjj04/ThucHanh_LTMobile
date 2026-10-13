import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { describe, expect, test, jest, beforeEach, afterEach } from "@jest/globals";
import TourItem from "../components/TourItem"; // Cập nhật đường dẫn thực tế của bạn
import { Tour } from "../types/Tour";

// Giả lập (Mock) các hàm utils để cô lập tầng giao diện của Component
jest.mock("../utils/tours", () => ({
  formatDate: (date) => `Formatted: ${date}`,
  getSeatLabel: (seats) => `Còn ${seats} chỗ`,
}));

const mockTour: Tour = {
  id: "99",
  name: "Tour Siêu Cấp",
  city: "Hồ Chí Minh",
  day: 3,
  price: 5000000,
  seats: 2, // < 3 để test cả logic màu chữ cảnh báo nếu cần
  departure: "2026-12-25",
  image: "https://example.com",
  isFavorite: false,
};

describe("TourItem Component - Unit Tests", () => {
  const mockOnPress = jest.fn();
  const mockOnToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // --- Khối 1: Kiểm thử giao diện hiển thị theo Props ---
  describe("Render hiển thị", () => {
    test("Hiển thị đầy đủ thông tin chi tiết khi ở chế độ danh sách thường (compact = false)", () => {
      const { getByText, queryByText } = render(
        <TourItem
          tour={mockTour}
          compact={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />
      );

      // Đảm bảo hiển thị tên, thành phố và định dạng ngày/tháng từ hàm util
      expect(getByText("Tour Siêu Cấp")).toBeTruthy();
      expect(getByText("📍 Hồ Chí Minh")).toBeTruthy();
      expect(getByText("Formatted: 2026-12-25 • 3 ngày")).toBeTruthy();
      expect(getByText("5.000.000 ₫")).toBeTruthy();
      expect(getByText("Còn 2 chỗ")).toBeTruthy();
    });

    test("Ẩn hoàn toàn thông tin Thành phố và Số chỗ khi ở chế độ thu nhỏ (compact = true)", () => {
      const { getByText, queryByText } = render(
        <TourItem
          tour={mockTour}
          compact={true}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />
      );

      expect(getByText("Tour Siêu Cấp")).toBeTruthy();
      expect(queryByText("📍 Hồ Chí Minh")).toBeNull(); // 📍 Phải ẩn đi khi compact = true
      expect(queryByText("Còn 2 chỗ")).toBeNull();     // Số chỗ ngồi cũng phải ẩn đi
    });

    test("Hiển thị biểu tượng tim chính xác dựa trên trạng thái yêu thích", () => {
      // Trường hợp chưa yêu thích (isFavorite = false)
      const { getByText, rerender } = render(
        <TourItem
          tour={{ ...mockTour, isFavorite: false }}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />
      );
      expect(getByText("♡")).toBeTruthy();

      // Trường hợp đã yêu thích (isFavorite = true)
      rerender(
        <TourItem
          tour={{ ...mockTour, isFavorite: true }}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />
      );
      expect(getByText("❤️")).toBeTruthy();
    });
  });

  // --- Khối 2: Kiểm thử tương tác và Sự kiện ---
  describe("Tương tác người dùng", () => {
    test("Kích hoạt onPress khi người dùng nhấn vào thẻ Tour", () => {
      const { getByText } = render(
        <TourItem
          tour={mockTour}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />
      );

      // Tìm một thành phần chữ đại diện trong thẻ để kích hoạt press thẻ cha
      fireEvent.press(getByText("Tour Siêu Cấp"));
      expect(mockOnPress).toHaveBeenCalledTimes(1);
      expect(mockOnPress).toHaveBeenCalledWith(mockTour);
    });

    test("Nhấn nút tim phát sự kiện đổi trạng thái và không lan truyền kích hoạt thẻ cha", () => {
      const { getByTestId } = render(
        <TourItem
          tour={mockTour}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />
      );

      const favBtn = getByTestId("fav-btn");
      fireEvent.press(favBtn);

      // Mong đợi hàm toggle fav được gọi với tham số ID và đảo trạng thái boolean (false -> true)
      expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
      expect(mockOnToggleFavorite).toHaveBeenCalledWith("99", true);
    });
  });
});
