'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ClarityEvent, clarity } from '@/lib/clarity-events';

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function generateSessionId(): string {
  return `session_${Math.random().toString(36).substring(2, 15)}`;
}

function useThrottle<T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number,
): T {
  const lastRun = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastRun = now - lastRun.current;

      if (timeSinceLastRun >= delay) {
        callback(...args);
        lastRun.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastRun.current = Date.now();
        }, delay - timeSinceLastRun);
      }
    }) as T,
    [callback, delay],
  );
}

export function useClarity() {
  const [isTracking, setIsTracking] = useState(false);
  const userIdRef = useRef<string>('');
  const sessionIdRef = useRef<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    userIdRef.current = generateUserId();
    sessionIdRef.current = generateSessionId();

    clarity.identify(userIdRef.current);
    clarity.event(ClarityEvent.USER_IDENTIFIED, {
      user_id: userIdRef.current,
      session_id: sessionIdRef.current,
      timestamp: new Date().toISOString(),
    });

    setIsTracking(true);
  }, []);

  const trackCodeInput = useThrottle((language: string, charCount: number) => {
    clarity.event(ClarityEvent.CODE_INPUT, {
      language,
      char_count: charCount,
      event_type: 'throttle',
      timestamp: new Date().toISOString(),
    });
  }, 5000);

  const trackCodePaste = (language: string, charCount: number) => {
    clarity.event(ClarityEvent.CODE_PASTE, {
      language,
      char_count: charCount,
      event_type: 'paste',
      timestamp: new Date().toISOString(),
    });
  };

  const trackRoastModeToggle = (mode: boolean) => {
    clarity.event(ClarityEvent.ROAST_MODE_TOGGLED, {
      mode,
      timestamp: new Date().toISOString(),
    });
  };

  const trackRoastSubmit = (
    language: string,
    charCount: number,
    roastMode: boolean,
  ) => {
    clarity.event(ClarityEvent.ROAST_SUBMIT_CLICK, {
      language,
      char_count: charCount,
      roast_mode: roastMode,
      timestamp: new Date().toISOString(),
    });
  };

  const trackLeaderboardClick = (fromPath: string) => {
    clarity.event(ClarityEvent.LEADERBOARD_CLICK, {
      from_path: fromPath,
      to_path: '/leaderboard',
      timestamp: new Date().toISOString(),
    });
  };

  const getUserId = () => userIdRef.current;

  return {
    isTracking,
    trackCodeInput,
    trackCodePaste,
    trackRoastModeToggle,
    trackRoastSubmit,
    trackLeaderboardClick,
    getUserId,
  };
}
