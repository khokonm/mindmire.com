# Mindmire - Sink into the Mire of My Mind

A digital swamp of unfiltered, eclectic thoughts—random, niche-free, and chaotic. Welcome to the murky depths where ideas ferment and bubble to the surface.

## 🌿 What is Mindmire?

Mindmire is a personal blog with a unique "digital swamp" aesthetic, designed for sharing unfiltered thoughts, observations, and ideas without the constraints of traditional blog categories or themes. It's a place where content grows organically, like vegetation in a marsh.

### Key Features

- **🎨 Swampy Theme**: Custom CSS styling with earthy greens, browns, and organic elements
- **🗺️ Mire Map**: Interactive tag visualization showing the landscape of topics
- **📝 MDX Support**: Write posts in Markdown with React component support
- **🌙 Dark Mode**: Built-in dark/light theme switching
- **🔍 Search**: Integrated search functionality with keyboard shortcuts
- **📱 Responsive**: Mobile-first design that works across all devices
- **⚡ Fast**: Built on Next.js for optimal performance
- **📧 Newsletter**: Email subscription support (configurable providers)
- **🏷️ Tags**: Flexible tagging system with visual tag cloud

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/khokonm/mindmire.git
cd mindmire
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Content Management

### Writing Posts

Posts are written in MDX format and stored in the `data/blog/` directory. Each post includes:

- **Frontmatter**: Metadata like title, date, tags, and summary
- **Content**: Markdown with optional React components

Example post structure:

```mdx
---
title: 'Your Post Title'
date: '2024-01-01'
tags: ['tag1', 'tag2']
draft: false
summary: 'A brief description of your post'
---

Your post content goes here...
```

### Managing Tags

Tags are automatically generated from post frontmatter. The Mire Map page displays all tags and their associated posts in an interactive format.

### Author Information

Update your author details in `data/authors/default.mdx`.

## ⚙️ Configuration

### Site Settings

Edit `data/siteMetadata.js` to configure:

- Site title and description
- Social media links
- Analytics providers
- Newsletter service
- Comment system

### Styling

The swampy theme is defined in:

- `css/tailwind.css` - Custom CSS classes and color variables
- `tailwind.config.js` - Tailwind configuration
- Font imports from Google Fonts (Open Sans, Lora, Caveat)

## 🎨 Theme Customization

The Mindmire theme features:

- **Color Palette**: Deep greens, muddy browns, inky blacks
- **Typography**: Google Fonts with serif accents for organic feel
- **Components**: Custom mire-themed cards, buttons, and dividers
- **Animations**: Subtle organic movement and transitions

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Other Platforms

The site can be deployed to any platform supporting Next.js:

- Netlify
- AWS Amplify
- Railway
- Self-hosted with PM2

## 🛠️ Built With

- **[Next.js](https://nextjs.org/)** - React framework for production
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Contentlayer](https://contentlayer.dev/)** - Content management
- **[MDX](https://mdxjs.com/)** - Markdown with React components
- **[Pliny](https://github.com/timlrx/pliny)** - Blog utilities and components

## 🙏 Credits

This project is built upon the excellent [Tailwind Nextjs Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) by [Timothy Lin](https://twitter.com/timlrx). The starter template provided a solid foundation that allowed for creative customization while maintaining modern web development best practices.

## 📄 License

MIT License - feel free to use this code for your own swampy blog adventures.

## 🐛 Issues & Contributions

Found a bug or want to contribute? Please open an issue or submit a pull request on GitHub.

---

_Remember: The best ideas come from letting thoughts marinate in the mire until they're ready to surface._
