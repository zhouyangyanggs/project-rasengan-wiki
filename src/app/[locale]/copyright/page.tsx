import { getMessages } from "next-intl/server";

export default async function Page() {
  const messages = await getMessages();
  const legal = messages.legal.copyright;
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{legal.title}</h1>
      <div className="mt-8 space-y-4 text-lg leading-8 text-muted-foreground">{legal.paragraphs.map((p: string) => <p key={p}>{p}</p>)}</div>
    </main>
  );
}
