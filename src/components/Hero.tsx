
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type HeroProps = {
  title: string;
  description: string;
  backgroundImage: string;
  buttonText: string;
  buttonLink: string;
  type?: string;
};

export const Hero = ({
  title,
  description,
  backgroundImage,
  buttonText,
  buttonLink,
  type = "films"
}: HeroProps) => {
  return (
    <div 
      className="relative w-full h-[70vh] md:h-[80vh] bg-cover bg-center flex items-end"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-stream-dark via-stream-dark/80 to-transparent" />
      <div className="relative z-10 content-container text-white pb-16 md:pb-24 max-w-3xl">
        <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-white uppercase bg-stream-purple/80 rounded-md">
          {type === "films" && "Film"}
          {type === "series" && "Série"}
          {type === "music" && "Musique"}
          {type === "tv" && "Émission TV"}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-gray-300 mb-6">{description}</p>
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg" className="bg-stream-purple hover:bg-stream-purple/90">
            <Link to={buttonLink}>{buttonText}</Link>
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 hover:bg-white/10">
            Plus d'info
          </Button>
        </div>
      </div>
    </div>
  );
};
