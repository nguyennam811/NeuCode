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
