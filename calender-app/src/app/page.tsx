import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center mt-20">
        <Link href={"./calender"}>
          <button
            className="
            bg-blue-500
            hover:bg-blue-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            flex items-center
          "
          >
            <span className="mr-2">カレンダーを表示</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </button>
        </Link>
      </div>
    </main>
  );
}
