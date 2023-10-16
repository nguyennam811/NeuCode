import moment from "moment";

const formatTime = (date) => {
  const seconds = Math.floor((Date.now() - Date.parse(date)) / 1000);

  let n = Math.floor(seconds / 86400);
  if (n > 0 && n < 8) {
    return n + " days ago";
  }

  if (n > 7) {
    return moment(date).format("DD-MM-yyyy");
  }

  n = Math.floor(seconds / 3600);
  if (n >= 1) {
    return n + " hours ago";
  }

  n = Math.floor(seconds / 60);
  if (n >= 1) {
    return n + " minutes ago";
  }

  if (seconds < 10) return "just now";

  return Math.floor(seconds) + " seconds ago";
};

export const formatResponseTime = (createTime) => {
  if (!createTime) return "";

  return formatTime(createTime);
};

export const formatTimeSubmit = (timeSubmit) => {
  const isoDate = new Date(timeSubmit);

  const day = isoDate.getDate();
  const month = isoDate.getMonth() + 1; // Lưu ý rằng tháng trong JavaScript bắt đầu từ 0, nên cần cộng thêm 1.
  const year = isoDate.getFullYear();

  const hours = isoDate.getHours();
  const minutes = isoDate.getMinutes();
  const seconds = isoDate.getSeconds();

  // Định dạng lại các giá trị thành chuỗi với định dạng mong muốn
  const formattedDate = `${day < 10 ? "0" : ""}${day}-${
    month < 10 ? "0" : ""
  }${month}-${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};
