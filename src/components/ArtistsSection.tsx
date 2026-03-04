import AnimatedSection from "@/components/AnimatedSection";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import artist4 from "@/assets/artist-4.jpg";
import artist5 from "@/assets/artist-5.jpg";
import artist6 from "@/assets/artist-6.jpg";

const artists = [
  {
    name: "Catherine Morales",
    src: artist1,
    location: "Santa Fe, NM",
    bio: "Known for her luminous landscapes and bold use of color, Catherine has exhibited in galleries across the Southwest for over 20 years.",
  },
  {
    name: "Henry Aldrich",
    src: artist2,
    location: "Burlington, VT",
    bio: "A master of atmospheric perspective, Henry captures the quiet poetry of rural America with a classical plein air approach.",
  },
  {
    name: "Lily Chen",
    src: artist3,
    location: "Portland, OR",
    bio: "Lily brings a fresh, contemporary eye to plein air painting, blending impressionist technique with modern composition.",
  },
  {
    name: "Marcus Webb",
    src: artist4,
    location: "Nashville, TN",
    bio: "Marcus's vibrant street scenes and architectural studies have earned him national recognition and multiple plein air awards.",
  },
  {
    name: "Eleanor Hastings",
    src: artist5,
    location: "Savannah, GA",
    bio: "Eleanor's serene waterscapes and garden scenes reflect decades of dedicated outdoor painting across the American South.",
  },
  {
    name: "Diego Ramirez",
    src: artist6,
    location: "Austin, TX",
    bio: "An emerging voice in the plein air world, Diego's energetic brushwork and bold palettes bring urban landscapes to life.",
  },
];

const ArtistsSection = () => {
  return (
    <section id="artists" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-16 text-center">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Meet the Painters
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground">
            Featured Artists
          </h2>
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist, i) => (
            <AnimatedSection key={artist.name} delay={i * 80}>
              <div className="group overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={artist.src}
                    alt={artist.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {artist.name}
                  </h3>
                  <p className="mb-3 font-body text-xs font-semibold uppercase tracking-widest text-primary">
                    {artist.location}
                  </p>
                  <p className="font-body text-sm leading-relaxed text-muted-foreground">
                    {artist.bio}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArtistsSection;
