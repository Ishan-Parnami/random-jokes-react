import { Tag } from 'lucide-react';
import type { Joke } from '../types/joke.types';

interface JokeCardProps {
  joke: Joke;
}

const JokeCard: React.FC<JokeCardProps> = ({ joke }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700">
      {/* Joke ID Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          #{joke.id}
        </span>
        
        {/* Categories */}
        {joke.categories && joke.categories.length > 0 && (
          <div className="flex gap-1">
            {joke.categories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
              >
                <Tag className="w-3 h-3" />
                {category}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Joke Content */}
      <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
        {joke.content}
      </p>
    </div>
  );
};

export default JokeCard;