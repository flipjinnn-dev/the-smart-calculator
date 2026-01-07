export const WORDLE_SOLUTIONS: string[] = [
  "cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade", "naval", "serve",
  "heath", "dwarf", "model", "karma", "stink", "grade", "quiet", "bench", "abate", "feign",
  "major", "death", "fresh", "crust", "stool", "colon", "abase", "marry", "react", "batty",
  "pride", "floss", "helix", "croak", "staff", "paper", "unfed", "whelp", "trawl", "outdo",
  "adobe", "crazy", "sower", "repay", "digit", "crate", "cluck", "spike", "mimic", "pound",
  "maxim", "linen", "unmet", "flesh", "booby", "forth", "first", "stand", "belly", "ivory",
  "seedy", "print", "yearn", "drain", "bribe", "stout", "panel", "crass", "flume", "offal",
  "agree", "error", "swirl", "argue", "bleed", "delta", "flick", "totem", "wooer", "front",
  "shrub", "parry", "biome", "lapel", "start", "greet", "goner", "golem", "lusty", "loopy",
  "round", "audit", "lying", "gamma", "labor", "islet", "civic", "forge", "corny", "moult",
  "basic", "salad", "agate", "spicy", "spray", "essay", "fjord", "spend", "kebab", "guild"
];

export const VALID_WORDLE_WORDS: string[] = [
  ...WORDLE_SOLUTIONS,
  "about", "above", "abuse", "actor", "acute", "admit", "adopt", "adult", "after", "again",
  "agent", "alarm", "album", "alert", "alike", "alive", "allow", "alone", "along", "alter",
  "among", "anger", "angle", "angry", "apart", "apple", "apply", "arena", "argue", "arise",
  "array", "aside", "asset", "audio", "avoid", "award", "aware", "badly", "baker", "bases",
  "basic", "basis", "beach", "began", "begin", "begun", "being", "below", "bench", "billy",
  "birth", "black", "blame", "blind", "block", "blood", "board", "boost", "booth", "bound",
  "brain", "brand", "bread", "break", "breed", "brief", "bring", "broad", "broke", "brown",
  "build", "built", "buyer", "cable", "calif", "carry", "catch", "cause", "chain", "chair",
  "chart", "chase", "cheap", "check", "chest", "chief", "child", "china", "chose", "civil",
  "claim", "class", "clean", "clear", "click", "clock", "close", "coach", "coast", "could",
  "count", "court", "cover", "crack", "craft", "crash", "cream", "crime", "cross", "crowd",
  "crown", "crude", "curve", "cycle", "daily", "dance", "dated", "dealt", "death", "debut",
  "delay", "depth", "doing", "doubt", "dozen", "draft", "drama", "drank", "drawn", "dream",
  "dress", "drill", "drink", "drive", "drops", "drove", "dying", "eager", "early", "earth",
  "eight", "elite", "empty", "enemy", "enjoy", "enter", "entry", "equal", "error", "event",
  "every", "exact", "exist", "extra", "faith", "false", "fault", "fiber", "field", "fifth",
  "fifty", "fight", "final", "first", "fixed", "flash", "fleet", "floor", "fluid", "focus",
  "force", "forth", "forty", "forum", "found", "frame", "frank", "fraud", "fresh", "front",
  "fruit", "fully", "funny", "giant", "given", "glass", "globe", "going", "grace", "grade",
  "grand", "grant", "grass", "great", "green", "gross", "group", "grown", "guard", "guess",
  "guest", "guide", "happy", "harry", "heart", "heavy", "hence", "henry", "horse", "hotel",
  "house", "human", "ideal", "image", "index", "inner", "input", "issue", "japan", "jones",
  "judge", "known", "label", "large", "laser", "later", "laugh", "layer", "learn", "lease",
  "least", "leave", "legal", "lemon", "level", "lewis", "light", "limit", "links", "lives",
  "local", "logic", "loose", "lower", "lucky", "lunch", "lying", "magic", "major", "maker",
  "march", "maria", "match", "maybe", "mayor", "meant", "media", "metal", "might", "minor",
  "minus", "mixed", "model", "money", "month", "moral", "motor", "mount", "mouse", "mouth",
  "movie", "music", "needs", "never", "newly", "night", "noise", "north", "noted", "novel",
  "nurse", "occur", "ocean", "offer", "often", "order", "other", "ought", "paint", "panel",
  "paper", "party", "peace", "peter", "phase", "phone", "photo", "piece", "pilot", "pitch",
  "place", "plain", "plane", "plant", "plate", "point", "pound", "power", "press", "price",
  "pride", "prime", "print", "prior", "prize", "proof", "proud", "prove", "queen", "quick",
  "quiet", "quite", "radio", "raise", "range", "rapid", "ratio", "reach", "ready", "refer",
  "right", "rival", "river", "robin", "roger", "roman", "rough", "round", "route", "royal",
  "rural", "scale", "scene", "scope", "score", "sense", "serve", "seven", "shall", "shape",
  "share", "sharp", "sheet", "shelf", "shell", "shift", "shine", "shirt", "shock", "shoot",
  "short", "shown", "sight", "since", "sixth", "sixty", "sized", "skill", "sleep", "slide",
  "small", "smart", "smile", "smith", "smoke", "solid", "solve", "sorry", "sound", "south",
  "space", "spare", "speak", "speed", "spend", "spent", "split", "spoke", "sport", "staff",
  "stage", "stake", "stand", "start", "state", "steam", "steel", "stick", "still", "stock",
  "stone", "stood", "store", "storm", "story", "strip", "stuck", "study", "stuff", "style",
  "sugar", "suite", "super", "sweet", "table", "taken", "taste", "taxes", "teach", "teeth",
  "terry", "texas", "thank", "theft", "their", "theme", "there", "these", "thick", "thing",
  "think", "third", "those", "three", "threw", "throw", "tight", "times", "title", "today",
  "topic", "total", "touch", "tough", "tower", "track", "trade", "train", "treat", "trend",
  "trial", "tried", "tries", "troop", "truck", "truly", "trust", "truth", "twice", "under",
  "undue", "union", "unity", "until", "upper", "upset", "urban", "usage", "usual", "valid",
  "value", "video", "virus", "visit", "vital", "vocal", "voice", "waste", "watch", "water",
  "wheel", "where", "which", "while", "white", "whole", "whose", "woman", "women", "world",
  "worry", "worse", "worst", "worth", "would", "wound", "write", "wrong", "wrote", "yield",
  "young", "youth"
];

export function getWordleAnswer(wordleNumber: number): string {
  const index = (wordleNumber - 1) % WORDLE_SOLUTIONS.length;
  return WORDLE_SOLUTIONS[index];
}

export function isValidGuess(word: string): boolean {
  return VALID_WORDLE_WORDS.includes(word.toLowerCase());
}
