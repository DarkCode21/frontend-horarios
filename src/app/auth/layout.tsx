import Image from "next/image";
import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen p-5">
      <div className="flex h-full min-h-[calc(100vh-40px)] overflow-hidden bg-white">
        <div className="relative hidden w-[65%] lg:block">
          <Image
            src="/images/logo-unt.webp"
            alt="UNT Campus Collage"
            fill
            className="object-cover rounded-3xl"
            style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
            priority
          />
        </div>
        <div className="flex-1 px-8 py-6">{children}</div>
      </div>
    </div>
  );
}
