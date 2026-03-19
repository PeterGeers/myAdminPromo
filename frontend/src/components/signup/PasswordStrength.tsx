"use client";

import { useTranslations } from "next-intl";

const config = {
  weak: { segments: 1, color: "bg-red-500", textColor: "text-red-600", key: "passwordStrengthWeak" },
  fair: { segments: 2, color: "bg-amber-500", textColor: "text-amber-600", key: "passwordStrengthFair" },
  good: { segments: 3, color: "bg-brand-teal", textColor: "text-brand-teal", key: "passwordStrengthGood" },
  strong: { segments: 4, color: "bg-green-500", textColor: "text-green-600", key: "passwordStrengthStrong" },
} as const;

interface PasswordStrengthProps {
  strength: "weak" | "fair" | "good" | "strong";
}

export default function PasswordStrength({ strength }: PasswordStrengthProps) {
  const t = useTranslations("Signup");
  const { segments, color, textColor, key } = config[strength];

  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex flex-1 gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= segments ? color : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <span className={`text-xs font-medium ${textColor}`}>
        {t(key)}
      </span>
    </div>
  );
}
