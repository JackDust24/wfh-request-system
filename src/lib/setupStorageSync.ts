/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect } from 'react';
import { useWFHStore } from '../store/wfhRequestsStore';
import { WFHEventEmitter } from './eventEmitter';

export const useWFHSync = () => {
  const store = useWFHStore();

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'wfh-store') {
        try {
          const newState = JSON.parse(e.newValue || '{}');
          if (newState.state) {
            // Emit the change event without directly modifying the store
            WFHEventEmitter.emit('wfhEventChange');
          }
        } catch (error) {
          console.error('Error parsing storage update:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return null;
};
