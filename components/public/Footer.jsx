export const Footer = () => {
  return (
    <footer className="bg-[#9CAFAA]rounded-lg shadow-xl">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          © 2025{" "}
          <a href="https://doctruyen.com/" className="hover:underline">
            Đọc truyện
          </a>
          . Các quyền đã được đăng ký.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          <li>
            <a href="#" className="hover:underline">
              Liên hệ
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
