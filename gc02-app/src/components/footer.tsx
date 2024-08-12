export default function Footer() {
  return (
    <>
      <footer className="bg-slate-50 pt-16 pb-4 dark:bg-slate-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4  px-6 py-4 text-slate-100 font-light">
          <h2 className="col-span-2 md:col-span-1 inline-flex space-x-2">
            <img
              className="w-10 h-10 self-center"
              src="https://i.pinimg.com/280x280_RS/52/6a/20/526a20d929b698ba5b65d0ac5ea66eb0.jpg"
            />
            <span className="text-zinc-900 dark:text-zinc-100 font-bold text-2xl ms-10 self-center">
              Trade Card Game
            </span>
          </h2>
          <ul>
            <li className="text-zinc-900 dark:text-zinc-100 font-bold text-lg">
              Company
            </li>
            <li className="mt-2">
              <a
                href="/about"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                About
              </a>
            </li>
            <li className="mt-2">
              <a
                href="#"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Blog
              </a>
            </li>
            <li className="mt-2">
              <a
                href="#"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Jobs
              </a>
            </li>
            <li className="mt-2">
              <a
                href="#"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Press
              </a>
            </li>
          </ul>
          <ul>
            <li className="text-zinc-900 dark:text-zinc-100 font-bold text-lg">
              Quick Links
            </li>
            <li className="mt-2">
              <a
                href="#"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact Us
              </a>
            </li>
            <li className="mt-2">
              <a
                href="#"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                FAQ
              </a>
            </li>
            <li className="mt-2">
              <a
                href="#"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Booking
              </a>
            </li>
            <li className="mt-2">
              <a
                href="#"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Pages
              </a>
            </li>
          </ul>
          <ul>
            <li className="text-zinc-900 dark:text-zinc-100 font-bold text-lg">
              Services
            </li>
            <li className="mt-2">
              <a
                href="#"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Home
              </a>
            </li>
            <li className="mt-2">
              <a
                href="#"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact
              </a>
            </li>
            <li className="mt-2">
              <a
                href="#"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Blog
              </a>
            </li>
            <li className="mt-2">
              <a
                href="#"
                className="text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Press
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
