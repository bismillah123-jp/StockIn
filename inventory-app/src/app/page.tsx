import { login } from './login/actions';

// Define a more specific type for the page props
type LoginPageProps = {
  searchParams?: {
    message?: string;
  };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  // We can simplify this now since we know `message` is a string
  const message = searchParams?.message;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-sm rounded-lg bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-purple-400">
          Inventory Login
        </h1>
        <form
          action={login}
          className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="mb-4 rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="mb-6 rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <button className="rounded-md bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700">
            Sign In
          </button>
          {message && (
            <p className="mt-4 p-4 text-center text-red-400 bg-red-900/20 rounded-md">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

