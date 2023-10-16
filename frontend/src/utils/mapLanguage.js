export const mapLanguage = (clientLanguage) => {
  switch (clientLanguage) {
    case "cpp":
      return "cpp";
    case "php":
      return "php";
    case "python":
      return "py";
    case "javascript":
      return "js";
    default:
      return clientLanguage;
  }
};
  
  