import { useState } from 'react';
import { Search, RefreshCw, Shuffle, Hash } from 'lucide-react';
import Header from './components/Header';
import JokeList from './components/JokeList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { useJokes } from './hooks/useJokes';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(15);
  const [jokeId, setJokeId] = useState('');
  
  const { jokes, loading, error, totalPages, currentPage, fetchJokes, fetchRandomJoke, fetchJokeById, refreshJokes, } = useJokes({ limit: 15 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJokes({
      query: searchQuery,
      limit: limit,
      page: 1,
    });
  };

  const handleFetchById = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(jokeId, 10);
    if (!isNaN(id) && id > 0) {
      fetchJokeById(id);
      setJokeId('');
    }
  };

  const handleRandomJoke = () => {
    fetchRandomJoke();
  };

  const handleRefresh = () => {
    refreshJokes();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Search & Filter
          </h2>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search by keyword
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., science, computer, ninja..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="limit"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Results per page
                </label>
                <select
                  id="limit"
                  value={limit}
                  onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search Jokes
            </button>
          </form>

          <div className="my-6 border-t border-gray-200 dark:border-gray-700"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <form onSubmit={handleFetchById} className="flex gap-2">
              <div className="relative flex-1">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={jokeId}
                  onChange={(e) => setJokeId(e.target.value)}
                  placeholder="Joke ID"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !jokeId}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                Get
              </button>
            </form>

            <button
              onClick={handleRandomJoke}
              disabled={loading}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Shuffle className="w-5 h-5" />
              Random Joke
            </button>

            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {!loading && !error && jokes.length > 0 && (
          <div className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages} • Showing {jokes.length} joke{jokes.length !== 1 ? 's' : ''}
          </div>
        )}

        {loading && <Loader />}
        {error && <ErrorMessage message={error} onRetry={refreshJokes} />}
        {!loading && !error && <JokeList jokes={jokes} />}
      </main>

      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Built with React 19, TypeScript, Tailwind CSS & Axios
          </p>
          <p className="text-xs mt-2 text-gray-400">
            Data provided by{' '}
            <a
              href="https://api.freeapi.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              FreeAPI
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;