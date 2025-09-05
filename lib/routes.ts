// Centralized routing configuration for easy management

export const ROUTES = {
  // Main pages
  HOME: "/",
  ABOUT: "/about-us",
  CONTACT: "/contact-us",
  PRIVACY: "/privacy-policy",
  TERMS: "/terms-and-conditions",

  // Categories
  CATEGORIES: {
    FINANCIAL: "/financial",
    HEALTH: "/health",
    MATH: "/maths",
    PHYSICS: "/physics",
    CONSTRUCTION: "/construction",
    FOOD: "/food",
    SPORTS: "/sports",
    OTHER: "/other-calculators",
  },

  // Calculators (from calculator-data.ts)
  CALCULATORS: {
    // Financial
    MORTGAGE: "/financial/mortgage-calculator",
    FINANCE: "/financial/finance-calculator",
    INFLATION: "/financial/inflation-calculator",
    LOAN: "/financial/loan-calculator",
    COMPOUND_INTEREST: "/financial/compound-interest-calculator",
    INTEREST: "/financial/interest-calculator",
    PAYMENT: "/financial/payment-calculator",
    AUTO_LOAN: "/financial/auto-loan-calculator",
    AMORTIZATION: "/financial/amortization-calculator",
    MORTGAGE_PAYOFF: "/financial/mortgage-payoff-calculator",
    CURRENCY: "/financial/currency-calculator",
    INVESTMENT: "/financial/investment-calculator",
    RETIREMENT: "/financial/retirement-calculator",

    // Health
    BMI: "/health/bmi-calculator",
    PREGNANCY_WEIGHT_GAIN: "/health/pregnancy-weight-gain-calculator",
    CALORIES_BURNED: "/health/calories-burned-calculator",
    DUE_DATE: "/health/due-date-calculator",
    PACE: "/health/pace-calculator",
    ONE_REP_MAX: "/health/one-rep-max-calculator",
    ARMY_BODY_FAT: "/health/army-body-fat-calculator",
    TARGET_HEART_RATE: "/health/target-heart-rate-calculator",
    PROTEIN: "/health/protein-calculator",
    HEALTHY_WEIGHT: "/health/healthy-weight-calculator",
    FAT_INTAKE: "/health/fat-intake-calculator",
    CARBOHYDRATE: "/health/carbohydrate-calculator",
    OVULATION: "/health/ovulation-calculator",
    LEAN_BODY_MASS: "/health/lean-body-mass-calculator",
    TDEE: "/health/tdee-calculator",
    CONCEPTION: "/health/conception-calculator",
    GFR: "/health/gfr-calculator",
    ANOREXIC_BMI: "/health/anorexic-bmi-calculator",
    IDEAL_WEIGHT: "/health/ideal-weight-calculator",
    OVERWEIGHT: "/health/overweight-calculator",
    BODY_TYPE: "/health/body-type-calculator",
    PERIOD: "/health/period-calculator",
    BMR: "/health/bmr-calculator",
    WEIGHT_WATCHERS: "/health/weight-watchers-points-calculator",
    BODY_SURFACE_AREA: "/health/body-surface-area-calculator",
    CALORIE: "/health/calorie-calculator",
    BAC: "/health/bac-calculator",
    BODY_FAT: "/health/body-fat-calculator",
    MACRO: "/health/macro-calculator",
    PREGNANCY: "/health/pregnancy-calculator",
    PREGNANCY_CONCEPTION: "/health/pregnancy-conception-calculator",

    // Math
    PERCENTAGE: "/maths/percentage-calculator",
    PERCENT_ERROR: "/maths/percent-error-calculator",
    RANDOM_NUMBER: "/maths/random-number-generator",
    SCIENTIFIC: "/maths/scientific-calculator",
    VOLUME: "/maths/volume-calculator",

    // Physics
    BALLISTIC_COEFFICIENT: "/physics/ballistic-coefficient-calculator",
    VELOCITY: "/physics/velocity-calculator",
    ARROW_SPEED: "/physics/arrow-speed-calculator",
    CAR_JUMP_DISTANCE: "/physics/car-jump-distance-calculator",
    CONSERVATION_OF_MOMENTUM: "/physics/conservation-of-momentum-calculator",

    // Construction
    BOARD_FOOT: "/construction/board-foot-calculator",
    CUBIC_YARD: "/construction/cubic-yard-calculator",
    GALLONS_PER_SQUARE_FOOT: "/construction/gallons-per-square-foot-calculator",
    SIZE_TO_WEIGHT: "/construction/size-to-weight-rectangular-cuboid-calculator",
    SQUARE_FEET_TO_CUBIC_YARDS: "/construction/square-feet-to-cubic-yards-calculator",

    // Food
    BUTTER: "/food/butter-calculator",
    CAKE_PAN: "/food/cake-pan-calculator",
    COOKING_MEASUREMENT: "/food/cooking-measurement-converter",
    CUPS_TO_POUNDS: "/food/cups-to-pounds-converter",
    DRY_TO_COOKED_PASTA: "/food/dry-to-cooked-pasta-converter",

    // Sports
    BATTING_AVERAGE: "/sports/batting-average-calculator",
    EARNED_RUN_AVERAGE: "/sports/earned-run-average-calculator",
    FIELDING_PERCENTAGE: "/sports/fielding-percentage-calculator",
    FIELDING_INDEPENDENT_PITCHING: "/sports/fielding-independent-pitching-calculator",
    MAGIC_NUMBER: "/sports/magic-number-calculator",

    // Other
    AGE: "/age-calculator",
    TIME: "/time-calculator",
    GPA: "/gpa-calculator",
    HEIGHT: "/height-calculator",
    IP_SUBNET: "/ip-subnet-calculator",
  },
} as const;

