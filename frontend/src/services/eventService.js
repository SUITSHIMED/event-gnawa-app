import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import axios from 'axios';

export const useEventInfo = () => useQuery({
    queryKey: ['eventInfo'],
    queryFn: async () => {
        const candidates = [
            api.defaults.baseURL,
            'http://192.168.1.104:3000/api',
            'http://10.0.2.2:3000/api',
            'http://localhost:3000/api',
        ].filter(Boolean);

        let lastErr = null;
        for (const base of candidates) {
            const url = base.replace(/\/$/, '') + '/event';
            console.log('[api] trying', url);
            try {
                const resp = await axios.get(url, { headers: api.defaults.headers });
                console.log('[api] success from', base, resp.data);
                api.defaults.baseURL = base;
                return resp.data;
            } catch (err) {
                console.warn('[api] failed for', base, err.message || err);
                lastErr = err;
            }
        }
        console.error('[api] all candidates failed', lastErr);
        throw lastErr;
    },
});