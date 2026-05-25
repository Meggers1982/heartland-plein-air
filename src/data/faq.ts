export type FaqItem = { q: string; a: string[] };
export type FaqCategory = { id: string; title: string; items: FaqItem[] };

export const categories: FaqCategory[] = [
  {
    id: "general",
    title: "General",
    items: [
      {
        q: "What is plein air painting?",
        a: [
          'Plein air is a French term meaning "open air," and the practice is exactly what it sounds like: artists painting outside, directly from life, rather than working from photos or references back in a studio. The goal is to capture a place as it actually exists in a given moment — the quality of the light, the atmosphere, the movement, the feeling of being there.',
          "The tradition goes back to the 19th century and was central to the Impressionist movement. Artists like Monet and Renoir built their careers on it. Working outdoors means working quickly — a plein air piece is often completed within an hour or two before the light shifts — so the paintings tend to have an energy and immediacy that studio work can't quite replicate. Every painting is a one-of-a-kind record of a specific place at a specific moment in time.",
        ],
      },
      {
        q: "Where will the artists be painting?",
        a: [
          "Artists will paint freely across the Omaha Metro throughout the festival week, choosing their own locations each day. That said, there are several scheduled events where you're guaranteed to find artists in action. Lunchtime Quick Paint competitions take place in Benson (62nd and Maple) on September 14, Dundee (50th and Underwood) on September 15, and the Cathedral & Castle district (along 40th Street between Cuming and Davenport) on September 16. On September 17, an evening Quick Paint will be held in Ralston at Main and 77th Street.",
          "Beyond those events, artists may paint anywhere that inspires them. Suggested locations include Lauritzen Gardens, the Old Market, the Riverfront, Memorial Park, Fort Omaha, Neale Woods, the Bob Kerrey Pedestrian Bridge, Elmwood Park Grotto, Fontenelle Forest, Schramm State Park, Chalco Hills, Boystown, and Ralston's Oak Park.",
        ],
      },
      {
        q: "Can I watch the artists paint?",
        a: [
          "The public is welcome to observe artists at work throughout the entire festival week, at any location across the metro. If you want a guaranteed front-row seat, the lunchtime and evening Quick Paint competitions are your best bet — all participating artists converge on a single location, painting simultaneously against the clock. It's one of the most exciting things to witness at any plein air festival.",
        ],
      },
      {
        q: "Is there an admission fee?",
        a: [
          "Watching artists paint throughout the week at outdoor locations across the metro is completely free, as is the Public Exhibition on September 19. The Collector's Soiree on September 18 is a ticketed event — check back here for updates on pricing and ticket availability.",
        ],
      },
    ],
  },
  {
    id: "artists-events",
    title: "Artists & Events",
    items: [
      {
        q: "How many artists participate in the festival?",
        a: [
          "The inaugural Heartland Plein Air Festival brings together 25 nationally acclaimed invited artists representing 20 states. The festival also includes an Open Division for artists who apply through the website, so the total number of participating artists will be larger.",
        ],
      },
      {
        q: "Are the artists juried or selected through an application process?",
        a: [
          "The festival runs two separate tracks. The 24 featured artists were personally invited by the festival organizers — they're nationally recognized painters selected for the Invitational Division. A separate Open Division is available to additional artists through an application process. Check back to find application details closer to the event.",
        ],
      },
      {
        q: "What mediums do the artists use?",
        a: [
          "Plein air artists work in a range of mediums, and the Heartland Plein Air Festival doesn't restrict artists to a single one. Oil paint is the classic choice — it's what Monet and Renoir used, and it's still the most popular medium for capturing the nuances of light and atmosphere outdoors.",
          "Watercolor is another longtime favorite, valued for its portability and the spontaneous quality it brings to outdoor work. Pastel is widely used for its speed and brilliant, unmixed color. Acrylic is a more recent addition, drying quickly and working well in a range of conditions. Expect to see a mix across the festival's participating artists.",
        ],
      },
      {
        q: "How long do artists have to complete their paintings?",
        a: [
          "Specific time limits for the Quick Paint competitions will be published on HeartlandPleinAir.org ahead of the festival. In general plein air practice, a single painting is typically completed within one to two hours — that's part of what makes the medium so distinctive. The light changes, the moment passes, and the painting captures what was there.",
        ],
      },
      {
        q: "Are the paintings created during the festival?",
        a: [
          "Every painting exhibited and sold at Heartland Plein Air will be created on-site during the festival week, September 13–19, 2026. Artists paint directly from life at locations across the Omaha Metro — nothing is brought from home or finished in a studio beforehand.",
        ],
      },
      {
        q: "Will there be artist demonstrations or workshops?",
        a: [
          "Education and artist demonstrations are woven into the entire festival week. Before the festival officially opens, a Pre-Festival Youth Paint Out runs September 12 at Wildwood Park (10 AM–2 PM), followed by a youth exhibition that evening at the Baright Library (5–7 PM).",
          "On September 16, Youth-Professional Artist Mentor Sessions pair young artists with the festival's invited professionals (4–5:30 PM). On September 17, the festival's Judge of Awards, Rick J. Delanty, will give a public Artist Lecture at the Baright Library (5555 S. 77th Street, Ralston) from 5–6 PM. Throughout the week, invited artists also provide educational workshops for local students and foster children.",
        ],
      },
      {
        q: "Are there awards or competitions during the festival?",
        a: [
          "The festival offers over $10,000 in awards, with Quick Paint competitions running throughout the week. Lunchtime competitions take place in Benson (September 14), Dundee (September 15), and the Cathedral & Castle district (September 16), with an evening Quick Paint in Ralston on September 17.",
          "The awards ceremony is held at the Collector's Soiree on September 18. All judging is handled by Rick J. Delanty — a nationally recognized painter holding memberships in AIS, OPA, LPAPA, and ASMA, and recognized as an ARC Salon Living Master.",
        ],
      },
      {
        q: "Can children or beginner artists participate?",
        a: [
          "Young artists are genuinely central to this festival, not an afterthought. A Pre-Festival Youth Paint Out takes place September 12 at Wildwood Park, with a youth exhibition that same evening at the Baright Library. Youth-Professional Artist Mentor Sessions on September 16 connect young painters directly with the festival's invited professionals.",
          "The festival also coordinates programming specifically for foster children. For adult artists at any skill level, the Open Division offers a path to compete alongside nationally invited painters.",
        ],
      },
    ],
  },
  {
    id: "visitors",
    title: "For Visitors",
    items: [
      {
        q: "What are the best locations to see artists painting?",
        a: [
          "The Quick Paint competitions are the most reliable option — all participating artists gather at a single location at the same time, so you get to watch many painters working simultaneously. Those take place at lunchtime in Benson on September 14, Dundee on September 15, and the Cathedral & Castle district on September 16, and in the evening in Ralston on September 17.",
          "Outside of those events, artists paint freely across the metro, so sightings are more spontaneous. A map of suggested painting locations will be available on HeartlandPleinAir.org to help you plan.",
        ],
      },
      {
        q: "What days and times is the festival open?",
        a: [
          "The festival runs September 13–19, 2026, with a pre-festival youth day on September 12. Key public events include:",
          "September 12 — Youth Paint Out at Wildwood Park (10 AM–2 PM) and Youth Exhibition at Baright Library (5–7 PM). September 14–16 — Lunchtime Quick Paint competitions in Benson, Dundee, and Cathedral & Castle. September 16 — Youth-Professional Mentor Sessions (4–5:30 PM).",
          "September 17 — Artist Lecture by Judge Rick J. Delanty at Baright Library (5–6 PM); Evening Quick Paint in Ralston (6–8 PM). September 18 — Collector's Soiree at the Granary, Ralston (5–8 PM, ticketed). September 19 — Public Exhibition at the Granary, Ralston (1–4 PM, free). September 19–October 2 — Online art sale at HeartlandPleinAir.org and RalstonArts.org.",
        ],
      },
      {
        q: "Is the festival family-friendly?",
        a: [
          "The Heartland Plein Air Festival is designed with all ages in mind. Youth programming runs throughout the entire week — including paint-outs, a youth art exhibition, and mentorship sessions pairing young artists with festival professionals. The Public Exhibition is free, and watching artists paint at outdoor locations across the metro is a casual, come-and-go experience that works well for families.",
        ],
      },
      {
        q: "Will food or drinks be available?",
        a: [
          "The Collector's Soiree on September 18 includes catering and entertainment as part of the ticketed event at the Granary. Food and drink availability at the Quick Paint locations and the Public Exhibition is not specified in current festival materials — check HeartlandPleinAir.org for updates closer to the event.",
        ],
      },
      {
        q: "Is there a map of artist painting locations?",
        a: [
          "A map of Quick Paint competition sites and suggested painting locations across the metro is in development and will be available on the Schedule page.",
        ],
      },
    ],
  },
  {
    id: "purchasing",
    title: "Buying the Art",
    items: [
      {
        q: "How can I purchase a painting?",
        a: [
          "Paintings are available for purchase at two events: the Collector's Soiree on September 18 (5–8 PM at the Granary, 7401 Main Street, Ralston) and the Public Exhibition on September 19 (1–4 PM, also at the Granary). The Soiree is ticketed; the Public Exhibition is free.",
          "For anyone unable to attend in person, an online sale of remaining artworks runs from September 19 through October 2 at HeartlandPleinAir.org and RalstonArts.org.",
        ],
      },
      {
        q: "How much do the paintings typically cost?",
        a: [
          "Pricing is set by each individual artist and won't be published in advance. Across the broader plein air market, works tend to range from a few hundred dollars on the lower end to several thousand for more established artists.",
          "The Heartland Plein Air Festival features nationally acclaimed painters, so expect a range of price points across both the Collector's Soiree and the Public Exhibition. Plein air paintings are generally considered more accessible than comparable gallery work, which is part of what makes festival exhibitions such a good opportunity for collectors at any level.",
        ],
      },
      {
        q: "Can I purchase artwork before the final exhibition?",
        a: [
          "The Collector's Soiree on September 18 — the evening before the Public Exhibition — is the earliest opportunity to purchase artwork. Whether works are available for sale at any point earlier in the week is not specified in current festival materials.",
        ],
      },
    ],
  },
  {
    id: "community",
    title: "Community & Sponsorship",
    items: [
      {
        q: "How can local businesses support the festival?",
        a: [
          "Sponsorship opportunities are available for businesses that want to be part of the inaugural Heartland Plein Air Festival. Current partners include the Benson Creative District, Historic Dundee Creative District, Castle & Cathedral Creative District, Visit Nebraska, the Wiebe Ralston Foundation, Nebraska Arts Council, and the Nebraska Cultural Endowment.",
          "For information on sponsorship levels and benefits, contact the Ralston HINGE Creative District directly.",
        ],
      },
      {
        q: "Are volunteer opportunities available?",
        a: [
          "Volunteers are being recruited to support the festival across a range of roles. Specific sign-up details aren't yet published — check HeartlandPleinAir.org or reach out to the festival organizers directly for the latest information.",
        ],
      },
      {
        q: "How can I become a festival sponsor?",
        a: [
          "Sponsorship inquiries can be directed through HeartlandPleinAir.org. For a direct conversation, contact City Administrator Jack Cheloha at 402.331.6677 or jcheloha@cityofralston.com.",
        ],
      },
      {
        q: "Does the festival partner with local nonprofits or schools?",
        a: [
          "Community partnerships are a core part of how the Heartland Plein Air Festival operates. Invited artists provide educational workshops for local students and foster children throughout the week, and the festival's youth programming is built in collaboration with area schools and youth organizations.",
          "The organizing body — the Ralston HINGE Creative District — is itself a 501(c)(3) nonprofit, and the event is co-presented with multiple Omaha Metro creative districts, including Benson, Dundee, and Castle & Cathedral.",
        ],
      },
      {
        q: "How does the festival support the local arts community?",
        a: [
          "The Heartland Plein Air Festival was established specifically to use the arts as an economic driver for the Ralston and Omaha Metro region. Supported in part by a Nebraska Arts Council Creative District Development Grant, the festival is designed to attract visitors, generate economic activity, and put Ralston on the national map as an arts destination.",
          "During the week, 24 nationally recognized artists bring collector interest and visibility to the region. Youth programming creates direct mentorship opportunities for local students and foster children. And because this is intended as an annual event, the cultural and economic impact is designed to grow year over year.",
        ],
      },
    ],
  },
];
