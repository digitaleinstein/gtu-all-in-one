export interface CourseOption {
  code: string;
  name: string;
  maxSem: number;
}

export const GTU_COURSES: CourseOption[] = [
  { code: "BE", name: "Bachelor of Engineering (B.E. / B.Tech)", maxSem: 8 },
  { code: "Diploma", name: "Diploma Engineering", maxSem: 6 },
  { code: "ME", name: "Master of Engineering (M.E. / M.Tech)", maxSem: 4 },
  { code: "MBA", name: "Master of Business Administration (MBA)", maxSem: 4 },
  { code: "MCA", name: "Master of Computer Applications (MCA)", maxSem: 4 },
  { code: "B.Pharm", name: "Bachelor of Pharmacy (B.Pharm)", maxSem: 8 },
  { code: "M.Pharm", name: "Master of Pharmacy (M.Pharm)", maxSem: 4 },
  { code: "B.Arch", name: "Bachelor of Architecture (B.Arch)", maxSem: 10 },
];

export const GTU_BRANCHES: Record<string, string[]> = {
  BE: [
    "Computer Engineering",
    "Information Technology",
    "Artificial Intelligence and Data Science",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Communication Engineering",
    "Chemical Engineering",
    "Automobile Engineering",
    "Robotics & Automation",
    "Mechatronics Engineering",
    "Instrumentation & Control",
    "Biomedical Engineering",
    "Aeronautical Engineering",
  ],
  Diploma: [
    "Computer Engineering",
    "Information Technology",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Communication",
    "Automobile Engineering",
    "Chemical Engineering",
  ],
  ME: [
    "Computer Engineering (Software Engineering)",
    "Cyber Security",
    "Thermal Engineering",
    "Structural Engineering",
    "VLSI Design & Embedded Systems",
  ],
  MBA: [
    "Finance",
    "Marketing",
    "Human Resource Management",
    "Information Technology & Systems",
    "Operations Management",
  ],
  MCA: [
    "Computer Applications",
    "Software Development & Cloud Computing",
  ],
  "B.Pharm": [
    "Pharmaceutics",
    "Pharmacology",
    "Pharmaceutical Chemistry",
    "Pharmacognosy",
  ],
};

export const GTU_EXAM_SESSIONS = [
  "Summer 2024",
  "Winter 2023",
  "Summer 2023",
  "Winter 2022",
  "Summer 2022",
  "Winter 2021",
  "Summer 2021",
  "Winter 2020",
];

export interface GTUSubject {
  code: string;
  name: string;
  course: string;
  branch: string;
  semester: number;
  credits: number;
}

