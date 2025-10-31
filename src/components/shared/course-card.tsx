'use client';

import { Video, Gamepad2 } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Course } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const difficultyColors = {
  Beginner: "border-green-500/50 text-green-400",
  Intermediate: "border-yellow-500/50 text-yellow-400",
  Advanced: "border-red-500/50 text-red-400",
};

export const CourseCard = ({ course }: { course: Course }) => {
  const isArcade = course.id === 20;

  return (
    <Link href={course.csbLink} target="_blank" aria-label={`View course ${course.title}`} className="h-full">
      <Card
        className={cn(
          "flex flex-col h-full w-full transition-all duration-300 group",
          isArcade &&
            "border-accent/50 hover:border-accent/80 bg-gradient-to-br from-accent/5 via-background to-background"
        )}
      >
        <div className="relative z-10 flex flex-col h-full">
          <CardHeader className="flex-row items-start justify-between pb-2">
            <div className="flex-1">
              <CardTitle
                className={cn(
                  "text-base font-medium leading-tight pr-2 transition-colors",
                  isArcade && "text-accent"
                )}
              >
                {isArcade ? `${course.title}` : course.title}
              </CardTitle>
            </div>
            {isArcade && (
              <Gamepad2 className="h-5 w-5 text-accent shrink-0" />
            )}
          </CardHeader>
          <CardContent className="flex-grow pt-2 pb-4">
            <Badge
              variant="outline"
              className={cn(
                "font-normal text-xs transition-colors",
                difficultyColors[course.difficulty],
                isArcade && "border-accent/50 text-accent"
              )}
            >
              {course.difficulty}
            </Badge>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};
