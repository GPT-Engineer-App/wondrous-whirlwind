import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### new

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | int8                     | number | true     |
| created_at | timestamp with time zone | string | true     |

*/

// Hooks for the 'new' table
export const useNew = () => useQuery({
    queryKey: ['new'],
    queryFn: () => fromSupabase(supabase.from('new').select('*')),
});

export const useAddNew = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newItem) => fromSupabase(supabase.from('new').insert([newItem])),
        onSuccess: () => {
            queryClient.invalidateQueries('new');
        },
    });
};

export const useUpdateNew = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('new').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('new');
        },
    });
};

export const useDeleteNew = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('new').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('new');
        },
    });
};

export const useGetNewById = (id) => useQuery({
    queryKey: ['new', id],
    queryFn: () => fromSupabase(supabase.from('new').select('*').eq('id', id).single()),
    enabled: !!id,
});