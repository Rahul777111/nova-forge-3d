import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // Theme
  theme: 'dark',
  setTheme: (theme) => set({ theme }),

  // Loading
  appLoaded: false,
  setAppLoaded: () => set({ appLoaded: true }),

  // Cookie consent
  cookieAccepted: false,
  setCookieAccepted: () => set({ cookieAccepted: true }),

  // Active section for nav highlighting
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}));
