import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai';

export default async function Home() {
    const {text} = await generateText({
        model: openai('gpt-5'),
        prompt: 'Write a vegetarian lasagna recipe for 4 people.',
    })

  return (
    <p>{text}</p>
  );
}
