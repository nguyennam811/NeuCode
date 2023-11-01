export const getCellColor = (statusData) => {
  switch (statusData) {
    case "AC: Accepted (Kết quả đúng)":
      return "green";
    // case "CE: Compile Error (Lỗi biên dịch)":
    //   return "black";
    default:
      return "red";
  }
};

export const getColorDifficulty = (difficulty) => {
  switch (difficulty) {
    case "Dễ":
      return "<span style='color: green;'>Dễ</span>";
    case "Trung bình":
      return "<span style='color: blue;'>Trung bình</span>";
    case "Khó":
      return "<span style='color: red;'>Khó</span>";
    default:
      return "<span style='color: black;'>Khác</span>";
  }
};
