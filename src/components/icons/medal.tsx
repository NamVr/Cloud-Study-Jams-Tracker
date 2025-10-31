import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

const colors = {
  gold: {
    ribbon: "#f7b002",
    metal: "#f9c74f",
  },
  silver: {
    ribbon: "#a0a0a0",
    metal: "#c0c0c0",
  },
  bronze: {
    ribbon: "#c57521",
    metal: "#d98a3b",
  },
};

type MedalProps = SVGProps<SVGSVGElement> & {
  rank: 1 | 2 | 3;
};

export function Medal({ rank, className, ...props }: MedalProps) {
  const color =
    rank === 1 ? colors.gold : rank === 2 ? colors.silver : colors.bronze;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path
        d="M9 3v7.5L12 13l3-2.5V3"
        fill={color.ribbon}
        stroke={color.ribbon}
      />
      <path
        d="M12 13L9 3h6l-3 10z"
        fill={color.ribbon}
        stroke={color.ribbon}
      />
      <circle cx="12" cy="16" r="5" fill={color.metal} stroke={color.metal} />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        dy=".3em"
        fill="white"
        fontSize="8"
        fontWeight="bold"
      >
        {rank}
      </text>
    </svg>
  );
}
