// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to My App</h1>
      <div className="space-x-4">
        <Link href="/signup">
          <span className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Sign Up
          </span>
        </Link>
        <Link href="/login">
          <span className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
}
