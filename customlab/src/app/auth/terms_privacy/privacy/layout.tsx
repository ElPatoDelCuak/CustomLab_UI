import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CustomLab - Privacidad",
  description: "Política de privacidad de CustomLab"
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return children;
}