import { memo, lazy, Suspense } from "react";

const MovieCard = lazy(() => {
  return import('./MovieCard')
    .then(({ MovieCard }) => ({ default: MovieCard }))
});

interface ContentProps {
  selectedGenre: {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

function ContentComponent({ selectedGenre, movies }: ContentProps) {
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          <Suspense fallback={<div>Carregando...</div>}>
            {movies.map(movie => (
              <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </Suspense>

        </div>
      </main>
    </div>
  )
}

export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.movies, nextProps.movies)
})