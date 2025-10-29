# CareLevel - Support Creators & Brands

A cryptocurrency-based community platform built around the concept of "CareLevel Score" - a gamified system that rewards users for purchasing and donating the `$CARELEVEL` token.

## 🌟 Overview

CareLevel is a Solana-based cryptocurrency project that aims to support creators, businesses, and innovators by creating a community-driven funding ecosystem. Users can purchase and donate tokens, earn CareLevel Scores, and compete on leaderboards.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables (create a `.env` file):

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173/](http://localhost:5173/) in your browser

### Build for Production

```bash
npm run build
```

## 🎨 Features

### 🌓 Dark & Light Mode

The application supports both dark and light themes with seamless switching:

- **Theme Toggle**: Click the sun/moon icon in the navigation bar to switch themes
- **Persistent Theme**: Your theme preference is saved to localStorage
- **System Preference**: Automatically detects and applies your system's color scheme preference on first visit
- **No Flash**: Theme is applied immediately on page load to prevent white flash

The theme system uses CSS variables that automatically update across all components when you switch themes.

### 💰 Core Features

- **Buy $CARELEVEL**: Purchase tokens using SOL, BTC, or other cryptocurrencies
- **Make Donations**: Support brands and creators (donations earn 1.5x CareLevel Score)
- **CareLevel Score**: Gamified scoring system based on purchases and donations
- **Leaderboards**: Compete with other users and climb the rankings
- **User Profiles**: Track your impact, transactions, and statistics
- **Spotlights**: Featured users and businesses of the week

### 🎮 Gamification

- **Purchase Score**: `amount × 100` points per purchase
- **Donation Score**: `amount × 150` points per donation
- **Rankings**: Top 3 users get special badges (Gold, Blue, Orange)
- **Leaderboards**: Real-time rankings based on CareLevel Score

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Backend**: Supabase
  - Authentication (email/password)
  - PostgreSQL database
  - Row Level Security (RLS)

## 📁 Project Structure

```
src/
├── components/
│   └── ui/              # Reusable UI components (shadcn/ui)
├── contexts/
│   ├── AuthContext.tsx  # Authentication state management
│   └── ThemeContext.tsx # Theme state management
├── lib/
│   ├── supabase.ts      # Supabase client configuration
│   └── utils.ts         # Utility functions
├── screens/
│   ├── LandingPage/     # Public landing page
│   ├── Login/           # User login
│   ├── Signup/          # User registration
│   ├── Dashboard/       # User dashboard
│   ├── BuyCarelevel/    # Purchase tokens
│   ├── Donation/        # Make donations
│   ├── Profile/         # User profile
│   ├── EditProfile/     # Edit user profile
│   └── TransactionSuccess/ # Transaction confirmation
└── index.tsx            # App entry point
```

## 🗄️ Database Schema

### Profiles Table
- User information (username, full_name, bio, avatar)
- Stats (total_donated, total_purchased, carelevel_score)

### Transactions Table
- Transaction history (type, amount, token_type, status)
- Links to user profiles

### Businesses Table
- Featured businesses and brands
- Verification status

## 🎯 Routes

- `/` - Landing page
- `/login` - User login
- `/signup` - User registration
- `/dashboard` - User dashboard (protected)
- `/buy` - Purchase $CARELEVEL (protected)
- `/donate` - Make donations (protected)
- `/profile` - View profile (protected)
- `/edit-profile` - Edit profile (protected)
- `/transaction-success` - Transaction confirmation (protected)

## 🔒 Security

- Row Level Security (RLS) enabled on all database tables
- Users can only manage their own data
- Authentication via Supabase Auth
- Protected routes redirect to login if not authenticated

## 🎨 Customizing Themes

The theme system uses CSS variables defined in `tailwind.css`. You can customize colors by modifying:

```css
/* Light Mode */
:root {
  --light-modeblack: rgba(255, 255, 255, 1);
  --light-modewhite: rgba(13, 17, 23, 1);
  /* ... other variables */
}

/* Dark Mode */
.dark {
  --light-modeblack: rgba(13, 17, 23, 1);
  --light-modewhite: rgba(244, 250, 255, 1);
  /* ... other variables */
}
```

## 📝 License

This project was generated with [Anima](https://animaapp.com/) and is for educational purposes.

## 🤝 Contributing

This is a learning project for Solana development. Feel free to fork and experiment!

---

Built with ❤️ for the CareLevel community

