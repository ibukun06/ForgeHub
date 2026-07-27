"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { onboardingSchema } from "@/lib/validation/auth";
import type { AuthActionState } from "@/lib/actions/auth";

export async function completeOnboarding(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const skillsRaw = formData.get("skills");
  const parsed = onboardingSchema.safeParse({
    name: formData.get("name"),
    institution: formData.get("institution") || undefined,
    bio: formData.get("bio") || undefined,
    skills:
      typeof skillsRaw === "string" && skillsRaw.length > 0
        ? skillsRaw.split(",").map((s) => s.trim()).filter(Boolean)
        : undefined,
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("users")
    .update({
      name: parsed.data.name,
      institution: parsed.data.institution ?? null,
      bio: parsed.data.bio ?? null,
      skills: parsed.data.skills ?? [],
    })
    .eq("id", user.id);

  if (error) {
    return { error: "Couldn't save your profile — please try again." };
  }

  redirect("/dashboard");
}
