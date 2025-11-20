import { useState, useEffect } from "react";
import { createCards, Card } from "./Card";

/**
 * Type definition for a single card object
 */
type CardType = {
  id: string; // Unique identifier for the card
  image: string; // Path to the card's face image
  matched: boolean; // Whether this card has been matched
  revealed: boolean;
};

/**
 * Props that the Card component accepts
 */
type CardProps = {
  card: CardType; // The card data object
  flipped: boolean; // Whether the card is currently flipped over
  handleClick: () => void; // Function to call when card is clicked
};

function Gameboard() {
  // useState - <> declares the type, [] uses array destructuring to extract 2 values, the current state value and the second is a function to update it. () contains the initial value of the state
  const [deck, setDeck] = useState<CardType[]>([]); //initialize with an empty array, will be populated when component mounts
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [firstSelection, setFirstSelection] = useState<CardType | null>(null); // State: Track the FIRST selected card (null if none selected)
  const [secondSelection, setSecondSelection] = useState<CardType | null>(null); // State: Track the SECOND selected card (null if none selected)
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matchesFound, setMatchesFound] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [flipDelay, setFlipDelay] = useState(800);

  // Initialize deck on mount - add revealed: false to each card
  useEffect(() => {
    // call createCards to generate and shuffle the deck
    const initialDeck = createCards().map((card) => ({
      ...card,
      revealed: false,
    }));

    //store the shuffled deck in state
    setDeck(initialDeck);
  }, []); // Empty dependency array = run only once on mount

  /**
   * handleClick - Called when a user clicks on a card
   * Implements "selection handling" by tracking first and second card picks
   * @param cardId - The unique ID of the card that was clicked
   */
  const handleClick = (cardId: string) => {
    // Find the clicked card in the deck
    const clickedCard = deck.find((card) => card.id === cardId);

    // GUARD: Exit if card not found (shouldn't happen)
    if (!clickedCard) return;

    // GUARD: Prevent clicking cards that are already matched
    if (clickedCard.matched) return;

    // GUARD: Prevent clicking cards that are already revealed
    if (clickedCard.revealed) return;

    // GUARD: Prevent clicking if two cards are already selected
    // (Wait for them to be checked/flipped back first)
    if (firstSelection && secondSelection) return;

    // SET REVEALED FLAG: Mark this card as face-up in the deck
    setDeck((prevDeck) =>
      prevDeck.map(
        (card) =>
          card.id === cardId
            ? { ...card, revealed: true } // Flip this card face-up
            : card // Leave other cards unchanged
      )
    );

    // SELECTION HANDLING: Determine if this is the first or second selection
    if (!firstSelection) {
      // No cards selected yet → this becomes the FIRST selection
      setFirstSelection(clickedCard);
      console.log("First card selected:", clickedCard);
    } else {
      // First card already selected → this becomes the SECOND selection
      setSecondSelection(clickedCard);
      console.log("Second card selected:", clickedCard);

      // Note: Steps 7-8 will add the comparison logic here
      // For now, cards just stay revealed after being clicked
    }
  };

  // Render: Display all cards in a grid layout
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{
        backgroundImage: "url(/assets/game_bg)",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="max-w-2xl w-full">
        {/* Game title */}
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Memory Card Game
        </h1>

        {/* Card grid container */}
        <div className="grid grid-cols-5 gap-4 justify-items-center">
          {/* 
            MAP through deck array and render a Card for each card object
            - card: the card data object
            - key: unique identifier for React's reconciliation
            - flipped: for now, always false (we'll implement this in step 5)
            - handleClick: empty function for now (we'll implement this in step 5)
          */}
          {deck.map((card) => (
            <Card
              key={card.id}
              card={card}
              flipped={card.revealed}
              handleClick={() => handleClick(card.id)}
            />
          ))}
        </div>

        {/* Game stats (placeholder for future steps) */}
        <div className="mt-8 text-center text-white">
          <p className="text-lg">Moves: 0</p>
          <p className="text-lg">Matches: 0 / 5</p>
        </div>
      </div>
    </div>
  );
}

export default Gameboard;
