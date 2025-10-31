
'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress as UiProgress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";
import { Medal } from "@/components/icons/medal";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import database from '@/database.json';
import type { Database, RawParticipant, Participant, Team } from '@/lib/types';
import { teams as mockTeamsData } from "@/lib/mock-data";

type ExtendedTeam = Team & {
    activeCount: number;
    inactiveCount: number;
}

// Helper function to process the database JSON for teams
const processTeamData = (db: Database): ExtendedTeam[] => {
  const participantsList = Object.values(db);

  const teamsMap = new Map<string, RawParticipant[]>();

  participantsList.forEach(p => {
    if (p.teamName && p.teamName !== 'N/A') {
      if (!teamsMap.has(p.teamName)) {
        teamsMap.set(p.teamName, []);
      }
      teamsMap.get(p.teamName)!.push(p);
    }
  });

  const teams = Array.from(teamsMap.entries()).map(([name, members]) => {
    const processedMembers: Participant[] = members.map(p => {
        const totalCompletions = p.progress.SkillBadgesCount + p.progress.ArcadeGamesCount;
        const progressPercentage = Math.min(Math.round((totalCompletions / 20) * 100), 100);
        const rank = p.progress.Rank;
        const isSwagEligible = progressPercentage === 100 && typeof rank === 'number' && rank <= 100;
        
        return {
            rank: rank,
            name: p.fullName,
            progressPercentage: progressPercentage,
            badgesCompleted: totalCompletions,
            isSwagEligible: isSwagEligible,
            profileUrl: p.profileUrl,
            teamName: p.teamName || 'N/A',
        };
    });

    const teamProgressPercentage = processedMembers.length > 0 ? Math.round(
      processedMembers.reduce((sum, p) => sum + p.progressPercentage, 0) / processedMembers.length
    ) : 0;
    
    const completionCount = processedMembers.filter(p => p.progressPercentage === 100).length;
    const activeCount = processedMembers.filter(p => p.progressPercentage > 0 && p.progressPercentage < 100).length;
    const inactiveCount = processedMembers.length - completionCount - activeCount;

    // Find corresponding mock team for color and mentor info
    const mockTeam = mockTeamsData.find(t => t.name === name);

    return {
      name,
      color: mockTeam?.color || 'hsl(var(--foreground))',
      mentor: mockTeam?.mentor || { name: 'Unknown Mentor', avatar: '' },
      members: processedMembers,
      progressPercentage: teamProgressPercentage,
      completionCount: completionCount,
      activeCount: activeCount,
      inactiveCount: inactiveCount
    };
  });

  // Sort teams by progress and assign rank
  return teams
    .sort((a, b) => b.progressPercentage - a.progressPercentage)
    .map((team, i) => ({
      ...team,
      rank: i + 1,
    }));
};

function TeamMembersTable({ team }: { team: ExtendedTeam }) {
  // Sort members by progress
  const sortedMembers = [...team.members].sort((a, b) => b.progressPercentage - a.progressPercentage);
  
  return (
    <div className="p-4 bg-muted/50">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Participant</TableHead>
            <TableHead className="text-center">Badges</TableHead>
            <TableHead className="w-[200px]">Progress</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMembers.map((p) => (
            <TableRow key={p.name}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={p.profileUrl} target="_blank" className="font-medium hover:underline">
                    {p.name}
                  </Link>
                   {p.isSwagEligible && (
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-none whitespace-nowrap">
                          <Award className="mr-1 h-3 w-3" />
                          Swag Eligible
                        </Badge>
                      )}
                </div>
              </TableCell>
              <TableCell className="text-center">{p.badgesCompleted}/20</TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <UiProgress value={p.progressPercentage} className="w-[60%]" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {p.progressPercentage}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function TeamEngagementBar({ team }: { team: ExtendedTeam }) {
  const totalMembers = team.members.length;
  if (totalMembers === 0) return null;

  const completedPercentage = (team.completionCount / totalMembers) * 100;
  const activePercentage = (team.activeCount / totalMembers) * 100;
  const inactivePercentage = (team.inactiveCount / totalMembers) * 100;

  return (
    <div className="p-4 bg-muted/50 border-y">
      <div className="text-sm font-medium mb-2">Team Engagement</div>
      <div className="flex h-3 w-full rounded-full overflow-hidden bg-muted mb-2">
        <div className="bg-green-500" title={`Completed: ${team.completionCount}`} style={{ width: `${completedPercentage}%` }} />
        <div className="bg-yellow-500" title={`Active: ${team.activeCount}`} style={{ width: `${activePercentage}%` }} />
        <div className="bg-gray-600" title={`Inactive: ${team.inactiveCount}`} style={{ width: `${inactivePercentage}%` }} />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center">
          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          <span>Completed: {team.completionCount}</span>
        </div>
        <div className="flex items-center">
          <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
          <span>Active: {team.activeCount}</span>
        </div>
        <div className="flex items-center">
          <span className="h-2 w-2 rounded-full bg-gray-600 mr-2"></span>
          <span>Inactive: {team.inactiveCount}</span>
        </div>
      </div>
    </div>
  );
}


function TeamCard({ team }: { team: ExtendedTeam }) {
  const mentorAvatar = PlaceHolderImages.find(img => img.id === team.mentor.avatar);
  
  return (
    <Card className="overflow-hidden border-border/40">
       <Accordion type="single" collapsible>
        <AccordionItem value={`item-${team.rank}`} className="border-b-0">
          <AccordionTrigger className="hover:no-underline [&[data-state=open]]:bg-muted/50">
             <div className="flex flex-row items-start gap-4 p-4 w-full">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-2xl font-bold w-8 text-center shrink-0">
                  {team.rank <= 3 ? <Medal rank={team.rank as 1|2|3} className="mx-auto h-8 w-8" /> : team.rank}
                </div>
                {mentorAvatar && (
                  <Avatar className="hidden sm:block h-12 w-12 border-2" style={{ borderColor: team.color }}>
                    <Image
                        src={mentorAvatar.imageUrl}
                        alt={`Mentor ${team.mentor.name}`}
                        width={48}
                        height={48}
                        className="rounded-full"
                        data-ai-hint={mentorAvatar.imageHint}
                      />
                  </Avatar>
                )}
                <div className="grid gap-0.5 text-left">
                  <CardTitle className="group flex items-center gap-2 text-lg" style={{ color: team.color }}>
                    {team.name}
                  </CardTitle>
                  <CardDescription>Completion Count: {team.completionCount}</CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-2xl">
                  {team.progressPercentage}%
                </div>
                <div className="text-xs text-muted-foreground">Avg. Progress</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <TeamEngagementBar team={team} />
            <TeamMembersTable team={team} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<ExtendedTeam[]>([]);

  useEffect(() => {
    const processedTeams = processTeamData(database as Database);
    setTeams(processedTeams);
  }, []);

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Team Leaderboard
        </h1>
        <p className="max-w-[700px] mx-auto text-lg text-muted-foreground">
          Collaboration is key. See how the teams are stacking up against each other.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map((team) => (
          <TeamCard key={team.rank} team={team} />
        ))}
      </section>
    </div>
  );
}
