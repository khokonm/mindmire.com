import {
  Inter,
  Lora,
  Indie_Flower,
  Caveat,
  Playfair_Display,
  Montserrat,
  Raleway,
  Edu_NSW_ACT_Foundation,
} from 'next/font/google'

// Initialize all fonts at module level
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
})

const indieFlower = Indie_Flower({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
})

const eduNSWACTFoundation = Edu_NSW_ACT_Foundation({
  subsets: ['latin'],
  display: 'swap',
})

// Define your font choices here - just change these names to use different fonts
const FONT_CHOICES = {
  sans: 'Inter', // Change this to use a different sans-serif font
  serif: 'Lora', // Change this to use a different serif font
  display: 'Edu NSW ACT Foundation', // Change this to use a different display font
} as const

// Font mapping - maps font names to their initialized instances
const FONT_MAP = {
  Inter: inter,
  Lora: lora,
  'Indie Flower': indieFlower,
  Caveat: caveat,
  'Playfair Display': playfairDisplay,
  Montserrat: montserrat,
  Raleway: raleway,
  'Edu NSW ACT Foundation': eduNSWACTFoundation,
} as const

// Export the fonts based on your choices
export const fonts = {
  sans: FONT_MAP[FONT_CHOICES.sans],
  serif: FONT_MAP[FONT_CHOICES.serif],
  display: FONT_MAP[FONT_CHOICES.display],
}

// Font configuration
export const fontConfig = {
  // Default fonts
  defaultFonts: {
    sans: 'Inter',
    serif: 'Lora',
    display: 'Indie Flower',
  },

  // Font weights
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Font sizes
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
}