export const GTU_POPULAR_SUBJECTS: GTUSubject[] = [
  // Sem 1 & 2
  { code: "3110005", name: "Basic Electrical Engineering (BEE)", course: "BE", branch: "Computer Engineering", semester: 1, credits: 4 },
  { code: "3110006", name: "Basic Mechanical Engineering (BME)", course: "BE", branch: "Mechanical Engineering", semester: 1, credits: 4 },
  { code: "3110014", name: "Mathematics - 1 (Calculus)", course: "BE", branch: "Computer Engineering", semester: 1, credits: 4 },
  { code: "3110015", name: "Mathematics - 2 (Vector Calculus & Linear Algebra)", course: "BE", branch: "Computer Engineering", semester: 2, credits: 4 },
  { code: "3110002", name: "English", course: "BE", branch: "Computer Engineering", semester: 1, credits: 2 },
  { code: "3110003", name: "Programming for Problem Solving (PPS)", course: "BE", branch: "Computer Engineering", semester: 2, credits: 5 },
  
  // Sem 3
  { code: "3130702", name: "Data Structures (DS)", course: "BE", branch: "Computer Engineering", semester: 3, credits: 5 },
  { code: "3130703", name: "Database Management Systems (DBMS)", course: "BE", branch: "Computer Engineering", semester: 3, credits: 5 },
  { code: "3130704", name: "Digital Fundamentals (DF)", course: "BE", branch: "Computer Engineering", semester: 3, credits: 4 },
  { code: "3130006", name: "Probability and Statistics (P&S)", course: "BE", branch: "Computer Engineering", semester: 3, credits: 4 },
  { code: "3130008", name: "Design Engineering - I A", course: "BE", branch: "Computer Engineering", semester: 3, credits: 3 },

  // Sem 4
  { code: "3140702", name: "Operating System (OS)", course: "BE", branch: "Computer Engineering", semester: 4, credits: 4 },
  { code: "3140705", name: "Object Oriented Programming - I (Java)", course: "BE", branch: "Computer Engineering", semester: 4, credits: 5 },
  { code: "3140707", name: "Computer Organization & Architecture (COA)", course: "BE", branch: "Computer Engineering", semester: 4, credits: 4 },
  { code: "3140708", name: "Discrete Mathematics (DM)", course: "BE", branch: "Computer Engineering", semester: 4, credits: 4 },
  { code: "3140709", name: "Principles of Economics and Management (PEM)", course: "BE", branch: "Computer Engineering", semester: 4, credits: 3 },

  // Sem 5
  { code: "3150703", name: "Analysis and Design of Algorithms (ADA)", course: "BE", branch: "Computer Engineering", semester: 5, credits: 5 },
  { code: "3150709", name: "Professional Ethics", course: "BE", branch: "Computer Engineering", semester: 5, credits: 3 },
  { code: "3150710", name: "Computer Networks (CN)", course: "BE", branch: "Computer Engineering", semester: 5, credits: 5 },
  { code: "3150711", name: "Software Engineering (SE)", course: "BE", branch: "Computer Engineering", semester: 5, credits: 4 },
  { code: "3150713", name: "Python for Data Science", course: "BE", branch: "Computer Engineering", semester: 5, credits: 4 },

  // Sem 6
  { code: "3160704", name: "Theory of Computation (TOC)", course: "BE", branch: "Computer Engineering", semester: 6, credits: 4 },
  { code: "3160707", name: "Advanced Java Technology (AJT)", course: "BE", branch: "Computer Engineering", semester: 6, credits: 5 },
  { code: "3160712", name: "Microprocessor and Interfacing (MPI)", course: "BE", branch: "Computer Engineering", semester: 6, credits: 4 },
  { code: "3160714", name: "Data Mining and Business Intelligence (DMBI)", course: "BE", branch: "Computer Engineering", semester: 6, credits: 4 },
  { code: "3160716", name: "Web Technology", course: "BE", branch: "Computer Engineering", semester: 6, credits: 4 },

  // Sem 7
  { code: "3170701", name: "Information and Network Security (INS)", course: "BE", branch: "Computer Engineering", semester: 7, credits: 4 },
  { code: "3170710", name: "Mobile Application Development (MAD)", course: "BE", branch: "Computer Engineering", semester: 7, credits: 4 },
  { code: "3170716", name: "Artificial Intelligence (AI)", course: "BE", branch: "Computer Engineering", semester: 7, credits: 4 },
  { code: "3170724", name: "Machine Learning (ML)", course: "BE", branch: "Computer Engineering", semester: 7, credits: 4 },
  { code: "3170001", name: "Project - I (PMMS Phase 1)", course: "BE", branch: "Computer Engineering", semester: 7, credits: 6 },

  // Sem 8
  { code: "3180701", name: "Cloud Computing (CC)", course: "BE", branch: "Computer Engineering", semester: 8, credits: 4 },
  { code: "3180703", name: "Big Data Analytics (BDA)", course: "BE", branch: "Computer Engineering", semester: 8, credits: 4 },
  { code: "3180709", name: "Project - II (PMMS Final Project)", course: "BE", branch: "Computer Engineering", semester: 8, credits: 8 },
  { code: "3180710", name: "Internet of Things (IoT)", course: "BE", branch: "Computer Engineering", semester: 8, credits: 4 },

  // IT Subjects
  { code: "3151605", name: "Formal Language & Automata Theory", course: "BE", branch: "Information Technology", semester: 5, credits: 4 },
  { code: "3161608", name: "Full Stack Web Development", course: "BE", branch: "Information Technology", semester: 6, credits: 5 },
  { code: "3171611", name: "DevOps & Cloud Automation", course: "BE", branch: "Information Technology", semester: 7, credits: 4 },

  // Mechanical
  { code: "3131904", name: "Material Science and Metallurgy", course: "BE", branch: "Mechanical Engineering", semester: 3, credits: 4 },
  { code: "3141901", name: "Fluid Mechanics and Hydraulics", course: "BE", branch: "Mechanical Engineering", semester: 4, credits: 4 },
  { code: "3151908", name: "Heat Transfer", course: "BE", branch: "Mechanical Engineering", semester: 5, credits: 5 },
  { code: "3161902", name: "Internal Combustion Engines", course: "BE", branch: "Mechanical Engineering", semester: 6, credits: 4 },

  // Civil
  { code: "3130606", name: "Geotechnical Engineering", course: "BE", branch: "Civil Engineering", semester: 3, credits: 4 },
  { code: "3140603", name: "Structural Analysis", course: "BE", branch: "Civil Engineering", semester: 4, credits: 5 },
  { code: "3150611", name: "Transportation Engineering", course: "BE", branch: "Civil Engineering", semester: 5, credits: 4 },
];

