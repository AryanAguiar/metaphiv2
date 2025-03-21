import { useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

// Card Data
const cards = [
  { id: 1, front: "Front 1", back: "Back 1" },
  { id: 2, front: "Front 2", back: "Back 2" },
  { id: 3, front: "Front 3", back: "Back 3" },
  { id: 4, front: "Front 4", back: "Back 4" },
  { id: 5, front: "Front 5", back: "Back 5" },
  { id: 6, front: "Front 6", back: "Back 6" },
];

// Styled Components
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  justify-content: center;
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const CardContainer = styled.div`
  perspective: 1200px;
  cursor: pointer;
  position: relative;
`;

const Card = styled(motion.div)`
  width: 200px;
  height: 250px;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
`;

const CardFace = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 22px;
  font-weight: bold;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Front = styled(CardFace)`
  background-color: #007bff;
`;

const Back = styled(CardFace)`
  background-color: #ff5733;
  transform: rotateY(180deg);
`;

export default function FlipCardGrid() {
  const [flipped, setFlipped] = useState(Array(cards.length).fill(false));
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const edgeThreshold = 30; // Edge area in pixels
    const isOnEdge =
      x < edgeThreshold || x > rect.width - edgeThreshold || y < edgeThreshold || y > rect.height - edgeThreshold;

    if (!isOnEdge) {
      setFlipped((prev) => {
        const newFlipped = [...prev];
        newFlipped[index] = true;
        return newFlipped;
      });
    }
  };

  const handleMouseLeave = (index) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = false;
      return newFlipped;
    });
  };

  return (
    <Grid>
      {cards.map((card, index) => (
        <CardContainer key={card.id} ref={(el) => (cardRefs.current[index] = el)}>
          <Card
            animate={{ rotateY: flipped[index] ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <Front>{card.front}</Front>
            <Back>{card.back}</Back>
          </Card>
        </CardContainer>
      ))}
    </Grid>
  );
}
