import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CustomLab - Terminos y Condiciones",
  description: "Términos y condiciones de uso en CustomLab"
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return children;
}