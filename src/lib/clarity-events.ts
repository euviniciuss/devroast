import Clarity from '@microsoft/clarity';

export const clarity = {
  identify: (userId: string): void => {
    if (typeof window !== 'undefined') {
      Clarity.identify(userId);
    }
  },

  event: (name: string, data?: Record<string, unknown>): void => {
    if (typeof window !== 'undefined') {
      Clarity.setTag(name, JSON.stringify(data));
    }
  },

  setTag: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      Clarity.setTag(key, value);
    }
  },
};

export const ClarityEvent = {
  USER_IDENTIFIED: 'user_identified',
  CODE_INPUT: 'code_input',
  CODE_PASTE: 'code_paste',
  ROAST_MODE_TOGGLED: 'roast_mode_toggled',
  ROAST_SUBMIT_CLICK: 'roast_submit_click',
  LEADERBOARD_CLICK: 'leaderboard_click',
} as const;

export type ClarityEventType = (typeof ClarityEvent)[keyof typeof ClarityEvent];
