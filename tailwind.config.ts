/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand
        primary: "#4F8CFF",
        secondary: "#6C7CFF",

        // Backgrounds
        bg: {
          main: "#F7F9FC",
          card: "#FFFFFF",
          alt: "#EEF2F7",
          hover: "#F1F5FF",
          selected: "#EAF0FF",
        },

        // Text
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },

        // Borders & dividers
        border: {
          light: "#E5E7EB",
          subtle: "#EDF0F5",
        },

        // Status
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
    },
  },
  plugins: [],
};

