
'use client';

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Award, Search, X } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress as UiProgress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Medal } from "@/components/icons/medal";
import database from '@/database.json';
import type { RawParticipant, Team, Participant, Database } from '@/lib/types';

// Helper function to process the database JSON
const processData = (db: Database): { participants: Participant[], teams: Team[] } => {
  const participantsList = Object.values(db).map(p => {
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

  // Separate ranked and unranked participants
  const rankedParticipants = participantsList.filter(p => typeof p.rank === 'number');
  const unrankedParticipants = participantsList.filter(p => typeof p.rank !== 'number');

  // Sort ranked participants by their rank
  rankedParticipants.sort((a, b) => (a.rank as number) - (b.rank as number));

  // Sort unranked participants by progress (descending), then name (ascending)
  unrankedParticipants.sort((a, b) => {
    if (b.progressPercentage !== a.progressPercentage) {
      return b.progressPercentage - a.progressPercentage;
    }
    return a.name.localeCompare(b.name);
  });

  const sortedParticipants = [...rankedParticipants, ...unrankedParticipants];

  // This part can be expanded later to populate teams data
  const teams: Team[] = [];

  return { participants: sortedParticipants, teams };
};

function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    const params = new URLSearchParams(searchParams.toString());
    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }
    // Use router.replace to avoid adding to history
    router.replace(`${pathname}?${params.toString()}`);
  }
  
  const clearSearch = () => {
    setQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    router.replace(`${pathname}?${params.toString()}`);
  }

  // Sync state with URL params on navigation
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);
  
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input 
        placeholder="Search participant..."
        className="pl-9"
        value={query}
        onChange={handleSearch}
      />
      {query && (
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}

export default function ProgressPage() {
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const [allParticipants, setAllParticipants] = useState<Participant[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const { participants: processedParticipants } = processData(database as Database);
    setAllParticipants(processedParticipants);
    setLastRefreshed(new Date());
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';
    if (searchQuery) {
        const filtered = allParticipants.filter(p => p.name.toLowerCase().includes(searchQuery));
        setFilteredParticipants(filtered);
    } else {
        setFilteredParticipants(allParticipants);
    }
  }, [searchParams, allParticipants]);

  const teamsMap = new Map<string, Team>();
  
  const getTeamInfo = (participantName: string) => {
    const participantData = allParticipants.find(p => p.name === participantName);
    const teamName = participantData?.teamName || 'N/A';
    // Dummy color until teams are fully implemented
    const teamColor = teamsMap.get(teamName)?.color || 'hsl(var(--foreground))';
    return { color: teamColor, name: teamName };
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
      <section className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Participant Leaderboard
        </h1>
        <p className="max-w-[700px] mx-auto text-lg text-muted-foreground">
          See where you stand among your peers. Keep pushing forward!
        </p>
      </section>

      <Alert className="mb-8 bg-blue-900/20 border-blue-500/30 text-blue-200">
        <AlertTitle className="text-blue-100">Heads Up, Jammers!</AlertTitle>
        <AlertDescription>
          Only the top 100 participants with 100% completion will receive exclusive swag kits. Keep up the great work!
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
         <SearchBar />
        <span className="text-sm text-muted-foreground">
          Last updated: {lastRefreshed ? lastRefreshed.toLocaleString() : 'Loading...'}
        </span>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-center">Rank</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">Completions</TableHead>
              <TableHead className="w-[200px]">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParticipants.map((p, idx) => {
              const teamInfo = getTeamInfo(p.name);
              const isRanked = typeof p.rank === 'number';
              const rankDisplay = isRanked ? p.rank : "-";

              return (
                <TableRow
                  key={p.name + idx}
                  className="relative"
                >
                   <TableCell className="font-medium text-lg text-center">
                    {isRanked && (p.rank as number) <= 3 ? (
                      <Medal rank={p.rank as 1 | 2 | 3} className="mx-auto" />
                    ) : (
                      rankDisplay
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={p.profileUrl} target="_blank" className="hover:underline font-medium">
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
                  <TableCell>
                    <span style={{ color: teamInfo.color }} className="font-medium">{teamInfo.name}</span>
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
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