export interface PMMSMilestoneGuide {
  key: string;
  title: string;
  phase: string;
  deadlineDays: number;
  description: string;
  requirements: string[];
  templatesUrl?: string;
  gtuGuidelines: string;
}

export const PMMS_DEFAULT_MILESTONES: PMMSMilestoneGuide[] = [
  {
    key: "team_reg",
    title: "1. Team Formation & Project Title Registration",
    phase: "Phase 1 (Sem 7)",
    deadlineDays: 15,
    description: "Create project team of 2 to 4 students, propose IDP (Industry Defined Project) or UDP (User Defined Project) title and problem statement.",
    requirements: [
      "Select Team Leader & Team Members (Max 4 students).",
      "Draft concise Problem Statement & Expected Outcomes.",
      "Submit Industry Mentor details if IDP.",
    ],
    gtuGuidelines: "All members must register on pmms.gtu.ac.in using enrollment number and institutional email.",
  },
  {
    key: "guide_allocation",
    title: "2. Internal Guide Mapping & Approval",
    phase: "Phase 1 (Sem 7)",
    deadlineDays: 25,
    description: "Assign faculty internal supervisor/mentor from department and obtain digital approval on PMMS portal.",
    requirements: [
      "Select Internal Guide from department roster.",
      "Submit synopsis draft to guide for initial sign-off.",
      "Guide verifies and approves title on PMMS dashboard.",
    ],
    gtuGuidelines: "A faculty member cannot guide more than 5 teams concurrently per GTU norms.",
  },
  {
    key: "ppr_1",
    title: "3. Periodic Progress Report 1 (PPR-1)",
    phase: "Phase 1 (Sem 7)",
    deadlineDays: 45,
    description: "First bi-weekly progress review detailing literature survey, problem definition, and initial architecture.",
    requirements: [
      "Minimum 10 research papers / industrial case studies reviewed.",
      "Summary of discussions with guide and industry mentor.",
      "Log activities performed during the first 4 weeks.",
    ],
    gtuGuidelines: "PPR must be submitted online and approved by Internal Guide with comments.",
  },
  {
    key: "canvas_aeiou",
    title: "4. Design Engineering: AEIOU Canvas Submission",
    phase: "Phase 1 (Sem 7)",
    deadlineDays: 60,
    description: "Activities, Environments, Interactions, Objects, and Users canvas mapping the problem domain.",
    requirements: [
      "Physical observation of user environment or industrial setup.",
      "Upload high-resolution scanned sheet or digital canvas PDF.",
      "Guide verification and score entry.",
    ],
    gtuGuidelines: "Crucial component of GTU Design Engineering (DE) framework.",
  },
  {
    key: "canvas_empathy",
    title: "5. Design Engineering: Empathy & Ideation Canvases",
    phase: "Phase 1 (Sem 7)",
    deadlineDays: 75,
    description: "Empathy mapping (User feelings, pain points, desires) and Ideation Canvas (brainstorming solutions).",
    requirements: [
      "Map user personas, user conflicts, and extreme users.",
      "Ideate at least 15+ potential solution features.",
      "Prioritize using Feasibility-Impact matrix.",
    ],
    gtuGuidelines: "Both canvas sheets must be uploaded together with summary notes.",
  },
  {
    key: "canvas_pdc",
    title: "6. Product Development Canvas (PDC)",
    phase: "Phase 1 (Sem 7)",
    deadlineDays: 90,
    description: "Detailed system architecture, components, customer revalidation, and technology stack roadmap.",
    requirements: [
      "Define Purpose, Product Experience, and Features.",
      "Specify Hardware/Software requirements and components.",
      "Create MVP (Minimum Viable Product) timeline.",
    ],
    gtuGuidelines: "Complete PDC canvas signed by guide.",
  },
  {
    key: "psar_report",
    title: "7. Patent Search and Analysis Report (PSAR)",
    phase: "Phase 1 (Sem 7)",
    deadlineDays: 105,
    description: "Search and study minimum 5 related patents from Indian Patent Office (IPO), USPTO, or Google Patents.",
    requirements: [
      "Study minimum 5 published/granted patents related to your domain.",
      "Fill PSAR sheet with Patent Number, Applicant, Claims, and Relevance.",
      "Analyze non-infringement and novelty aspects.",
    ],
    gtuGuidelines: "Mandatory GTU innovation benchmark for all final year engineering students.",
  },
  {
    key: "ppr_4_and_midterm",
    title: "8. PPR-4 & Midterm Progress Report Submission",
    phase: "Phase 1 (Sem 7)",
    deadlineDays: 120,
    description: "Finalize Phase 1 documentation, working prototype demonstration, and generate PMMS completion card.",
    requirements: [
      "Submit PPR-2, PPR-3, and PPR-4 logs.",
      "Upload compiled Phase 1 Project Report in GTU prescribed format.",
      "Internal viva assessment score recorded by department committee.",
    ],
    gtuGuidelines: "Generate Phase 1 completion certificate for 7th Sem university viva.",
  },
  {
    key: "sem8_phase2_kickoff",
    title: "9. Phase 2 (Sem 8) Continuation & Module Implementation",
    phase: "Phase 2 (Sem 8)",
    deadlineDays: 140,
    description: "Re-confirm project progress on PMMS, implement core functional modules, and begin live testing.",
    requirements: [
      "Update project status on PMMS Phase 2 tab.",
      "Complete core software/hardware testing with real metrics.",
      "Submit Sem 8 PPR-1 and PPR-2.",
    ],
    gtuGuidelines: "Guide approves progress regularly before final submission window opens.",
  },
  {
    key: "plagiarism_final",
    title: "10. Anti-Plagiarism Check (Turnitin / Urkund)",
    phase: "Phase 2 (Sem 8)",
    deadlineDays: 165,
    description: "Submit final report draft for plagiarism check. Must be under GTU threshold (Max 30% similarity).",
    requirements: [
      "Similarity index must be <= 30% excluding references.",
      "Attach Plagiarism Certificate signed by Institute Librarian / Guide.",
      "Upload similarity report PDF on PMMS.",
    ],
    gtuGuidelines: "Reports exceeding 30% similarity will be rejected by GTU external examiners.",
  },
  {
    key: "final_pmms_completion",
    title: "11. Final Project Report & GTU PMMS Certificate",
    phase: "Phase 2 (Sem 8)",
    deadlineDays: 180,
    description: "Upload final bound report PDF, code repository/schematic links, and generate GTU Final Completion Certificate.",
    requirements: [
      "Complete report following GTU standard book format (Bond paper, hard bound).",
      "Obtain guide and Head of Department digital signature.",
      "Download official GTU Project Completion Certificate.",
    ],
    gtuGuidelines: "Certificate must be bound inside the physical thesis copy for GTU External Viva.",
  },
];
