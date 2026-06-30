import { useQuery } from '@tanstack/react-query';
import api from './api';

// Shared React Query Hook to load dynamic Frontend CMS configurations from Mongoose Setting model
export const useCMSConfig = () => {
    return useQuery({
        queryKey: ['cmsConfig'],
        queryFn: async () => {
            const res = await api.get('/users/frontend-config');
            return res.data.data;
        },
        staleTime: 10 * 60 * 1000, // 10 minutes cache
        retry: 1
    });
};
