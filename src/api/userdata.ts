import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { UserRequest } from '../lib/types';

type ApiResponse = {
  data: UserRequest[];
};

export const useFetchCalendarData = (url: string) => {
  const [data, setData] = useState<UserRequest[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<ApiResponse> = await axios.get(url);
        const responseData = response.data.data;
        if (!responseData || responseData.length === 0) {
          setError('No data available');
        } else {
          setData(responseData);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Error fetching data');
        } else {
          setError('Error fetching data');
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, [url]);

  return { data, loading, error };
};