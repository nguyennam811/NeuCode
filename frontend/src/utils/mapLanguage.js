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

export const mapLanguageSubmission = (language_submission) => {
  switch (language_submission) {
    case "cpp":
      return "C++";
    case "php":
      return "PHP";
    case "py":
      return "Python";
    case "js":
      return "Javascript";
    default:
      return language_submission;
  }
};
  
  