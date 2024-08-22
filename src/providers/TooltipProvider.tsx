'use client';

import { TooltipProvider as ToolTipProviderBase } from '@/components/ui/tooltip';

export default function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <ToolTipProviderBase>{children}</ToolTipProviderBase>;
}
