import JokeCard from './JokeCard';
import type { Joke } from '../types/joke.types';

interface JokeListProps {
  jokes: Joke[];
}

const JokeList: React.FC<JokeListProps> = ({ jokes }) => {
  if (jokes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No jokes found. Try a different search term!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jokes.map((joke) => (
        <JokeCard key={joke.id} joke={joke} />
      ))}
    </div>
  );
};

export default JokeList;