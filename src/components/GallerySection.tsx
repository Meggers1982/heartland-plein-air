'use client';
import { useInView } from "@/hooks/useInView";

const paintings = [
  { src: "/assets/gallery-1.jpg", title: "Main Street, Golden Hour", artist: "Sample Artist" },
  { src: "/assets/gallery-2.jpg", title: "River Bend Reflections", artist: "Sample Artist" },
  { src: "/assets/gallery-3.jpg", title: "Heartland Harvest", artist: "Sample Artist" },
  { src: "/assets/gallery-4.jpg", title: "Stone Bridge in Autumn", artist: "Sample Artist" },
  { src: "/assets/gallery-5.jpg", title: "Café on the Square", artist: "Sample Artist" },
  { src: "/assets/gallery-6.jpg", title: "Victorian Morning", artist: "Sample Artist" },
];

const GallerySection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="gallery" className="py-24">
      <div ref={ref} className="mx-auto max-w-6xl px-6">
        <div className={`mb-16 text-center transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            From the Easel
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground">
            Painting Gallery
          </h2>
        </div>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {paintings.map((p, i) => (
            <div
              key={p.title}
              className={`group mb-5 break-inside-avoid overflow-hidden rounded-lg transition-all duration-700 ${isInView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
              style={{ transitionDelay: isInView ? `${i * 100}ms` : "0ms" }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.src}
                  alt={p.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-foreground/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="font-display text-lg font-semibold text-background">
                    {p.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
