
export type Course = {
  id: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  csbLink: string;
  solutionUrl?: string;
};

export const courses: Course[] = [
  { id: 1, title: "The Basics of Google Cloud Compute", csbLink: "https://www.cloudskillsboost.google/course_templates/754", difficulty: 'Beginner', progress: 0, solutionUrl: undefined },
  { id: 2, title: "Get Started with Cloud Storage", csbLink: "https://www.cloudskillsboost.google/course_templates/725", difficulty: 'Beginner', progress: 0, solutionUrl: undefined },
  { id: 3, title: "Get Started with Pub/Sub", csbLink: "https://www.cloudskillsboost.google/course_templates/728", difficulty: 'Beginner', progress: 0, solutionUrl: undefined },
  { id: 4, title: "Get Started with API Gateway", csbLink: "https://www.cloudskillsboost.google/course_templates/662", difficulty: 'Beginner', progress: 0, solutionUrl: undefined },
  { id: 5, title: "Get Started with Looker", csbLink: "https://www.cloudskillsboost.google/course_templates/647", difficulty: 'Beginner', progress: 0, solutionUrl: undefined },
  { id: 6, title: "Get Started with Dataplex", csbLink: "https://www.cloudskillsboost.google/course_templates/726", difficulty: 'Beginner', progress: 0, solutionUrl: undefined },
  { id: 7, title: "Get Started with Google Workspace Tools", csbLink: "https://www.cloudskillsboost.google/course_templates/676", difficulty: 'Beginner', progress: 0, solutionUrl: undefined },
  { id: 8, title: "App Building with Appsheet", csbLink: "https://www.cloudskillsboost.google/course_templates/635", difficulty: 'Intermediate', progress: 0, solutionUrl: undefined },
  { id: 9, title: "Develop with Apps Script and AppSheet", csbLink: "https://www.cloudskillsboost.google/course_templates/715", difficulty: 'Intermediate', progress: 0, solutionUrl: undefined },
  { id: 10, title: "Build a Website on Google Cloud", csbLink: "https://www.cloudskillsboost.google/course_templates/638", difficulty: 'Intermediate', progress: 0, solutionUrl: undefined },
  { id: 11, title: "Set Up a Google Cloud Network", csbLink: "https://www.cloudskillsboost.google/course_templates/641", difficulty: 'Intermediate', progress: 0, solutionUrl: undefined },
  { id: 12, title: "Store, Process, and Manage Data on Google Cloud - Console", csbLink: "https://www.cloudskillsboost.google/course_templates/658", difficulty: 'Intermediate', progress: 0, solutionUrl: undefined },
  { id: 13, title: "Cloud Functions: 3 Ways", csbLink: "https://www.cloudskillsboost.google/course_templates/696", difficulty: 'Intermediate', progress: 0, solutionUrl: undefined },
  { id: 14, title: "App Engine: 3 Ways", csbLink: "https://www.cloudskillsboost.google/course_templates/671", difficulty: 'Advanced', progress: 0, solutionUrl: undefined },
  { id: 15, title: "Cloud Speech API: 3 Ways", csbLink: "https://www.cloudskillsboost.google/course_templates/700", difficulty: 'Advanced', progress: 0, solutionUrl: undefined },
  { id: 16, title: "Monitoring in Google Cloud", csbLink: "https://www.cloudskillsboost.google/course_templates/747", difficulty: 'Advanced', progress: 0, solutionUrl: undefined },
  { id: 17, title: "Analyze Speech and Language with Google APIs", csbLink: "https://www.cloudskillsboost.google/course_templates/634", difficulty: 'Advanced', progress: 0, solutionUrl: undefined },
  { id: 18, title: "Prompt Design in Vertex AI", csbLink: "https://www.cloudskillsboost.google/course_templates/976", difficulty: 'Advanced', progress: 0, solutionUrl: undefined },
  { id: 19, title: "Develop GenAI Apps with Gemini and Streamlit", csbLink: "https://www.cloudskillsboost.google/course_templates/978", difficulty: 'Advanced', progress: 0, solutionUrl: undefined },
  { id: 20, title: "Gen AI Arcade Game: Level 3", csbLink: "#", difficulty: 'Advanced', progress: 0, solutionUrl: undefined },
];


export type Participant = {
  rank: number;
  name: string;
  progressPercentage: number;
  badgesCompleted: number;
  isSwagEligible: boolean;
  profileUrl: string;
};

