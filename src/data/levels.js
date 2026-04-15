export const LEVELS = [
  {
    id: 1,
    title: "Level 1",
    stars: 0,
    locked: false,
    unlockCoins: 0,
    difficulty: "Easy",
    rule: "Calm must touch Growth",
    hint: "Blue should be next to Green.",
    gridSize: 3,
    tokens: [
      { id: 1, shape: "circle", color: "blue" },
      { id: 2, shape: "circle", color: "green" },
      { id: 3, shape: "triangle", color: "red" },
    ],
    validate: (grid) => {
      const size = 3;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "blue") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            if (!neighbors.some((n) => n && n.color === "green")) return false;
          }
        }
      }
      return true;
    },
  },
  {
    id: 2,
    title: "Level 2",
    stars: 0,
    locked: true,
    unlockCoins: 5,
    difficulty: "Easy",
    rule: "Energy must not touch Calm",
    hint: "Keep red away from blue.",
    gridSize: 3,
    tokens: [
      { id: 1, shape: "circle", color: "red" },
      { id: 2, shape: "circle", color: "blue" },
      { id: 3, shape: "triangle", color: "green" },
    ],
    validate: (grid) => {
      const size = 3;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "red") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            if (neighbors.some((n) => n && n.color === "blue")) return false;
          }
        }
      }
      return true;
    },
  },
  {
    id: 3,
    title: "Level 3",
    stars: 0,
    locked: true,
    unlockCoins: 5,
    difficulty: "Medium",
    rule: "Joy must be between Growth and Calm",
    hint: "Yellow should touch both green and blue.",
    gridSize: 3,
    tokens: [
      { id: 1, shape: "circle", color: "yellow" },
      { id: 2, shape: "circle", color: "green" },
      { id: 3, shape: "triangle", color: "blue" },
    ],
    validate: (grid) => {
      const size = 3;
      let hasGreenNeighbor = false;
      let hasBlueNeighbor = false;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "yellow") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            hasGreenNeighbor = neighbors.some((n) => n && n.color === "green");
            hasBlueNeighbor = neighbors.some((n) => n && n.color === "blue");
          }
        }
      }
      return hasGreenNeighbor && hasBlueNeighbor;
    },
  },
  {
    id: 4,
    title: "Level 4",
    stars: 0,
    locked: true,
    unlockCoins: 5,
    difficulty: "Medium",
    rule: "Calm must be alone",
    hint: "Blue should not touch any color.",
    gridSize: 4,
    tokens: [
      { id: 1, shape: "circle", color: "blue" },
      { id: 2, shape: "circle", color: "red" },
      { id: 3, shape: "triangle", color: "green" },
      { id: 4, shape: "triangle", color: "yellow" },
    ],
    validate: (grid) => {
      const size = 4;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "blue") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            if (neighbors.some((n) => n)) return false;
          }
        }
      }
      return true;
    },
  },
  {
    id: 5,
    title: "Level 5",
    stars: 0,
    locked: true,
    unlockCoins: 10,
    difficulty: "Hard",
    rule: "Energy must touch Growth, but not Calm",
    hint: "Red should be near green and away from blue.",
    gridSize: 4,
    tokens: [
      { id: 1, shape: "circle", color: "red" },
      { id: 2, shape: "circle", color: "green" },
      { id: 3, shape: "triangle", color: "blue" },
      { id: 4, shape: "triangle", color: "yellow" },
    ],
    validate: (grid) => {
      const size = 4;
      let hasGreenNeighbor = false;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "red") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            if (neighbors.some((n) => n && n.color === "blue")) return false;
            hasGreenNeighbor = neighbors.some((n) => n && n.color === "green");
          }
        }
      }
      return hasGreenNeighbor;
    },
  },
  {
    id: 6,
    title: "Level 6",
    stars: 0,
    locked: true,
    unlockCoins: 10,
    difficulty: "Easy",
    rule: "Joy must touch Calm",
    hint: "Happiness grows when calmness is nearby.",
    gridSize: 4,
    tokens: [
      { id: 1, shape: "circle", color: "yellow" },
      { id: 2, shape: "circle", color: "blue" },
      { id: 3, shape: "triangle", color: "red" },
      { id: 4, shape: "triangle", color: "green" },
    ],
    validate: (grid) => {
      const size = 4;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "yellow") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            if (!neighbors.some((n) => n && n.color === "blue")) return false;
          }
        }
      }
      return true;
    },
  },
  {
    id: 7,
    title: "Level 7",
    stars: 0,
    locked: true,
    unlockCoins: 10,
    difficulty: "Medium",
    rule: "Growth must touch Energy",
    hint: "Green should be next to red.",
    gridSize: 4,
    tokens: [
      { id: 1, shape: "circle", color: "green" },
      { id: 2, shape: "circle", color: "red" },
      { id: 3, shape: "triangle", color: "blue" },
      { id: 4, shape: "triangle", color: "yellow" },
      { id: 5, shape: "circle", color: "purple" },
    ],
    validate: (grid) => {
      const size = 4;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "green") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            if (!neighbors.some((n) => n && n.color === "red")) return false;
          }
        }
      }
      return true;
    },
  },
  {
    id: 8,
    title: "Level 8",
    stars: 0,
    locked: true,
    unlockCoins: 10,
    difficulty: "Medium",
    rule: "Calm and Joy must not touch each other",
    hint: "Keep blue and yellow separated.",
    gridSize: 4,
    tokens: [
      { id: 1, shape: "circle", color: "blue" },
      { id: 2, shape: "circle", color: "yellow" },
      { id: 3, shape: "triangle", color: "red" },
      { id: 4, shape: "triangle", color: "green" },
      { id: 5, shape: "circle", color: "purple" },
    ],
    validate: (grid) => {
      const size = 4;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "blue") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            if (neighbors.some((n) => n && n.color === "yellow")) return false;
          }
        }
      }
      return true;
    },
  },
  {
    id: 9,
    title: "Level 9",
    stars: 0,
    locked: true,
    unlockCoins: 15,
    difficulty: "Hard",
    rule: "Mystery must touch all other tokens",
    hint: "Purple should be adjacent to every other color.",
    gridSize: 4,
    tokens: [
      { id: 1, shape: "star", color: "purple" },
      { id: 2, shape: "circle", color: "red" },
      { id: 3, shape: "circle", color: "blue" },
      { id: 4, shape: "triangle", color: "green" },
      { id: 5, shape: "triangle", color: "yellow" },
    ],
    validate: (grid) => {
      const size = 4;
      const requiredColors = ["red", "blue", "green", "yellow"];
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "purple") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            const neighborColors = neighbors
              .filter(Boolean)
              .map((n) => n.color);
            return requiredColors.every((color) =>
              neighborColors.includes(color)
            );
          }
        }
      }
      return false;
    },
  },
  {
    id: 10,
    title: "Level 10",
    stars: 0,
    locked: true,
    unlockCoins: 15,
    difficulty: "Hard",
    rule: "Energy must be in a corner, away from Calm",
    hint: "Place red in a corner cell, not touching blue.",
    gridSize: 4,
    tokens: [
      { id: 1, shape: "circle", color: "red" },
      { id: 2, shape: "circle", color: "blue" },
      { id: 3, shape: "triangle", color: "green" },
      { id: 4, shape: "triangle", color: "yellow" },
      { id: 5, shape: "star", color: "purple" },
    ],
    validate: (grid) => {
      const size = 4;
      const corners = [
        [0, 0],
        [0, size - 1],
        [size - 1, 0],
        [size - 1, size - 1],
      ];
      for (const [r, c] of corners) {
        const cell = grid[r][c];
        if (cell && cell.color === "red") {
          const neighbors = [
            grid[r - 1]?.[c],
            grid[r + 1]?.[c],
            grid[r]?.[c - 1],
            grid[r]?.[c + 1],
          ];
          if (neighbors.some((n) => n && n.color === "blue")) return false;
          return true;
        }
      }
      return false;
    },
  },
  {
    id: 11,
    title: "Level 11",
    stars: 0,
    locked: true,
    unlockCoins: 15,
    difficulty: "Medium",
    rule: "Growth must not touch Joy",
    hint: "Keep green away from yellow.",
    gridSize: 4,
    tokens: [
      { id: 1, shape: "circle", color: "green" },
      { id: 2, shape: "circle", color: "yellow" },
      { id: 3, shape: "triangle", color: "red" },
      { id: 4, shape: "triangle", color: "blue" },
      { id: 5, shape: "star", color: "purple" },
      { id: 6, shape: "circle", color: "orange" },
    ],
    validate: (grid) => {
      const size = 4;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "green") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            if (neighbors.some((n) => n && n.color === "yellow")) return false;
          }
        }
      }
      return true;
    },
  },
  {
    id: 12,
    title: "Level 12",
    stars: 0,
    locked: true,
    unlockCoins: 20,
    difficulty: "Hard",
    rule: "Calm must be in the center, touching Growth",
    hint: "Place blue in the middle area, adjacent to green.",
    gridSize: 4,
    tokens: [
      { id: 1, shape: "circle", color: "blue" },
      { id: 2, shape: "circle", color: "green" },
      { id: 3, shape: "triangle", color: "red" },
      { id: 4, shape: "triangle", color: "yellow" },
      { id: 5, shape: "star", color: "purple" },
      { id: 6, shape: "circle", color: "orange" },
    ],
    validate: (grid) => {
      const size = 4;
      const centerCells = [
        [1, 1],
        [1, 2],
        [2, 1],
        [2, 2],
      ];
      for (const [r, c] of centerCells) {
        const cell = grid[r][c];
        if (cell && cell.color === "blue") {
          const neighbors = [
            grid[r - 1]?.[c],
            grid[r + 1]?.[c],
            grid[r]?.[c - 1],
            grid[r]?.[c + 1],
          ];
          return neighbors.some((n) => n && n.color === "green");
        }
      }
      return false;
    },
  },
  {
    id: 13,
    title: "Level 13",
    stars: 0,
    locked: true,
    unlockCoins: 20,
    difficulty: "Hard",
    rule: "Joy must touch Growth but not Energy",
    hint: "Yellow should be near green but far from red.",
    gridSize: 5,
    tokens: [
      { id: 1, shape: "circle", color: "yellow" },
      { id: 2, shape: "circle", color: "green" },
      { id: 3, shape: "triangle", color: "red" },
      { id: 4, shape: "triangle", color: "blue" },
      { id: 5, shape: "star", color: "purple" },
      { id: 6, shape: "circle", color: "orange" },
    ],
    validate: (grid) => {
      const size = 5;
      let hasGreenNeighbor = false;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "yellow") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            if (neighbors.some((n) => n && n.color === "red")) return false;
            hasGreenNeighbor = neighbors.some((n) => n && n.color === "green");
          }
        }
      }
      return hasGreenNeighbor;
    },
  },
  {
    id: 14,
    title: "Level 14",
    stars: 0,
    locked: true,
    unlockCoins: 20,
    difficulty: "Hard",
    rule: "Mystery must not touch Energy or Calm",
    hint: "Keep purple away from red and blue.",
    gridSize: 5,
    tokens: [
      { id: 1, shape: "star", color: "purple" },
      { id: 2, shape: "circle", color: "red" },
      { id: 3, shape: "circle", color: "blue" },
      { id: 4, shape: "triangle", color: "green" },
      { id: 5, shape: "triangle", color: "yellow" },
      { id: 6, shape: "circle", color: "orange" },
      { id: 7, shape: "star", color: "pink" },
    ],
    validate: (grid) => {
      const size = 5;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "purple") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ];
            if (
              neighbors.some(
                (n) => n && (n.color === "red" || n.color === "blue")
              )
            )
              return false;
          }
        }
      }
      return true;
    },
  },
  {
    id: 15,
    title: "Level 15",
    stars: 0,
    locked: true,
    unlockCoins: 25,
    difficulty: "Hard",
    rule: "Energy must form a chain with Growth and Joy",
    hint: "Red touches green, green touches yellow — in a line.",
    gridSize: 5,
    tokens: [
      { id: 1, shape: "circle", color: "red" },
      { id: 2, shape: "circle", color: "green" },
      { id: 3, shape: "circle", color: "yellow" },
      { id: 4, shape: "triangle", color: "blue" },
      { id: 5, shape: "triangle", color: "purple" },
      { id: 6, shape: "star", color: "orange" },
      { id: 7, shape: "circle", color: "pink" },
    ],
    validate: (grid) => {
      const size = 5;
      const getNeighbors = (r, c) =>
        [
          grid[r - 1]?.[c],
          grid[r + 1]?.[c],
          grid[r]?.[c - 1],
          grid[r]?.[c + 1],
        ].filter(Boolean);

      let redTouchesGreen = false;
      let greenTouchesYellow = false;

      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell?.color === "red") {
            if (getNeighbors(r, c).some((n) => n.color === "green"))
              redTouchesGreen = true;
          }
          if (cell?.color === "green") {
            if (getNeighbors(r, c).some((n) => n.color === "yellow"))
              greenTouchesYellow = true;
          }
        }
      }
      return redTouchesGreen && greenTouchesYellow;
    },
  },
  {
    id: 16,
    title: "Level 16",
    stars: 0,
    locked: true,
    unlockCoins: 25,
    difficulty: "Expert",
    rule: "All tokens must be in the same row or column",
    hint: "Line up all tokens horizontally or vertically.",
    gridSize: 5,
    tokens: [
      { id: 1, shape: "circle", color: "red" },
      { id: 2, shape: "circle", color: "blue" },
      { id: 3, shape: "triangle", color: "green" },
      { id: 4, shape: "triangle", color: "yellow" },
      { id: 5, shape: "star", color: "purple" },
      { id: 6, shape: "circle", color: "orange" },
      { id: 7, shape: "star", color: "pink" },
    ],
    validate: (grid) => {
      const size = 5;
      const positions = [];
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (grid[r][c]) positions.push([r, c]);
        }
      }
      if (positions.length === 0) return false;
      const allSameRow = positions.every(([r]) => r === positions[0][0]);
      const allSameCol = positions.every(([, c]) => c === positions[0][1]);
      return allSameRow || allSameCol;
    },
  },
  {
    id: 17,
    title: "Level 17",
    stars: 0,
    locked: true,
    unlockCoins: 25,
    difficulty: "Expert",
    rule: "Calm must touch exactly two tokens",
    hint: "Blue should have exactly 2 neighbors — no more, no less.",
    gridSize: 5,
    tokens: [
      { id: 1, shape: "circle", color: "blue" },
      { id: 2, shape: "circle", color: "red" },
      { id: 3, shape: "triangle", color: "green" },
      { id: 4, shape: "triangle", color: "yellow" },
      { id: 5, shape: "star", color: "purple" },
      { id: 6, shape: "circle", color: "orange" },
      { id: 7, shape: "star", color: "pink" },
      { id: 8, shape: "circle", color: "cyan" },
    ],
    validate: (grid) => {
      const size = 5;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell && cell.color === "blue") {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ].filter(Boolean);
            return neighbors.length === 2;
          }
        }
      }
      return false;
    },
  },
  {
    id: 18,
    title: "Level 18",
    stars: 0,
    locked: true,
    unlockCoins: 30,
    difficulty: "Expert",
    rule: "No two tokens of the same shape may touch",
    hint: "Circles can't be next to circles, triangles can't be next to triangles.",
    gridSize: 5,
    tokens: [
      { id: 1, shape: "circle", color: "red" },
      { id: 2, shape: "circle", color: "blue" },
      { id: 3, shape: "triangle", color: "green" },
      { id: 4, shape: "triangle", color: "yellow" },
      { id: 5, shape: "star", color: "purple" },
      { id: 6, shape: "star", color: "orange" },
      { id: 7, shape: "circle", color: "pink" },
      { id: 8, shape: "triangle", color: "cyan" },
    ],
    validate: (grid) => {
      const size = 5;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell) {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ].filter(Boolean);
            if (neighbors.some((n) => n.shape === cell.shape)) return false;
          }
        }
      }
      return true;
    },
  },
  {
    id: 19,
    title: "Level 19",
    stars: 0,
    locked: true,
    unlockCoins: 30,
    difficulty: "Expert",
    rule: "Energy and Mystery must be diagonal to each other",
    hint: "Red and purple must be placed diagonally, not side by side.",
    gridSize: 5,
    tokens: [
      { id: 1, shape: "circle", color: "red" },
      { id: 2, shape: "star", color: "purple" },
      { id: 3, shape: "circle", color: "blue" },
      { id: 4, shape: "triangle", color: "green" },
      { id: 5, shape: "triangle", color: "yellow" },
      { id: 6, shape: "circle", color: "orange" },
      { id: 7, shape: "star", color: "pink" },
      { id: 8, shape: "circle", color: "cyan" },
    ],
    validate: (grid) => {
      const size = 5;
      let redPos = null;
      let purplePos = null;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (grid[r][c]?.color === "red") redPos = [r, c];
          if (grid[r][c]?.color === "purple") purplePos = [r, c];
        }
      }
      if (!redPos || !purplePos) return false;
      const [rr, rc] = redPos;
      const [pr, pc] = purplePos;
      const isDiagonal =
        Math.abs(rr - pr) === 1 && Math.abs(rc - pc) === 1;
      return isDiagonal;
    },
  },
  {
    id: 20,
    title: "Level 20",
    stars: 0,
    locked: true,
    unlockCoins: 30,
    difficulty: "Expert",
    rule: "Every token must touch at least one other token",
    hint: "No token can be isolated — they must all connect.",
    gridSize: 5,
    tokens: [
      { id: 1, shape: "circle", color: "red" },
      { id: 2, shape: "circle", color: "blue" },
      { id: 3, shape: "triangle", color: "green" },
      { id: 4, shape: "triangle", color: "yellow" },
      { id: 5, shape: "star", color: "purple" },
      { id: 6, shape: "circle", color: "orange" },
      { id: 7, shape: "star", color: "pink" },
      { id: 8, shape: "circle", color: "cyan" },
      { id: 9, shape: "triangle", color: "white" },
    ],
    validate: (grid) => {
      const size = 5;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = grid[r][c];
          if (cell) {
            const neighbors = [
              grid[r - 1]?.[c],
              grid[r + 1]?.[c],
              grid[r]?.[c - 1],
              grid[r]?.[c + 1],
            ].filter(Boolean);
            if (neighbors.length === 0) return false;
          }
        }
      }
      return true;
    },
  },
];