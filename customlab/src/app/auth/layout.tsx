import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CustomLab - Login",
  description: "Login a tu cuenta de customlab"
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return children;
}