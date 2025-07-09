"use client";
import { Toaster } from "@/components/ui/sonner"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}
            <Toaster />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;