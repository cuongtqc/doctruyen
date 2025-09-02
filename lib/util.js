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

export const convertStringBK = (inputString) => {
  // Loại bỏ dấu tiếng Việt và chuyển sang chữ thường
  let convertedString = inputString
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .toLowerCase();

  // Loại bỏ khoảng trắng ở đầu và cuối chuỗi, thay thế khoảng trắng bằng dấu gạch ngang
  convertedString = convertedString.trim().replace(/\s/g, "-");

  // Loại bỏ dấu chấm ở cuối chuỗi
  if (convertedString.endsWith(".")) {
    convertedString = convertedString.slice(0, -1);
  }

  return convertedString;
};

export const convertString = (str) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

  // Loại bỏ khoảng trắng ở đầu và cuối chuỗi, thay thế khoảng trắng bằng dấu gạch ngang
  str = str.trim().replace(/\s/g, "-");

  // Loại bỏ dấu chấm ở cuối chuỗi
  if (str.endsWith(".")) {
    str = str.slice(0, -1);
  }
  return str;
};

export function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export function displayTextDialog(html) {
  let quoteCount = 0;
  // Dùng regex để tìm tất cả các dấu ngoặc kép
  const processedText = html.replace(/"/g, (match, index) => {
    quoteCount++;

    if (index === 0) {
      return '"';
    }
    if (quoteCount % 2 === 1) {
      return '\n\n"';
    }
    // Thêm ngắt dòng chỉ khi đây là dấu ngoặc kép thứ 2, 4, 6...
    if (quoteCount % 2 === 0 && ![",", "."].includes(html.charAt(index + 1))) {
      return '"\n\n';
    }
    // Nếu là dấu ngoặc kép đầu tiên, 3, 5..., thì giữ nguyên
    return '"';
  });
  const result = processedText.replace(/\n\s*\n\s*\n\s*\n/g, "\n\n");
  return result;
}