// Helper function to get calculator URL
export function getCalculatorUrl(calculatorId: string): string {
  return `/calculator/${calculatorId}`;
}

// Helper function to get category URL
export function getCategoryUrl(categoryId: string): string {
  return `/category/${categoryId}`;
}

// Calculator categories mapping (dynamic from calculator-data.ts)
export const CALCULATOR_CATEGORIES = {
  financial: [
    "mortgage-calculator",
    "finance-calculator",
    "inflation-calculator",
    "loan-calculator",
    "compound-interest-calculator",
    "interest-calculator",
    "payment-calculator",
    "auto-loan-calculator",
    "amortization-calculator",
    "mortgage-payoff-calculator",
    "currency-calculator",
    "investment-calculator",
    "retirement-calculator",
  ],
  health: [
    "bmi-calculator",
    "pregnancy-weight-gain-calculator",
    "calories-burned-calculator",
    "due-date-calculator",
    "pace-calculator",
    "one-rep-max-calculator",
    "army-body-fat-calculator",
    "target-heart-rate-calculator",
    "protein-calculator",
    "healthy-weight-calculator",
    "fat-intake-calculator",
    "carbohydrate-calculator",
    "ovulation-calculator",
    "lean-body-mass-calculator",
    "tdee-calculator",
    "conception-calculator",
    "gfr-calculator",
    "anorexic-bmi-calculator",
    "ideal-weight-calculator",
    "overweight-calculator",
    "body-type-calculator",
    "period-calculator",
    "bmr-calculator",
    "weight-watchers-points-calculator",
    "body-surface-area-calculator",
    "calorie-calculator",
    "bac-calculator",
    "body-fat-calculator",
    "macro-calculator",
    "pregnancy-calculator",
    "pregnancy-conception-calculator",
  ],
  maths: [
    "percentage-calculator",
    "percent-error-calculator",
    "random-number-generator",
    "scientific-calculator",
    "volume-calculator",
  ],
  physics: [
    "ballistic-coefficient-calculator",
    "velocity-calculator",
    "arrow-speed-calculator",
    "car-jump-distance-calculator",
    "conservation-of-momentum-calculator",
  ],
  construction: [
    "board-foot-calculator",
    "cubic-yard-calculator",
    "gallons-per-square-foot-calculator",
    "size-to-weight-rectangular-cuboid-calculator",
    "square-feet-to-cubic-yards-calculator",
  ],
  food: [
    "butter-calculator",
    "cake-pan-calculator",
    "cooking-measurement-converter",
    "cups-to-pounds-converter",
    "dry-to-cooked-pasta-converter",
  ],
  sports: [
    "batting-average-calculator",
    "earned-run-average-calculator",
    "fielding-percentage-calculator",
    "fielding-independent-pitching-calculator",
    "magic-number-calculator",
  ],
  other: [
    "age-calculator",
    "time-calculator",
    "gpa-calculator",
    "height-calculator",
    "ip-subnet-calculator",
  ],
} as const;
