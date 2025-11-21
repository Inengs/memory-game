// import all the card face images
import books from "../assets/books.jpg";
import fashion from "../assets/fashion.jpg";
import football from "../assets/football.png";
import pattern from "../assets/pattern.png"; // this is used as the card back
import shoes from "../assets/shoes.jpg";
import violin from "../assets/violin.jpg";

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

// Initialize array with 5 different card images (pattern is reserved for card backs)
let cardImages = [books, fashion, football, shoes, violin];

/**
 * Creates a shuffled deck of card pairs for the memory game
 * Each image appears twice to create matching pairs
 * Returns an array of 10 card objects (5 pairs)
 */

const createCards = (): CardType[] => {
  // Create pairs: transform each image into two card objects with unique IDs
  const pairs = cardImages.flatMap((item) => [
    {
      id: crypto.randomUUID(), // Generate unique ID for first card
      image: item, // Assign the image
      matched: false, // Initially not matched
      revealed: false,
    },
    {
      id: crypto.randomUUID(), // Generate unique ID for second card (the pair)
      image: item, // Same image as the first card
      matched: false, // Initially not matched
      revealed: false,
    },
  ]);

  console.log(pairs);

  // Fisher-Yates shuffle
  // works backwards through the array, swapping each element with a random earlier element
  for (let i = pairs.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // swap the element at i with the element at j
    const temp = pairs[i];
    pairs[i] = pairs[j];
    pairs[j] = temp;
  }

  console.log(pairs);
  return pairs;
};

/**
 * Card component - renders a single flippable card with 3D flip animation
 * Shows pattern on front, card image on back when flipped
 */
function Card({ card, flipped, handleClick }: CardProps) {
  return (
    // Outer container: sets card size, enables clicking, and establishes 3D perspective
    <div
      className="card w-[120px] h-[120px] cursor-pointer"
      onClick={handleClick}
      style={{ perspective: "1000px" }}
    >
      {" "}
      <div
        className="relative w-full h-full transition-transform duration-600 ease-out preserve-3d"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg) " : "rotateY(0deg)",
        }}
      >
        {/* Card Front */}
        <div
          className="card-front absolute w-full h-full backface-hidden rounded-xl shadow-lg"
          style={{
            backgroundImage: `url(${pattern})`,
            backfaceVisibility: "hidden",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        {/* Card Back (actual image) */}
        <div
          className="card-back absolute w-full h-full rounded-xl shadow-lg bg-cover bg-center"
          draggable="false"
          style={{
            backgroundImage: `url(${card.image})`,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        ></div>
      </div>
    </div>
  );
}

export { createCards, Card };
