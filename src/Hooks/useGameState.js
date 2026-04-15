import { useState, useEffect } from "react";

export function useGameState(level) {
  const gridSize = level.gridSize;
  const emptyGrid = () => Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));

  const [grid, setGrid] = useState(emptyGrid());
  const [hand, setHand] = useState([...level.tokens]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [screen, setScreen] = useState("game");

  // ← this is the key fix: reset everything when level changes
  useEffect(() => {
    setGrid(emptyGrid());
    setHand([...level.tokens]);
    setSelected(null);
    setFeedback(null);
    setScreen("game");
  }, [level.id]);

  const handleTokenSelect = (token) => {
    setSelected(selected?.id === token.id ? null : token);
  };

  const handleCellClick = (r, c) => {
    if (!selected) {
      if (grid[r][c]) {
        const token = grid[r][c];
        const newGrid = grid.map(row => [...row]);
        newGrid[r][c] = null;
        setGrid(newGrid);
        setHand(prev => [...prev, token]);
        setSelected(token);
      }
      return;
    }
    const newGrid = grid.map(row => [...row]);
    if (newGrid[r][c]) {
      setHand(prev => [...prev.filter(t => t.id !== selected.id), newGrid[r][c]]);
    } else {
      setHand(prev => prev.filter(t => t.id !== selected.id));
    }
    newGrid[r][c] = selected;
    setGrid(newGrid);
    setSelected(null);
  };

  const handleSubmit = () => {
    if (level.validate(grid)) {
      setScreen("discovery"); // ← only reaches here if correct
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  return { grid, hand, selected, feedback, screen, setScreen, handleTokenSelect, handleCellClick, handleSubmit };
}