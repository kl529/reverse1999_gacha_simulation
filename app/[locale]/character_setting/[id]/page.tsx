import { redirect } from "next/navigation";

export default async function CharacterSettingDetailRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/character/${id}`);
}
