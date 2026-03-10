export interface Game {
  id: string
  name: string
  description: string
  href: string
  popular?: boolean
}

export const games: Game[] = [
  {
    id: "wordle",
    name: "Wordle of the Day",
    description: "Play daily Wordle puzzle",
    href: "/games/wordle",
    popular: true,
  },
  {
    id: "mental-maths",
    name: "Mental Math Trainer",
    description: "Train your mental math skills",
    href: "/games/mental-maths",
    popular: true,
  },
  {
    id: "wordle-archive",
    name: "Wordle Archive",
    description: "Access past Wordle puzzles",
    href: "/games/what-is-the-wordle-today",
    popular: true,
  },
  {
    id: "cashier-simulator",
    name: "Cashier Simulator",
    description: "Simulate cashier operations and money handling",
    href: "/games/cashier-simulator",
    popular: true,
  },
  {
    id: "grocery-cashier",
    name: "Grocery Cashier",
    description: "Manage a grocery store checkout",
    href: "/games/grocery-cashier",
  },
  {
    id: "money-master",
    name: "Money Master",
    description: "Master money counting and calculations",
    href: "/games/money-master",
  },
  {
    id: "coin-saver-challenge",
    name: "Coin Saver Challenge",
    description: "Challenge yourself to save coins efficiently",
    href: "/games/coin-saver-challenge",
  },
  {
    id: "sort-coins",
    name: "Sort Coins",
    description: "Sort and organize coins by denomination",
    href: "/games/sort-coins",
  },
  {
    id: "animal-wheel-spinner",
    name: "Animal Wheel Spinner",
    description: "Spin the wheel to pick random animals",
    href: "/games/animal-wheel-spinner",
  },
  {
    id: "aesthetic-wheel-spinner",
    name: "Aesthetic Wheel Spinner",
    description: "Beautiful customizable wheel spinner",
    href: "/games/aesthetic-wheel-spinner",
  },
  {
    id: "age-generator-wheel",
    name: "Age Generator Wheel",
    description: "Generate random ages with a spinning wheel",
    href: "/games/age-generator-wheel",
  },
  {
    id:"anime-character-wheel-game",
    name:"Anime Character Wheel",
    description:"Spin the wheel to pick random anime characters",
    href:"/games/anime-character-wheel",
  }
]

export function getAllGames(): Game[] {
  return games
}

export function getPopularGames(): Game[] {
  return games.filter(game => game.popular)
}

export function getGameById(id: string): Game | undefined {
  return games.find(game => game.id === id)
}
