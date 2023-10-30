import { useRef, useEffect } from "react";
import { usePathname } from 'next/navigation'

export const usePreviousRoute = (): string | null => {
  const pathName: string = usePathname();

  const ref = useRef<string | null>(null);

  useEffect(() => {
    ref.current = pathName;
  }, [ pathName ]);

  return ref.current;
};