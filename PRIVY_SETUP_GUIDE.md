# Privy Setup Guide - Fix ERR_CONNECTION_RESET Error

## 🔍 **Problem**
The error `Failed to load resource: net::ERR_CONNECTION_RESET` for `@privy-io_react-auth.js` indicates that Privy is failing to load, preventing your project from displaying.

## 🚀 **Solution**

### Step 1: Create Environment File

Create a `.env` file in your project root with the following content:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Privy Configuration
VITE_PRIVY_APP_ID=your_privy_app_id_here
```

### Step 2: Get Privy App ID

1. Go to [Privy Dashboard](https://dashboard.privy.io/)
2. Sign up or log in
3. Create a new app or select existing app
4. Copy the App ID from the dashboard
5. Replace `your_privy_app_id_here` in your `.env` file

### Step 3: Alternative - Remove Privy Temporarily

If you want to test without Privy, you can temporarily remove it:

1. **Comment out PrivyProvider in `src/index.tsx`:**
```typescript
// import { PrivyProvider } from "@privy-io/react-auth";

// Wrap your app with PrivyProvider
// <PrivyProvider
//   appId={(import.meta.env.VITE_PRIVY_APP_ID || '') as string}
//   config={{
//     loginMethods: ["wallet", "email", "google", "twitter"],
//     appearance: {
//       theme: "dark",
//       accentColor: "#29A140",
//     },
//   }}
// >
//   <ThemeProvider>
//     <AuthProvider>
//       <ModalProvider>
//         <AppContent />
//       </ModalProvider>
//     </AuthProvider>
//   </ThemeProvider>
// </PrivyProvider>

// Replace with:
<ThemeProvider>
  <AuthProvider>
    <ModalProvider>
      <AppContent />
    </ModalProvider>
  </AuthProvider>
</ThemeProvider>
```

2. **Update AuthContext to remove Privy dependencies:**
```typescript
// Comment out Privy imports
// import { usePrivy, useWallets } from '@privy-io/react-auth';

// Remove Privy hooks
// const { ready: privyReady, authenticated: privyAuthenticated, user: privyUser, login: privyLogin, logout: privyLogout } = usePrivy();
// const { wallets, ready: walletsReady } = useWallets();

// Update connectWallet function
const connectWallet = async (walletType: 'solana' | 'ethereum' | 'bitcoin') => {
  // Simple alert for now
  alert(`${walletType} wallet connection not available without Privy`);
};
```

### Step 4: Test the Fix

1. **With Privy App ID:** Restart your dev server after adding the `.env` file
2. **Without Privy:** The app should load without the connection error

## 🎯 **Recommended Approach**

1. **Get a Privy App ID** (recommended for full functionality)
2. **Add it to `.env` file**
3. **Restart the development server**
4. **Test wallet connections**

## 🚨 **Important Notes**

- **Never commit `.env` file** to version control
- **Add `.env` to `.gitignore`**
- **Restart dev server** after adding environment variables
- **Privy App ID is required** for wallet functionality

The project should display properly after following these steps! 🎉
