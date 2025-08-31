export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  const truncated = text.substring(0, maxLength).trim();
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace === -1) {
    return truncated + "...";
  }
  return truncated.substring(0, lastSpace) + "...";
};

export const convertString = (inputString) => {
  // Loại bỏ dấu tiếng Việt và chuyển sang chữ thường
  let convertedString = inputString
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  // Loại bỏ khoảng trắng ở đầu và cuối chuỗi, thay thế khoảng trắng bằng dấu gạch ngang
  convertedString = convertedString.trim().replace(/\s/g, "-");

  // Loại bỏ dấu chấm ở cuối chuỗi
  if (convertedString.endsWith(".")) {
    convertedString = convertedString.slice(0, -1);
  }

  return convertedString;
};
