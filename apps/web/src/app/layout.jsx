import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const metadata = {
  title: "WetonVora - Kalkulator Weton Jawa Gratis & Akurat",
  description:
    "Temukan weton Jawa Anda beserta karakteristik, jodoh yang cocok, dan tips hidup berdasarkan primbon tradisional. Gratis dan mudah digunakan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
