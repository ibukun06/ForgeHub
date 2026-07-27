import { OnboardingForm } from "./onboarding-form";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-xl font-semibold text-text-primary">Complete your profile</h1>
        <p className="mt-1 text-sm text-text-muted">
          This is what your teammates and advisors will see.
        </p>
      </div>
      <OnboardingForm />
    </div>
  );
}
