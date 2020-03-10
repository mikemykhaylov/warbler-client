import { useEffect } from 'react';

export default function useAuth(history, isAuthenticated) {
  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/signin');
    }
  });
}
