export const getCellColor = (statusData) => {
  switch (statusData) {
    case "AC: Accepted (Kết quả đúng)":
      return "green";
    case "CE: Compile Error (Lỗi biên dịch)":
      return "#3085d6";
    case "WA: Wrong Answer (Kết quả sai)":
      return "red";
    default:
      return "black";
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

export function calculateOverallStatus(testsResult) {
  if (testsResult.length === 0) {
    return <div style={{ color: 'gray' }}>No Tests</div>;
  }

  const isAllAccepted = testsResult.every(
    (test) => test.status_data === "AC: Accepted (Kết quả đúng)"
  );

  let resultMessage = "A: Other Error (Lỗi khác)";

  if (isAllAccepted) {
    resultMessage = "AC: Accepted (Kết quả đúng)";
  } else {
    for (const test of testsResult) {
      if (test.status_data !== "AC: Accepted (Kết quả đúng)") {
        resultMessage = test.status_data;
        break;
      }
    }
  }

  return <div style={{color: getCellColor(resultMessage)}}>{resultMessage}</div>;
}

export function getTotalTime(testsResult) {
  if (testsResult.length === 0) {
    return "0s";
  }
  const totalTime = testsResult.reduce((totalTime, test) => totalTime + test.time, 0).toFixed(2);
  return totalTime + "s";
}

export function getTotalMemory(testsResult) {
  if (testsResult.length === 0) {
    return "0 MB";
  }
  const totalMemory = testsResult.reduce((totalMemory, test) => totalMemory + test.memory, 0).toFixed(2);
  return totalMemory + " MB";
}