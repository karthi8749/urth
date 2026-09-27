export const journeyIntro = {
  title: "Let us get started with your journey",
  lead: "Let’s make something real.",
  body: ``,
  prompt: "Where are you in the process?",
} as const;

export type JourneyStep = {
  step: number;
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

export const journeySteps: JourneyStep[] = [
  {
    step: 0,
    title: "Start Here",
    body: `A first conversation about the project.
No presentation. No polished brief required. Tell us what you have, what you need and what is currently keeping you awake.
We will see whether we are the right fit.`,
    cta: { label: "Say hello", href: "/contact" },
  },
  {
    step: 1,
    title: "The Real Brief",
    body: `Before we draw, we ask questions.
Who is the space for? How will it be used? What matters? What does not? What is the budget—and what is the actual budget?
We turn the answers, contradictions and wish lists into a clear brief.`,
  },
  {
    step: 2,
    title: "Read the Ground",
    body: `Every project already comes with conditions.
The site, the existing structure, the climate, the rules, the light, the neighbours and occasionally something nobody mentioned earlier.
We study what is there before deciding what should be added.`,
  },
  {
    step: 3,
    title: "Ideas. Plural.",
    body: `We sketch, test and question different ways the project could work.
Plans move. Walls disappear. Some ideas get better. Some deservedly die.
You will see real options—not one idea dressed up as three.`,
  },
  {
    step: 4,
    title: "Make It Yours",
    body: `Once a direction feels right, we develop it.
Architecture and interiors begin speaking the same language. Spaces, materials, light, storage, furniture and details are considered together.
Not a look placed over a plan. One complete idea.`,
  },
  {
    step: 5,
    title: "Make It Buildable",
    body: `The exciting idea now needs measurements, drawings, details, coordination and many decisions that nobody will notice when they are done properly.
We work with consultants, suppliers and contractors to turn the design into something that can actually be built.`,
  },
  {
    step: 6,
    title: "Dust. Noise. Progress.",
    body: `Construction begins.
We visit the site, answer questions, review the work and deal with the unexpected—because drawings are tidy and building sites are not.
The aim is simple: protect the idea without losing touch with reality.`,
  },
  {
    step: 7,
    title: "Live In It",
    body: `We review the finished space, resolve the final details and hand it over.
Then the building gets to do what it was designed for.
It gets used, moved through, changed, enjoyed and occasionally made messy.
That is the point.`,
  },
];
