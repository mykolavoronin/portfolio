/** IT Academy by Barcelona Activa — Certified Cybersecurity Analyst itinerary. */

export const itAcademy = {
  slug: "it-academy",
  path: "/education/it-academy",
  name: "IT Academy",
  org: "Barcelona Activa",
  orgFull: "Ajuntament de Barcelona · Barcelona Activa",
  programCa: "Itinerari certificat d'Analista en Ciberseguretat",
  programEn: "Certified Cybersecurity Analyst Itinerary",
  shortTitle: "Cybersecurity Analyst",
  status: "Upcoming",
  period: "2026",
  location: "Barcelona, Spain",
  href: "https://cibernarium.barcelonactiva.cat/",
  academyHref: "https://www.barcelonactiva.cat/",
  tagline: "A certified path into junior cybersecurity — SOC, defence, and ethical hacking.",
  description:
    "IT Academy by Barcelona Activa is the City of Barcelona's reference centre for IT training. I'm training on the certified Cybersecurity Analyst itinerary: fundamentals, SOC operations, network defence, and ethical hacking — with official Cisco pathways and job-market support.",
  seoDescription:
    "Mykola Voronin is training on the IT Academy by Barcelona Activa Certified Cybersecurity Analyst itinerary — SOC, network security, ethical hacking, and Cisco pathways.",

  about: [
    "IT Academy is Barcelona Activa's technology training centre for the City of Barcelona. Its mission is to strengthen the city's competitiveness by building digital skills across the public.",
    "With a practical, competency-based model, it offers specialised training in web development, data analysis, and cybersecurity — areas that power the local tech sector.",
    "Itineraries are designed for people who want to reorient their careers into IT. Graduates receive an official certificate validating the competencies they acquire, and Barcelona Activa provides tools and support for labour-market insertion.",
  ],

  why: [
    "Reference IT training centre of the Ajuntament de Barcelona.",
    "Innovative, practical, competency-based methodology.",
    "Official certificates plus free first attempts at key Cisco exams for enrolled students.",
    "Emotional support, tutoring, campus, Discord community, and job-search accompaniment.",
  ],

  stats: [
    { value: "2017", label: "Founded" },
    { value: "9.4/10", label: "Satisfaction" },
    { value: "82%", label: "Job placement*" },
    { value: "+4,500", label: "People trained" },
  ] as const,
  statsNote: "*Job placement measured within 180 days of graduating.",

  programIntro:
    "The Certified Cybersecurity Analyst itinerary is open to people with or without prior knowledge who want a career in cybersecurity. It moves from solid foundations through SOC-oriented analysis into offensive and defensive specialisation.",

  phases: [
    {
      id: "phase-1",
      phase: "Phase 1",
      hours: "176h",
      title: "Fundamentals — Junior Cybersecurity Analyst",
      titleCa: "Fonaments Analista Júnior en Ciberseguretat",
      format: "Remote",
      schedule: "Afternoons, 15:00–18:00",
      method: "Lecture-based",
      summary:
        "A solid base in cybersecurity: networks, technical support, and information security. You learn how digital infrastructures work and how to manage risk.",
      outcomes: [
        "Core networking, IT support, and security concepts",
        "How digital infrastructures operate day to day",
        "Risk awareness and security fundamentals",
      ],
      credentials: [
        { name: "Cisco CCST IT Support", kind: "certification" },
        { name: "Cisco CCST Networking", kind: "certification" },
        { name: "Cisco CCST Cybersecurity", kind: "certification" },
      ],
      note: "First exam attempts are free for enrolled students. Existing certifications do not need to be repeated.",
    },
    {
      id: "phase-2-1",
      phase: "Phase 2.1",
      hours: "70h",
      title: "CCNA Cybersecurity",
      titleCa: "CCNA Cybersecurity",
      format: "In person",
      schedule: "Afternoons, 15:00–19:00",
      method: "Flipped classroom",
      summary:
        "Train for Level 1 work in a Security Operations Centre (SOC). Work with real tools to monitor threats, detect incidents, analyse logs, and give first-line response to cyber attacks.",
      outcomes: [
        "Threat monitoring and incident detection",
        "Log analysis and initial incident response",
        "SOC Level 1 analyst practices",
      ],
      credentials: [{ name: "Cisco Certified CCNA Cybersecurity", kind: "certification" }],
      note: "Free first exam attempt for enrolled students. Job search support starts after passing the CCNA stage.",
    },
    {
      id: "phase-2-2",
      phase: "Phase 2.2",
      hours: "70h",
      title: "Network Security",
      titleCa: "Network Security",
      format: "In person · English",
      schedule: "Afternoons, 15:00–19:00",
      method: "Flipped classroom",
      summary:
        "Defensive specialisation: implement and configure network defences, harden systems, and manage security policy.",
      outcomes: [
        "Secure network configuration",
        "Security policy management",
        "Defensive controls in real environments",
      ],
      credentials: [{ name: "Cisco Network Security", kind: "badge" }],
      note: "Official Cisco badge after completing training and the final exam (not a full certification).",
    },
    {
      id: "phase-2-3",
      phase: "Phase 2.3",
      hours: "70h",
      title: "Ethical Hacker",
      titleCa: "Ethical Hacker",
      format: "In person · English",
      schedule: "Afternoons, 15:00–19:00",
      method: "Flipped classroom",
      summary:
        "Offensive specialisation: ethical hacking techniques, vulnerability identification, and penetration testing to validate the defences you built.",
      outcomes: [
        "Ethical hacking techniques",
        "Vulnerability identification",
        "Penetration testing (pentest) fundamentals",
      ],
      credentials: [{ name: "Cisco Ethical Hacker", kind: "badge" }],
      note: "Official Cisco badge after completing training and the final exam (not a full certification).",
    },
  ] as const,

  phaseTotals: {
    fundamentals: "176h",
    specialisation: "210h",
    specialisationNote: "Phase 2 — Junior Cybersecurity Analyst specialisation (CCNA + Network Security + Ethical Hacker)",
  },

  competencies: [
    "Emotional self-regulation",
    "Performance and well-being",
    "Confidence and personal empowerment",
    "Organisation and prioritisation",
    "Managing uncertainty and frustration",
  ],

  careers: [
    "Junior cybersecurity analyst",
    "IT security systems support technician",
    "Security operations centre (SOC) operator",
    "Assistance in security incident detection and response",
  ],

  support: [
    {
      title: "Emotional accompaniment",
      body: "Psychological support service and well-being resources throughout the itinerary.",
    },
    {
      title: "Tutoring & training",
      body: "Direct contact with faculty and staff — corrections, feedback, and guided exercises.",
    },
    {
      title: "Virtual campus",
      body: "Syllabus by block, exercise hand-in, evaluations, documents, videos, forums, and virtual classrooms.",
    },
    {
      title: "Discord community",
      body: "Course communication hub with peers, staff, and channels like #jobs, #hackathons, #events, and #masterclass.",
    },
    {
      title: "Job market support",
      body: "Offers, accompaniment, and insertion tools — job search activates after passing the CCNA stage.",
    },
  ],
} as const;
