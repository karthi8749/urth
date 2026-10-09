import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
  showArrow?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "outline",
  className,
  showArrow = true,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      data-cursor-merge={variant === "outline" ? "" : "text"}
      className={cn(
        "group relative inline-flex items-center gap-3 border px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300",
        variant === "solid" &&
          "border-cream bg-cream text-brown hover:border-orange hover:bg-orange hover:text-cream",
        variant === "outline" &&
          "border-cream/40 text-cream hover:border-orange hover:text-cream",
        variant === "ghost" &&
          "border-transparent text-cream hover:text-orange",
        className,
      )}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.5}
        />
      )}
    </Link>
  );
}