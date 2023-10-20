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
      return "green";
    case "Trung bình":
      return "Yellow";
    case "Khó":
      return "red";
    default:
      return "black";
  }
};
