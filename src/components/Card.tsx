// import all the card face images
import books from "../assets/books.jpg";
import fashion from "../assets/fashion.jpg";
import football from "../assets/football.png";
import pattern from "../assets/pattern.png"; // this is used as the card back
import shoes from "../assets/shoes.jpg";
import violin from "../assets/violin.jpg";

// Initialize array with 5 different card images (pattern is reserved for card backs)
let cards = [books, fashion, football, shoes, violin];

/**
 * Creates a shuffled deck of card pairs for the memory game
 * Each image appears twice to create matching pairs
 * Returns an array of 10 card objects (5 pairs)
 */

const createCards = () => {
  // Create pairs: transform each image into two card objects with unique IDs
  cards = cards.flatMap((item) => [
    {
      id: crypto.randomUUID(), // Generate unique ID for first card
      image: item, // Assign the image
      matched: false, // Initially not matched
    },
    {
      id: crypto.randomUUID(), // Generate unique ID for second card (the pair)
      image: item, // Same image as the first card
      matched: false, // Initially not matched
    },
  ]);

  console.log(cards);

  // Fisher-Yates shuffle
  // works backwards through the array, swapping each element with a random earlier element
  for (let i = cards.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // swap the element at i with the element at j
    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }

  console.log(cards);
  return cards;
};

/**
 * Type definition for a single card object
 */
type CardType = {
  id: string; // Unique identifier for the card
  image: string; // Path to the card's face image
  matched: boolean; // Whether this card has been matched
};

/**
 * Props that the Card component accepts
 */
type CardProps = {
  card: CardType; // The card data object
  flipped: boolean; // Whether the card is currently flipped over
  handleClick: () => void; // Function to call when card is clicked
};

/**
 * Card component - renders a single flippable card with 3D flip animation
 * Shows pattern on front, card image on back when flipped
 */
function Card({ card, flipped, handleClick }: CardProps) {
  return (
    // Outer container: sets card size, enables clicking, and establishes 3D perspective
    <div
      className="card w-[120px] h-[120px] cursor-pointer perspective-[1000px]"
      onClick={handleClick}
    >
      {" "}
      <div
        className="relative w-full h-full transition-transform duration-600 ease-out preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg) " : "rotateY(0deg)",
        }}
      >
        <div className="card-front absolute w-full h-full backface-hidden rounded-xl shadow-lg"></div>
        <div className="card-back" draggable="false"></div>
      </div>
    </div>
  );
}

export { createCards, Card };
