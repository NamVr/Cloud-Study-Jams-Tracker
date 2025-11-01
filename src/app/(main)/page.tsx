
"use client";

import { useState, useEffect } from "react";
import { Users, Award, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Countdown } from "@/components/shared/countdown";
import { Progress } from "@/components/ui/progress";
import database from '@/database.json';
import { teams as mockTeamsData } from "@/lib/mock-data";
import type { Database, RawParticipant, Participant as ProcessedParticipant, Team } from '@/lib/types';


// --- Data Processing ---
interface HomePageData {
  totalParticipants: number;
  avgBadges: number;
  globalCompletion: number;
  recentTopPerformer: ProcessedParticipant | null;
  topTeam: Team | null;
  swagEligibleCount: number;
}

const processHomePageData = (db: Database): HomePageData => {
  const participantsList = Object.values(db);
  const totalParticipants = participantsList.length;

  if (totalParticipants === 0) {
    return {
      totalParticipants: 0,
      avgBadges: 0,
      globalCompletion: 0,
      recentTopPerformer: null,
      topTeam: null,
      swagEligibleCount: 0,
    };
  }

  let swagEligibleCount = 0;

  const processedParticipants: ProcessedParticipant[] = participantsList.map(p => {
    const totalCompletions = p.progress.SkillBadgesCount + p.progress.ArcadeGamesCount;
    const progressPercentage = Math.min(Math.round((totalCompletions / 20) * 100), 100);
    const rank = p.progress.Rank;
    const isSwagEligible = progressPercentage === 100 && typeof rank === 'number' && rank <= 100;
    if (isSwagEligible) {
        swagEligibleCount++;
    }
    
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

  // --- Sort Participants for Top Performer ---
  const rankedParticipants = processedParticipants.filter(p => typeof p.rank === 'number');
  const unrankedParticipants = processedParticipants.filter(p => typeof p.rank !== 'number');
  rankedParticipants.sort((a, b) => (a.rank as number) - (b.rank as number));
  unrankedParticipants.sort((a, b) => {
    if (b.progressPercentage !== a.progressPercentage) return b.progressPercentage - a.progressPercentage;
    return a.name.localeCompare(b.name);
  });
  const sortedParticipants = [...rankedParticipants, ...unrankedParticipants];

  // --- Find Recent Top Performer (last person to get 100%) ---
  const completers = processedParticipants.filter(p => p.progressPercentage === 100 && typeof p.rank === 'number');
  completers.sort((a, b) => (b.rank as number) - (a.rank as number));
  const recentTopPerformer = completers.length > 0 ? completers[0] : null;


  // --- Calculate metrics based on Top 100 ---
  const top100Participants = sortedParticipants.slice(0, 100);
  const top100TotalBadges = top100Participants.reduce((sum, p) => sum + p.badgesCompleted, 0);
  const top100TotalProgressSum = top100Participants.reduce((sum, p) => sum + p.progressPercentage, 0);
  
  const avgBadges = top100Participants.length > 0 ? parseFloat((top100TotalBadges / top100Participants.length).toFixed(1)) : 0;
  const globalCompletion = top100Participants.length > 0 ? Math.round(top100TotalProgressSum / top100Participants.length) : 0;


  // --- Process Teams for Top Team ---
  const teamsMap = new Map<string, RawParticipant[]>();
  participantsList.forEach(p => {
    if (p.teamName && p.teamName !== 'N/A') {
      if (!teamsMap.has(p.teamName)) teamsMap.set(p.teamName, []);
      teamsMap.get(p.teamName)!.push(p);
    }
  });

  const teams: Team[] = Array.from(teamsMap.entries()).map(([name, members]) => {
    const processedMembers: ProcessedParticipant[] = members.map(p => {
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
    
    const mockTeam = mockTeamsData.find(t => t.name === name);

    return {
      name,
      color: mockTeam?.color || 'hsl(var(--foreground))',
      mentor: mockTeam?.mentor || { name: 'Unknown Mentor', avatar: '' },
      members: processedMembers,
      progressPercentage: teamProgressPercentage,
      completionCount: processedMembers.filter(p => p.progressPercentage === 100).length,
    } as Team;
  });

  const sortedTeams = teams
    .sort((a, b) => b.progressPercentage - a.progressPercentage)
    .map((team, i) => ({ ...team, rank: i + 1 }));

  return {
    totalParticipants,
    avgBadges,
    globalCompletion,
    recentTopPerformer,
    topTeam: sortedTeams.length > 0 ? sortedTeams[0] : null,
    swagEligibleCount,
  };
};

export default function LandingPage() {
  const [jamEndDate] = useState(new Date("2025-11-11T23:59:59"));
  const [pageData, setPageData] = useState<HomePageData | null>(null);

  useEffect(() => {
    const data = processHomePageData(database as Database);
    setPageData(data);
  }, []);
  
  const topTeam = pageData?.topTeam;
  const recentTopPerformer = pageData?.recentTopPerformer;

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Google Cloud Study Jams
        </h1>
        <p className="max-w-[800px] mx-auto text-lg text-muted-foreground">
          Google Developer Groups on Campus - Chandigarh University (Live Progress)
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-12 md:mb-16">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageData?.totalParticipants ?? '...'}</div>
            <p className="text-xs text-muted-foreground">Jammers on the board</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Badges/Person (Top 100)</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pageData?.avgBadges ?? '...'}</div>
            <p className="text-xs text-muted-foreground">Average badges earned</p>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jam Ends In</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Countdown targetDate={jamEndDate} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Global Completion Rate (Top 100)</CardTitle>
                 <CardDescription>Average progress across top 100 participants.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <Progress value={pageData?.globalCompletion} className="h-3" />
                    <span className="text-lg font-bold text-primary">{pageData?.globalCompletion ?? 0}%</span>
                </div>
            </CardContent>
        </Card>
         <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Swag Eligibility Progress</CardTitle>
                <CardDescription>Only the first 100 participants with 100% completion get swags!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <Progress value={(pageData?.swagEligibleCount ?? 0)} max={100} className="h-3" />
                    <span className="text-lg font-bold text-primary">{pageData?.swagEligibleCount ?? 0}/100</span>
                </div>
            </CardContent>
        </Card>
      </section>

       <section className="mb-12 md:mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Leaderboard Highlights</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="flex flex-col items-center justify-center p-6">
            <CardTitle className="mb-4">Recent Top Performer</CardTitle>
            {recentTopPerformer ? (
              <>
                <div className="text-xl font-bold mb-2">{recentTopPerformer.name}</div>
                <div className="text-center">
                    <span className="text-2xl font-bold text-primary">{recentTopPerformer.progressPercentage}%</span>
                    <p className="text-xs text-muted-foreground">Overall Progress</p>
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">Loading...</div>
            )}
          </Card>
           <Card className="flex flex-col items-center justify-center p-6">
            <CardTitle className="mb-4">Top Performing Team</CardTitle>
            {topTeam ? (
                <>
                    <div className="text-xl font-bold mb-2" style={{color: topTeam.color}}>{topTeam.name}</div>
                     <div className="text-center">
                        <span className="text-2xl font-bold text-primary">{topTeam.progressPercentage}%</span>
                        <p className="text-xs text-muted-foreground">Avg. Team Progress</p>
                    </div>
                </>
            ) : (
                <div className="text-sm text-muted-foreground">Loading...</div>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}

    