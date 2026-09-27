export type Project = {
  slug: string;
  title: string;
  location?: string;
  summary: string;
  body: string[];
  designFocus: string;
  materialPalette: string;
  keySpaces?: string;
  keyFeatures?: string;
  vision: string;
  accent: "orange" | "blue" | "cream";
  featuredImage?: string;
};

export const projects: Project[] = [
  {
    slug: "bakery-cafe",
    title: "Bakery Project",
    featuredImage: "/project-images/BAKERY PROJECT/1.png",
    location: "Dubai",
    summary: "",
    body: [
      "This project was envisioned as more than a bakery and coffee shop. The client wanted to create an inclusive, dignified workplace that supports acid-burn survivors and autistic adults in developing professional skills, gaining confidence, and entering the workforce.",
      "The interior combines the warmth of a neighbourhood bakery with a contemporary industrial character. Exposed ductwork, red service pipes and black metal details give the space a strong architectural identity, while soft grey finishes, natural timber furniture and diffused lighting create a calm and welcoming atmosphere. A monochromatic material palette reduces visual clutter, and clear spatial zoning helps make the environment easier for employees and visitors to understand and navigate.",
      "At the heart of the design is an open bakery and service counter that makes the preparation process visible. This transparency encourages interaction between the team and customers while celebrating the skills of the people working within the space. Generous circulation, organised workstations, straightforward wayfinding and a variety of seating options contribute to a more comfortable and sensory-considerate environment.",
      "Design focus: Inclusive employment, sensory-considerate planning, open food preparation, clear circulation and community engagement.",
      "Material palette: Textured grey surfaces, exposed metal services, black architectural details, natural timber and soft ambient lighting.",
      "Project vision: A contemporary bakery that serves quality food while creating pathways to training, employment and long-term social inclusion.",
    ],
    designFocus:
      "Inclusive employment, sensory-considerate planning, open food preparation, clear circulation and community engagement.",
    materialPalette:
      "Textured grey surfaces, exposed metal services, black architectural details, natural timber and soft ambient lighting.",
    vision:
      "A contemporary bakery that serves quality food while creating pathways to training, employment and long-term social inclusion.",
    accent: "orange",
  },
  {
    slug: "corporate-office",
    title: "Contemporary Corporate Office",
    featuredImage: "/project-images/Contemporary Corporate Office/1.png",
    location: "Dubai",
    summary:
      "",
    body: [
      "This workplace was designed as a refined, contemporary office that balances executive presence with openness, comfort and everyday functionality. The planning brings together private offices, meeting spaces, open workstations and staff amenities within a cohesive environment that supports both focused work and collaboration.",
      "A warm, neutral material palette softens the building's industrial character. Natural timber surfaces, textured stone finishes and bronze-toned cabinetry are paired with exposed concrete, visible services and slim black-framed glazing. The result is a professional interior that feels sophisticated without becoming overly formal.",
      "The open-plan workspace is organised around generous circulation routes, shared planting and ergonomic workstation clusters. Full-height windows bring daylight deep into the office, while adjustable blinds help manage glare and visual comfort. Linear pendant lighting provides focused illumination above work areas, complementing the natural light throughout the day.",
      "Glass-enclosed meeting rooms and executive offices maintain visual connectivity while providing the privacy required for discussions and concentrated work. Integrated shelving, curated objects and warm concealed lighting give the executive spaces a more personal and composed atmosphere. A centrally positioned pantry supports staff convenience while remaining visually consistent with the wider design language.",
      "Design focus: Workplace efficiency, visual connectivity, executive privacy, employee comfort and natural light.",
      "Material palette: Natural timber, textured stone, exposed concrete, bronze-toned metal, black-framed glass and soft neutral fabrics.",
      "Project vision: A timeless and people-focused workplace that reflects professionalism while encouraging communication, concentration and collaboration.",
    ],
    designFocus:
      "Workplace efficiency, visual connectivity, executive privacy, employee comfort and natural light.",
    materialPalette:
      "Natural timber, textured stone, exposed concrete, bronze-toned metal, black-framed glass and soft neutral fabrics.",
    keySpaces:
      "Open-plan workstations, executive offices, meeting rooms, collaborative areas, staff pantry and informal breakout zones.",
    vision:
      "A timeless and people-focused workplace that reflects professionalism while encouraging communication, concentration and collaboration.",
    accent: "cream",
  },
  {
    slug: "healthcare-wayfinding",
    title: "Patient-Centred Healthcare & Wayfinding Design",
    featuredImage: "/project-images/Patient-Centred Healthcare & Wayfinding Design/1.png",
    location: "Abu Dhabi",
    summary:
      "",
    body: [
      "This healthcare project was developed to create a calm, efficient and easily navigable clinical environment for patients, visitors and medical staff. The design combines functional planning with a clear visual communication system, helping reduce confusion and anxiety throughout reception areas, waiting zones, consultation corridors, laboratories and support departments.",
      "A coordinated bilingual wayfinding strategy forms the core of the project. Department signage, room numbering, overhead directional boards and floor graphics work together to guide users intuitively through the facility. Distinct colour zones identify key services such as consultation rooms, pharmacy, laboratory, radiology and administration, making routes easier to recognise and remember.",
      "The interior uses soft blue, sage green and warm neutral tones to establish a reassuring and professional atmosphere. Natural timber accents introduce warmth, while durable, easy-to-maintain finishes respond to the practical demands of a busy healthcare setting. Clear sightlines, wide circulation routes, continuous handrails and accessible signage support patients with different mobility and communication needs.",
      "Reception and nursing stations are positioned as visible orientation points within the plan. Their curved forms soften the clinical character of the space and create approachable points of contact for patients. Integrated digital queue displays, information screens and multilingual graphics further improve communication and operational efficiency.",
      "Design focus: Patient experience, intuitive navigation, accessibility, operational efficiency and visual clarity.",
      "Material palette: Soft blue and sage finishes, warm white surfaces, natural timber, stainless steel and durable healthcare-grade flooring.",
      "Project vision: To create a welcoming and well-organised healthcare facility that improves orientation, reduces stress and supports both patients and medical teams.",
    ],
    designFocus:
      "Patient experience, intuitive navigation, accessibility, operational efficiency and visual clarity.",
    materialPalette:
      "Soft blue and sage finishes, warm white surfaces, natural timber, stainless steel and durable healthcare-grade flooring.",
    keyFeatures:
      "Bilingual signage, colour-coded departments, floor wayfinding, digital queue systems, accessible handrails and clearly defined reception points.",
    vision:
      "To create a welcoming and well-organised healthcare facility that improves orientation, reduces stress and supports both patients and medical teams.",
    accent: "blue",
  },
  {
    slug: "fmcg-office",
    title: "Brand-Led FMCG Office",
    featuredImage: "/project-images/Brand-Led FMCG Office/3.png",
    location: "Dubai",
    summary:
      "",
    body: [
      "This workplace was designed as a contemporary headquarters for a growing food and consumer-goods brand, bringing together its corporate identity, product portfolio and company heritage within one cohesive environment. The aim was to create an office that supports daily productivity while giving employees and visitors a strong sense of the organisation's journey, values and ambitions.",
      "A central brand heritage wall forms the project's visual anchor. Integrated timelines, archival imagery and illuminated product displays transform the company's history into an engaging spatial experience. Rather than treating branding as decoration, the design embeds the organisation's story into the workplace and creates a memorable introduction for clients, partners and new employees.",
      "The open office combines generous workstations with suspended storage, collaborative meeting rooms and clear visual connections across departments. Exposed ceilings, visible services and black metal detailing establish a modern industrial character, balanced by natural timber, textured neutral finishes and warm architectural lighting. Deep navy accents reference the brand identity and give the interior a confident, recognisable tone.",
      "A variety of settings supports different styles of work. Formal meeting rooms provide the technology and privacy required for presentations and decision-making, while enclosed focus pods, informal lounges and communal tables accommodate short discussions, concentrated tasks and social interaction. Integrated planting introduces softness and helps create a more comfortable, human-centred atmosphere.",
      "Design focus: Brand storytelling, employee experience, collaboration, focused work and organizational growth.",
      "Material palette: Textured neutral surfaces, natural timber, brushed metal, black-framed glass and deep navy upholstery.",
      "Project vision: To create an inspiring headquarters where company culture, product identity and workplace performance come together in one unified design.",
    ],
    designFocus:
      "Brand storytelling, employee experience, collaboration, focused work and organisational growth.",
    materialPalette:
      "Textured neutral surfaces, natural timber, brushed metal, black-framed glass and deep navy upholstery.",
    keyFeatures:
      "Heritage timeline, illuminated product displays, open-plan workstations, glass meeting rooms, private focus pods, breakout lounges and integrated planting.",
    vision:
      "To create an inspiring headquarters where company culture, product identity and workplace performance come together in one unified design.",
    accent: "orange",
  },
  {
    slug: "finance-hq",
    title: "Finance HQ",
    featuredImage: "/project-images/Finance HQ/1.png",
    location: "Abu Dhabi - UAE",
    summary:"",
    body: [
      "This project was conceived as a premium corporate workplace that reflects the values of trust, stability and hospitality central to the brand. The design brings together formal business functions and welcoming client spaces within an elegant, contemporary environment inspired by regional warmth and modern professionalism.",
      "The reception establishes a strong first impression through a sculptural timber desk, refined stone finishes and integrated brand detailing. Vertical timber elements, soft curves and warm concealed lighting create a sense of sophistication while ensuring the arrival experience remains approachable and comfortable.",
      "A sequence of lounges, meeting rooms and executive spaces supports different levels of interaction, from informal conversations to confidential consultations and strategic presentations. Glass partitions maintain openness and visual connectivity, while carefully positioned screens and enclosed rooms provide the privacy required within a financial and insurance workplace.",
      "The interior palette combines natural timber, warm neutrals, deep green accents, bronze details and tan leather. These materials communicate permanence and quality while introducing a more residential sense of comfort. References to local architectural forms appear through arches, geometric detailing, textured surfaces and crafted joinery, giving the workplace a distinctive regional identity without relying on traditional ornamentation.",
      "Design focus: Corporate identity, client experience, privacy, executive functionality and regional character.",
      "Material palette: Natural timber, warm stone, textured neutral fabrics, deep green upholstery, tan leather, bronze accents and black-framed glass.",
      "Project vision: To create a sophisticated and welcoming headquarters that expresses trust, cultural relevance and contemporary corporate excellence.",
    ],
    designFocus:
      "Corporate identity, client experience, privacy, executive functionality and regional character.",
    materialPalette:
      "Natural timber, warm stone, textured neutral fabrics, deep green upholstery, tan leather, bronze accents and black-framed glass.",
    keySpaces:
      "Main reception, client lounges, consultation rooms, executive offices, boardroom and informal meeting areas.",
    vision:
      "To create a sophisticated and welcoming headquarters that expresses trust, cultural relevance and contemporary corporate excellence.",
    accent: "cream",
  },

  {
  slug: "contemporary-office-building",       // URL-la varum: /projects/your-project-slug
  title: "Contemporary Office Building",
  featuredImage: "/project-images/Contemporary Office Building/Abu_Dhabi_Commercial_Building_01.png",
  location: "Dubai",
  summary: "",
  body: [
    "This project was conceived as a contemporary workplace that combines a strong commercial identity with a climate-responsive architectural approach. The client envisioned a distinctive office building with a memorable urban presence, a welcoming arrival experience and flexible, light-filled workspaces that support collaboration, client interaction and everyday comfort.",
    "The architecture is defined by a sculpted light-stone volume that frames a transparent glazed workplace. Deep façade reveals, planted terraces and carefully composed openings soften the massing, while mashrabiya-inspired metal screens introduce shade, privacy and visual depth. These elements reinterpret regional architectural language in a refined contemporary form, giving the building a character that feels both modern and rooted in its context.",
    "A layered façade strategy combines high-performance glazing, bronze-toned vertical fins, perforated mashrabiya screens and integrated landscaping. The screens help reduce direct solar exposure while allowing filtered daylight and maintaining outward views. Their intricate geometric pattern also creates changing shadows throughout the day, adding richness and movement to the elevation.",
    "At ground level, the building is designed to feel open and welcoming. A generous entrance, shaded drop-off area, water feature and carefully arranged planting establish a strong arrival sequence. Transparent glazing at the lower levels creates visual connection between the interior and the public realm, while upper floors benefit from generous daylight, views and access to landscaped terraces.",
    "The project demonstrates how a commercial workplace can balance architectural presence, environmental performance and cultural relevance. By combining passive shading, high-performance materials, greenery and carefully controlled solid-to-void relationships, the building creates a distinctive contemporary identity while responding to climate, context and user comfort.",
    "Design Focus : Climate-responsive façade, mashrabiya shading, biophilic terraces, clear arrival sequence, passive solar control and contemporary regional identity.",
    "Material Palette : Light textured stone, high-performance glazing, bronze-toned metal screens and vertical fins, integrated planting, stone paving and reflective water features.",
    "Vision : A refined contemporary office building that brings together environmental performance, workplace comfort, architectural presence and a distinctly regional façade language."
  ],
  designFocus: "Climate-responsive façade, mashrabiya shading, biophilic terraces, clear arrival sequence, passive solar control and contemporary regional identity.",
  materialPalette: "Light textured stone, high-performance glazing, bronze-toned metal screens and vertical fins, integrated planting, stone paving and reflective water features.",
  keySpaces: "...",       // optional
  keyFeatures: "...",     // optional
  vision: "A refined contemporary office building that brings together environmental performance, workplace comfort, architectural presence and a distinctly regional façade language.",
  accent: "orange",       // "orange" | "blue" | "cream"
},
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
