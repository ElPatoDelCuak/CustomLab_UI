import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CustomLab - Sobre Nosotros",
  description: "Encuentra información sobre customlab aqui!"
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return children;
}