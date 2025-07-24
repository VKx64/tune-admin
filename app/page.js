import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">
          Tune Admin
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-600">
          Welcome to your Admin Assboard. Test CI/CD lol
        </p>
        <div className="mt-12 flex items-center justify-center gap-x-6">
          <Link
            href="/users"
            className="rounded-lg bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
          >
            Manage Users
          </Link>
          <Link href="/auth" className="text-base font-semibold leading-6 text-gray-900 hover:text-gray-700 transition-colors duration-200">
            Go to Login <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

