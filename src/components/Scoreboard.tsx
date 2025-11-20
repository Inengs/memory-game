type ScoreboardProps = {
  moves: number;
  matchesFound: number;
  totalPairs: number;
  bestScore: number | null;
};

function Scoreboard({
  moves,
  matchesFound,
  totalPairs,
  bestScore,
}: ScoreboardProps) {
  return (
    <div className="mt-8 text-center text-white">
      <p className="text-lg">Moves: {moves}</p>
      <p className="text-lg">
        Matches: {matchesFound} / {totalPairs}
      </p>
      {bestScore !== null && (
        <p className="text-lg">Best Score: {bestScore} moves</p>
      )}
    </div>
  );
}

export default Scoreboard;
