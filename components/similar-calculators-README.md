# Similar Calculators Component

A reusable React component for displaying related calculators across different calculator pages. This component follows the existing design system and provides consistent UI patterns for recommending similar calculation tools to users.

## Features

- **Dynamic Scaling**: Supports any number of calculators (1, 2, 3, or more)
- **Color Theming**: 9 predefined color themes to match different calculator categories
- **Responsive Design**: Automatically adjusts grid layout based on number of calculators
- **Consistent UI**: Follows existing project design patterns with hover effects and animations
- **Flexible Props**: Accepts calculator names, links, descriptions, and custom styling

## Installation

The component is already created at: `components/similar-calculators.tsx`

## Usage

### Basic Usage

```tsx
import SimilarCalculators from "@/components/similar-calculators"

<SimilarCalculators 
  calculators={[
    {
      calculatorName: "BMI Calculator",
      calculatorHref: "/health/bmi-calculator",
      calculatorDescription: "Calculate your Body Mass Index and weight status"
    },
    {
      calculatorName: "Calorie Calculator", 
      calculatorHref: "/health/calorie-calculator",
      calculatorDescription: "Calculate daily calorie needs based on lifestyle"
    },
    {
      calculatorName: "Macro Calculator",
      calculatorHref: "/health/macro-calculator", 
      calculatorDescription: "Calculate macronutrient requirements for your goals"
    }
  ]}
  color="red"
  title="Related Health Calculators"
/>
```

### Advanced Examples

#### Financial Calculators (Green Theme)
```tsx
<SimilarCalculators 
  calculators={[
    {
      calculatorName: "Loan Calculator",
      calculatorHref: "/financial/loan-calculator",
      calculatorDescription: "Calculate loan payments and schedules for any type of loan"
    },
    {
      calculatorName: "Investment Calculator",
      calculatorHref: "/financial/investment-calculator", 
      calculatorDescription: "Calculate investment returns and growth projections"
    },
    {
      calculatorName: "Compound Interest Calculator",
      calculatorHref: "/financial/compound-interest-calculator",
      calculatorDescription: "Calculate investment growth over time with compound interest"
    }
  ]}
  color="green"
  title="Related Financial Calculators"
/>
```

#### Math Calculators (Blue Theme) 
```tsx
<SimilarCalculators 
  calculators={[
    {
      calculatorName: "Percentage Calculator",
      calculatorHref: "/maths/percentage-calculator",
      calculatorDescription: "Calculate percentages, ratios, and percentage changes easily"
    },
    {
      calculatorName: "Volume Calculator",
      calculatorHref: "/maths/volume-calculator", 
      calculatorDescription: "Calculate the volume of various shapes"
    }
  ]}
  color="blue"
  title="Related Math Calculators"
/>
```

#### Construction Calculators (Orange Theme)
```tsx
<SimilarCalculators 
  calculators={[
    {
      calculatorName: "Board Foot Calculator",
      calculatorHref: "/construction/board-foot-calculator",
      calculatorDescription: "Calculate board feet for lumber and building materials"
    },
    {
      calculatorName: "Cubic Yard Calculator",
      calculatorHref: "/construction/cubic-yard-calculator",
      calculatorDescription: "Calculate cubic yards for concrete, soil, and other materials"
    },
    {
      calculatorName: "Square Feet to Cubic Yards Calculator", 
      calculatorHref: "/construction/square-feet-to-cubic-yards-calculator",
      calculatorDescription: "Convert square feet to cubic yards for materials"
    }
  ]}
  color="orange"
  title="Related Construction Calculators"
/>
```

## Props

### `calculators` (required)
Array of calculator objects with the following structure:
- `calculatorName`: string - Display name of the calculator
- `calculatorHref`: string - URL path to the calculator page  
- `calculatorDescription`: string (optional) - Brief description of the calculator

### `color` (optional)
String value for color theme. Available options:
- `"green"` - For financial calculators
- `"blue"` - For math calculators  
- `"red"` - For health calculators
- `"orange"` - For construction calculators
- `"purple"` - For specialized calculators
- `"gray"` - For other/miscellaneous calculators
- `"pink"` - Alternative theme
- `"yellow"` - For physics calculators
- `"teal"` - Alternative theme

Default: `"blue"`

### `title` (optional)
String for the section heading.
Default: `"Similar Calculators"`

### `className` (optional)
Additional CSS classes for custom styling.
Default: `""`

## Layout Behavior

The component automatically adjusts the grid layout based on the number of calculators:
- **1 calculator**: Single centered column with max width
- **2 calculators**: 1 column on mobile, 2 columns on desktop
- **3+ calculators**: 1 column on mobile, 2 columns on tablet, 3 columns on desktop

## Color Theme Examples

Each color theme includes:
- Icon color
- Left border color  
- Hover text color
- Header gradient background

Example color mappings:
- **Green**: Perfect for financial calculators (money, growth, success)
- **Red**: Ideal for health calculators (heart, medical, vitality)
- **Blue**: Great for math/technical calculators (logic, precision, trust)
- **Orange**: Suitable for construction calculators (tools, building, energy)

## Integration Examples

### Adding to a Calculator Page

```tsx
// In your calculator component file
import SimilarCalculators from "@/components/similar-calculators"

export default function YourCalculator() {
  return (
    <>
      {/* Your calculator content */}
      
      {/* Add before CalculatorGuide */}
      <SimilarCalculators 
        calculators={[
          // Your related calculators
        ]}
        color="green"
        title="Related Calculators"
      />
      
      <CalculatorGuide data={yourCalculatorData} />
    </>
  )
}
```

### Dynamic Calculator Selection

You can dynamically generate calculator lists based on categories:

```tsx
import { getCalculatorsByCategory } from "@/lib/calculator-data"

const relatedCalculators = getCalculatorsByCategory("financial")
  .filter(calc => calc.id !== "current-calculator-id")
  .slice(0, 3)
  .map(calc => ({
    calculatorName: calc.name,
    calculatorHref: calc.href,
    calculatorDescription: calc.description
  }))

<SimilarCalculators 
  calculators={relatedCalculators}
  color="green"
/>
```

## Best Practices

1. **Limit Calculator Count**: Show 2-4 related calculators for optimal user experience
2. **Relevant Selection**: Choose calculators that are contextually related
3. **Consistent Theming**: Use color themes that match the calculator category
4. **Descriptive Names**: Use clear, descriptive calculator names
5. **Quality Descriptions**: Provide helpful descriptions when available

## Accessibility

The component includes:
- Proper semantic HTML structure
- Keyboard navigation support via Link components
- Screen reader friendly content
- Focus indicators for interactive elements

## Mobile Responsiveness

- Single column layout on mobile devices
- Touch-friendly hover states
- Responsive text sizing
- Appropriate spacing and padding

## Example Implementation

See the mortgage calculator page for a complete implementation example:
`app/(calculators-by-category)/financial/mortgage-calculator/page.tsx`