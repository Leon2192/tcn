import { useId } from "react";
export function Logo({
  variant = "horizontal",
  className = "",
}: {
  variant?: "primary" | "horizontal" | "mono" | "icon";
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <span className={`logo logo-${variant} ${className}`}>
      <svg viewBox="0 0 100 100" role="img" aria-label="TCN — The Cabin Nation">
        <defs>
          <linearGradient id={id} x2=".8" y2="1">
            <stop stopColor="#F8FAFC" />
            <stop offset=".45" stopColor="#C0C7D4" />
            <stop offset="1" stopColor="#526176" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={variant === "mono" ? "currentColor" : `url(#${id})`}
          strokeWidth="3"
        />
        <path
          d="M16 32 A40 40 0 0 1 78 20"
          fill="none"
          stroke={variant === "mono" ? "currentColor" : "#2563EB"}
          strokeWidth="3"
        />
        <path
          d="M84 68 A40 40 0 0 1 22 80"
          fill="none"
          stroke={variant === "mono" ? "currentColor" : "#EF4444"}
          strokeWidth="3"
        />
        <path
          d="M18 38H39V45H32V63H25V45H18ZM44 38H61V45H48V56H61V63H41V41ZM65 63V38H72L81 51V38H88V63H81L72 50V63Z"
          fill={variant === "mono" ? "currentColor" : `url(#${id})`}
        />
      </svg>
      {variant !== "icon" && (
        <span>
          <strong>TCN</strong>
          <small>THE CABIN NATION</small>
        </span>
      )}
    </span>
  );
}
