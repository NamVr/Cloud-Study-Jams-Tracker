import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { organizers, type Organizer } from "@/lib/mock-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

function ProfileCard({ organizer }: { organizer: Organizer }) {
    const profileImage = PlaceHolderImages.find(img => img.id === organizer.avatar);

  return (
    <Card className="text-center">
      <CardContent className="p-6">
        {profileImage &&
          <Image
            src={profileImage.imageUrl}
            alt={`Profile of ${organizer.name}`}
            width={120}
            height={120}
            className="rounded-full mx-auto mb-4 border-4 border-primary/20"
            data-ai-hint={profileImage.imageHint}
          />
        }
        <h3 className="text-lg font-bold">{organizer.name}</h3>
        <p className="text-sm text-primary">{organizer.role}</p>
        <div className="flex justify-center gap-2 mt-4">
          {organizer.links.twitter && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={organizer.links.twitter} aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {organizer.links.linkedin && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={organizer.links.linkedin} aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {organizer.links.github && (
            <Button variant="ghost" size="icon" asChild>
              <Link href={organizer.links.github} aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AboutPage() {
  const gdgOrganizer = organizers.find(o => o.role === 'GDG Organizer');
  const coreTeam = organizers.filter(o => o.role === 'Core Team Member');

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 md:px-6">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          About the Jam
        </h1>
        <p className="max-w-[700px] mx-auto text-lg text-muted-foreground">
          Learn more about the event, the community, and the team making it all happen.
        </p>
      </section>

      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            Meet the Organizing Team
          </h2>
          <p className="text-muted-foreground">
            The passionate individuals working behind the scenes to make this program a success.
          </p>
        </div>

        {gdgOrganizer && (
           <section className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-6">GDG Organizer</h3>
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <ProfileCard organizer={gdgOrganizer} />
              </div>
            </div>
          </section>
        )}

        <section>
          <h3 className="text-2xl font-bold text-center mb-6">Core Team Members</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {coreTeam.map((organizer) => (
              <ProfileCard key={organizer.name} organizer={organizer} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
