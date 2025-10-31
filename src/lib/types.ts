



export interface Database {
  [key: string]: RawParticipant;
}

export interface RawParticipant {
  fullName: string;
  gender: string;
  teamName: string;
  profileUrl: string;
  progress: {
    Rank: number | string;
    AccessCodeRedeemed: string;
    AllBadgesCompleted: string;
    SkillBadgesCount: number;
    SkillBadgesNames: string[] | string;
    ArcadeGamesCount: number;
    ArcadeGamesNames: string[] | string;
    LastDPRUpdate: string;
  };
}

export type Participant = {
  rank: number | string;
  name: string;
  progressPercentage: number;
  badgesCompleted: number;
  isSwagEligible: boolean;
  profileUrl: string;
  teamName: string;
};

export type Team = {
  rank: number;
  name: string;
  color: string;
  mentor: {
    name: string;
    avatar: string;
  };
  members: Participant[];
  progressPercentage: number;
  completionCount: number;
};

export type Course = {
  id: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  csbLink: string;
  solutionUrl?: string;
};

export type Organizer = {
  name: string;
  role: string;
  avatar: string;
  links: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  }
}
