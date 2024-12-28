import { PromptDetail } from '@/components/prompts/detail';
import { Metadata } from 'next';

type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getPromptById(id: string) {
  // TODO: Implementar la llamada a la API para obtener el prompt
  // Por ahora retornamos datos de ejemplo
  return {
    id: '1',
    title: 'Ejemplo de Prompt',
    prompt: 'Este es un prompt de ejemplo...',
    category: 'Desarrollo',
    tags: ['IA', 'Programación', 'Productividad'],
    description: 'Este es un prompt de ejemplo...',
    author: {
      id: '1',
      username: 'Usuario',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    likes: 42,
    comments: 5,
    reviews: [
      {
        id: '1',
        comment: 'Este prompt me ayudó mucho con mi proyecto. Muy bien estructurado y fácil de usar.',
        rating: 5,
        userId: 'usuario1',
        promptId: id,
        createdAt: new Date(Date.now() - 86400000), // 1 día atrás
        updatedAt: new Date(Date.now() - 86400000),
      },
      {
        id: '2',
        comment: 'Bueno, pero podría ser más específico en algunas partes.',
        rating: 4,
        userId: 'usuario2',
        promptId: id,
        createdAt: new Date(Date.now() - 172800000), // 2 días atrás
        updatedAt: new Date(Date.now() - 172800000),
      },
    ],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const prompt = await getPromptById(params.id);
  return {
    title: prompt.title,
    description: prompt.description,
  };
}

export default async function PromptDetailPage(props: PageProps) {
  const prompt = await getPromptById(props.params.id);
  return <PromptDetail {...prompt} />;
}