export const participants: Participant[] = Array.from({ length: 150 }, (_, i) => {
    const progressPercentage = 100 - i * 0.5; // Deterministic progress
    const cappedProgress = Math.min(progressPercentage, 100);
    const badgesCompleted = Math.floor((cappedProgress / 100) * 20);
    return {
        rank: i + 1,
        name: `Participant ${String(i + 1).padStart(3, '0')}`,
        progressPercentage: cappedProgress,
        badgesCompleted,
        isSwagEligible: cappedProgress === 100 && (i + 1) <= 100,
        profileUrl: `https://www.cloudskillsboost.google/public_profiles/user${i + 1}`
    }
}).sort((a, b) => b.progressPercentage - a.progressPercentage || a.rank - b.rank)
 .map((p, i) => ({ ...p, rank: i + 1 }));

export type Team = {
  rank: number;
  name: string;
  color: string;
  mentor: {
    name: string;
    avatar: string;
  };
  members: string[];
  progressPercentage: number;
};

const teamNames = [
  'Cloud Crusaders', 'Data Dynamos', 'AI Avengers', 'Quantum Questers', 
  'Serverless Samurai', 'API Architects', 'Stream Sorcerers', 
  'Infra Innovators', 'ML Mavericks', 'Security Sentinels'
];
const teamColors = [
  'hsl(var(--google-blue))', 'hsl(var(--google-red))', 'hsl(var(--google-yellow))', 'hsl(var(--google-green))',
  'hsl(var(--chart-5))', 'hsl(260 85% 65%)', 'hsl(310 80% 60%)', 
  'hsl(190 75% 55%)', 'hsl(30 90% 58%)', 'hsl(0 0% 63%)'
];

const assignMembersToTeams = (participants: Participant[], teamCount: number): string[][] => {
    // Deterministic assignment
    const teams: string[][] = Array.from({ length: teamCount }, () => []);
    participants.forEach((p, i) => {
        teams[i % teamCount].push(p.name);
    });
    return teams;
}

const teamMembers = assignMembersToTeams(participants, 10);


export const teams: Team[] = Array.from({ length: 10 }, (_, i) => {
    const members = teamMembers[i];
    const teamProgress = Math.round(
      members.map(m => participants.find(p => p.name === m)!.progressPercentage)
             .reduce((sum, p) => sum + p, 0) / members.length
    );
    
    return {
        rank: i + 1,
        name: teamNames[i],
        color: teamColors[i],
        mentor: { name: `Mentor ${String.fromCharCode(65 + i)}`, avatar: `mentor-${i + 1}` },
        members: members,
        progressPercentage: teamProgress,
    };
}).sort((a,b) => b.progressPercentage - a.progressPercentage).map((t, i) => ({ ...t, rank: i + 1}));


export const overallProgressData = [
  { date: 'Week 1', 'Completion Rate': 15 },
  { date: 'Week 2', 'Completion Rate': 40 },
  { date: 'Week 3', 'Completion Rate': 75 },
  { date: 'Week 4', 'Completion Rate': 88 },
];

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

export const organizers: Organizer[] = [
    { name: 'Alex Doe', role: 'GDG Organizer', avatar: 'organizer-1', links: { twitter: '#', linkedin: '#', github: '#' } },
    { name: 'Jane Smith', role: 'Core Team Member', avatar: 'organizer-2', links: { twitter: '#', linkedin: '#' } },
    { name: 'Sam Wilson', role: 'Core Team Member', avatar: 'organizer-3', links: { github: '#' } },
    { name: 'Maria Garcia', role: 'Core Team Member', avatar: 'organizer-4', links: { linkedin: '#' } },
    { name: 'David Lee', role: 'Core Team Member', avatar: 'organizer-5', links: { twitter: '#', github: '#' } },
    { name: 'Emily White', role: 'Core Team Member', avatar: 'organizer-6', links: { linkedin: '#' } },
    { name: 'Chris Green', role: 'Core Team Member', avatar: 'organizer-7', links: { twitter: '#', linkedin: '#', github: '#' } },
    { name: 'Sarah Brown', role: 'Core Team Member', avatar: 'organizer-8', links: { github: '#' } },
    { name: 'Michael Clark', role: 'Core Team Member', avatar: 'organizer-9', links: { linkedin: '#', github: '#' } },
    { name: 'Jessica Taylor', role: 'Core Team Member', avatar: 'organizer-10', links: { twitter: '#' } },
    { name: 'Daniel Martinez', role: 'Core Team Member', avatar: 'organizer-11', links: { github: '#' } },
    { name: 'Laura Rodriguez', role: 'Core Team Member', avatar: 'organizer-12', links: { linkedin: '#' } },
    { name: 'Kevin Hernandez', role: 'Core Team Member', avatar: 'organizer-13', links: { twitter: '#', linkedin: '#' } },
    { name: 'Nancy Gonzalez', role: 'Core Team Member', avatar: 'organizer-14', links: { github: '#' } },
    { name: 'Paul Perez', role: 'Core Team Member', avatar: 'organizer-15', links: { twitter: '#', github: '#' } },
];
