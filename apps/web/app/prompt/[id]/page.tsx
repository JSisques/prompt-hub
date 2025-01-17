'use client';

import { PromptDetail } from '@/components/prompts/detail';
import { graphqlClient } from '@/lib/apollo-client';
import { GET_PROMPT_BY_ID } from '@/lib/graphql/prompt/queries';
import { PromptDetailProps } from '@/types/prompt';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PromptDetailPage() {
  const params = useParams();
  const [prompt, setPrompt] = useState<PromptDetailProps | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchPrompt = async (id: string) => {
    setLoading(true);
    const { data } = await graphqlClient.query({
      query: GET_PROMPT_BY_ID,
      variables: { id },
    });
    setPrompt(data.getPromptById);
    setLoading(false);
  };

  useEffect(() => {
    fetchPrompt(params.id as string);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (!prompt) {
    return <div>Prompt not found</div>;
  }

  return <PromptDetail {...prompt} />;
}
