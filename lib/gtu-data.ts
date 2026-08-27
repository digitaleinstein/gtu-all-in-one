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
  "Summer 2026",
  "Winter 2026",
  "Summer 2027",
  "Winter 2025",
  "Summer 2025",
  "Winter 2024",
  "Summer 2024",
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
  // Sem 1 & 2 (Common First Year)
  { code: "3110005", name: "Basic Electrical Engineering (BEE)", course: "BE", branch: "Computer Engineering", semester: 1, credits: 4 },
  { code: "3110006", name: "Basic Mechanical Engineering (BME)", course: "BE", branch: "Mechanical Engineering", semester: 1, credits: 4 },
  { code: "3110014", name: "Mathematics - 1 (Calculus)", course: "BE", branch: "Computer Engineering", semester: 1, credits: 4 },
  { code: "3110015", name: "Mathematics - 2 (Vector Calculus & Linear Algebra)", course: "BE", branch: "Computer Engineering", semester: 2, credits: 4 },
  { code: "3110002", name: "English", course: "BE", branch: "Computer Engineering", semester: 1, credits: 2 },
  { code: "3110003", name: "Programming for Problem Solving (PPS)", course: "BE", branch: "Computer Engineering", semester: 2, credits: 5 },
  { code: "3110013", name: "Engineering Graphics & Design (EGD)", course: "BE", branch: "Civil Engineering", semester: 2, credits: 4 },
  { code: "3110016", name: "Basic Electronics", course: "BE", branch: "Electronics & Communication Engineering", semester: 2, credits: 4 },

  // Sem 3
  { code: "3130702", name: "Data Structures (DS)", course: "BE", branch: "Computer Engineering", semester: 3, credits: 5 },
  { code: "3130703", name: "Database Management Systems (DBMS)", course: "BE", branch: "Computer Engineering", semester: 3, credits: 5 },
  { code: "3130704", name: "Digital Fundamentals (DF)", course: "BE", branch: "Computer Engineering", semester: 3, credits: 4 },
  { code: "3130006", name: "Probability and Statistics (P&S)", course: "BE", branch: "Computer Engineering", semester: 3, credits: 4 },
  { code: "3130008", name: "Design Engineering - I A", course: "BE", branch: "Computer Engineering", semester: 3, credits: 3 },
  { code: "3131904", name: "Material Science and Metallurgy", course: "BE", branch: "Mechanical Engineering", semester: 3, credits: 4 },
  { code: "3130606", name: "Geotechnical Engineering", course: "BE", branch: "Civil Engineering", semester: 3, credits: 4 },

  // Sem 4
  { code: "3140702", name: "Operating System (OS)", course: "BE", branch: "Computer Engineering", semester: 4, credits: 4 },
  { code: "3140705", name: "Object Oriented Programming - I (Java)", course: "BE", branch: "Computer Engineering", semester: 4, credits: 5 },
  { code: "3140707", name: "Computer Organization & Architecture (COA)", course: "BE", branch: "Computer Engineering", semester: 4, credits: 4 },
  { code: "3140708", name: "Discrete Mathematics (DM)", course: "BE", branch: "Computer Engineering", semester: 4, credits: 4 },
  { code: "3140709", name: "Principles of Economics and Management (PEM)", course: "BE", branch: "Computer Engineering", semester: 4, credits: 3 },
  { code: "3141901", name: "Fluid Mechanics and Hydraulics", course: "BE", branch: "Mechanical Engineering", semester: 4, credits: 4 },
  { code: "3140603", name: "Structural Analysis", course: "BE", branch: "Civil Engineering", semester: 4, credits: 5 },

  // Sem 5
  { code: "3150703", name: "Analysis and Design of Algorithms (ADA)", course: "BE", branch: "Computer Engineering", semester: 5, credits: 5 },
  { code: "3150710", name: "Computer Networks (CN)", course: "BE", branch: "Computer Engineering", semester: 5, credits: 4 },
  { code: "3150711", name: "Software Engineering (SE)", course: "BE", branch: "Computer Engineering", semester: 5, credits: 4 },
  { code: "3150713", name: "Python for Data Science", course: "BE", branch: "Computer Engineering", semester: 5, credits: 4 },
  { code: "3150709", name: "Professional Ethics", course: "BE", branch: "Computer Engineering", semester: 5, credits: 3 },
  { code: "3151908", name: "Heat Transfer", course: "BE", branch: "Mechanical Engineering", semester: 5, credits: 4 },
  { code: "3150611", name: "Transportation Engineering", course: "BE", branch: "Civil Engineering", semester: 5, credits: 4 },

  // Sem 6
  { code: "3160704", name: "Theory of Computation (TOC)", course: "BE", branch: "Computer Engineering", semester: 6, credits: 4 },
  { code: "3160707", name: "Advanced Java Technology (AJT)", course: "BE", branch: "Computer Engineering", semester: 6, credits: 5 },
  { code: "3160714", name: "Data Mining and Business Intelligence", course: "BE", branch: "Computer Engineering", semester: 6, credits: 4 },
  { code: "3160712", name: "Microprocessor and Interfacing (MPI)", course: "BE", branch: "Computer Engineering", semester: 6, credits: 4 },
  { code: "3161902", name: "Internal Combustion Engines", course: "BE", branch: "Mechanical Engineering", semester: 6, credits: 4 },

  // Sem 7
  { code: "3170701", name: "Information and Network Security (INS)", course: "BE", branch: "Computer Engineering", semester: 7, credits: 4 },
  { code: "3170710", name: "Mobile Application Development (MAD)", course: "BE", branch: "Computer Engineering", semester: 7, credits: 5 },
  { code: "3170716", name: "Artificial Intelligence (AI)", course: "BE", branch: "Computer Engineering", semester: 7, credits: 4 },
  { code: "3170724", name: "Machine Learning (ML)", course: "BE", branch: "Computer Engineering", semester: 7, credits: 5 },

  // Sem 8
  { code: "3180701", name: "Cloud Computing (CC)", course: "BE", branch: "Computer Engineering", semester: 8, credits: 4 },
  { code: "3180703", name: "Big Data Analytics (BDA)", course: "BE", branch: "Computer Engineering", semester: 8, credits: 4 },
  { code: "3180710", name: "Internet of Things (IoT)", course: "BE", branch: "Computer Engineering", semester: 8, credits: 4 },

  // Diploma Engineering
  { code: "4330701", name: "Data Structures Using C", course: "Diploma", branch: "Computer Engineering", semester: 3, credits: 4 },
  { code: "4340702", name: "Object Oriented Programming Using C++", course: "Diploma", branch: "Computer Engineering", semester: 4, credits: 4 },
  { code: "4350703", name: "Database Management", course: "Diploma", branch: "Computer Engineering", semester: 5, credits: 4 },
  { code: "4360701", name: "Web Development Using PHP & MySQL", course: "Diploma", branch: "Computer Engineering", semester: 6, credits: 4 },

  // MBA & MCA
  { code: "4519201", name: "Management Information Systems", course: "MBA", branch: "Information Technology & Systems", semester: 1, credits: 3 },
  { code: "4529202", name: "Financial Management", course: "MBA", branch: "Finance", semester: 2, credits: 3 },
  { code: "3610001", name: "Object Oriented Concepts with Java", course: "MCA", branch: "Computer Applications", semester: 1, credits: 4 },
  { code: "3620002", name: "Full Stack Web Development", course: "MCA", branch: "Computer Applications", semester: 2, credits: 4 },
];

export const GTU_CIRCULAR_CATEGORIES = [
  "ALL",
  "Examinations",
  "Academic",
  "Timetables",
  "Scholarships",
  "PMMS & Research",
  "General",
];

export const PMMS_ACTIVITY_TYPES = [
  "Team Formation & Guide Selection",
  "Project Title & Domain Approval",
  "Periodic Progress Report 1 (PPR-1)",
  "Periodic Progress Report 2 (PPR-2)",
  "Periodic Progress Report 3 (PPR-3)",
  "Periodic Progress Report 4 (PPR-4)",
  "Business Model Canvas (BMC)",
  "Design Engineering Canvas (DEC)",
  "Patent Search & Analysis Report (PSAR)",
  "Plagiarism Search Report",
  "Final Project Report Submission",
  "Completion Certificate Generation",
];

export interface PMMSMilestoneDef {
  key: string;
  title: string;
  semester: number;
  phase: string;
  deadlineDescription: string;
  description: string;
  instructions: string[];
  templateUrl?: string;
}

export const PMMS_DEFAULT_MILESTONES: PMMSMilestoneDef[] = [
  {
    key: "TEAM_FORMATION",
    title: "Team Formation & Internal Guide Selection",
    semester: 7,
    phase: "Phase 1 - Sem 7",
    deadlineDescription: "Within 2 weeks of term commencement",
    description: "Create project team (1-4 students), nominate team leader, and select internal faculty guide.",
    instructions: [
      "Login to PMMS portal (pmms.gtu.ac.in).",
      "Team Leader registers team members with 12-digit enrollment numbers.",
      "Select internal faculty guide from departmental dropdown.",
      "Internal Guide must approve team request on PMMS dashboard.",
    ],
  },
  {
    key: "PROJECT_TITLE",
    title: "Project Title, Domain & Abstract Approval",
    semester: 7,
    phase: "Phase 1 - Sem 7",
    deadlineDescription: "Month 1 of Semester 7",
    description: "Submit UDP (User Defined Project) or IDP (Industry Defined Project) problem definition.",
    instructions: [
      "Enter exact project title, industrial domain, and problem statement.",
      "Attach industry mentor company letter if working on IDP.",
      "Obtain guide digital sign-off on PMMS.",
    ],
  },
  {
    key: "PPR_1",
    title: "Periodic Progress Report 1 (PPR-1)",
    semester: 7,
    phase: "Phase 1 - Sem 7",
    deadlineDescription: "End of Month 1",
    description: "Document literature survey, feasibility study, and requirements gathering.",
    instructions: [
      "Fill 4 mandatory question responses regarding work done in previous month.",
      "Submit for guide comments and grading.",
    ],
  },
  {
    key: "PPR_2",
    title: "Periodic Progress Report 2 (PPR-2)",
    semester: 7,
    phase: "Phase 1 - Sem 7",
    deadlineDescription: "End of Month 2",
    description: "Document architectural design, component selection, and DFD/UML diagrams.",
    instructions: [
      "Document hardware/software stack choices.",
      "Upload module specifications and get guide approval.",
    ],
  },
  {
    key: "PPR_3",
    title: "Periodic Progress Report 3 (PPR-3)",
    semester: 7,
    phase: "Phase 1 - Sem 7",
    deadlineDescription: "End of Month 3",
    description: "Implementation of prototype modules and preliminary testing.",
    instructions: [
      "Submit progress log and module integration snapshot.",
    ],
  },
  {
    key: "PPR_4",
    title: "Periodic Progress Report 4 (PPR-4)",
    semester: 7,
    phase: "Phase 1 - Sem 7",
    deadlineDescription: "End of Month 4",
    description: "Semester 7 Phase 1 completion and presentation preparation.",
    instructions: [
      "Submit final PPR-4 for Sem 7 review.",
    ],
  },
  {
    key: "BMC_CANVAS",
    title: "Business Model Canvas (BMC) & Report",
    semester: 7,
    phase: "Phase 1 - Sem 7",
    deadlineDescription: "Before Sem 7 Internal Viva",
    description: "Upload 9-part Business Model Canvas sheet and executive summary report.",
    instructions: [
      "Fill Customer Segments, Value Propositions, Revenue Streams, Key Activities.",
      "Upload high-res PDF image of BMC canvas.",
    ],
  },
  {
    key: "PDE_CANVAS",
    title: "Patent Drafting Exercise (PDE) / Canvas",
    semester: 8,
    phase: "Phase 2 - Sem 8",
    deadlineDescription: "Month 2 of Semester 8",
    description: "Prepare patent search reports and draft provisional patent specification.",
    instructions: [
      "Search IPO, USPTO, and Google Patents databases for prior art.",
      "Draft claims and novel patentable aspects.",
    ],
  },
  {
    key: "PSAR_REPORTS",
    title: "Patent Search & Analysis Report (PSAR)",
    semester: 8,
    phase: "Phase 2 - Sem 8",
    deadlineDescription: "Month 3 of Semester 8",
    description: "Each team member must review and analyze 5 published patents related to project domain.",
    instructions: [
      "Analyze patent abstract, claims, and relevance to student project.",
      "Submit 5 individual PSAR forms on PMMS.",
    ],
  },
  {
    key: "PLAGIARISM_REPORT",
    title: "Plagiarism Search Report (URKUND / Turnitin)",
    semester: 8,
    phase: "Phase 2 - Sem 8",
    deadlineDescription: "2 Weeks before Final University Exam",
    description: "Generate official plagiarism report with similarity index strictly below 15%.",
    instructions: [
      "Run final dissertation through institute plagiarism software.",
      "Attach verified certificate signed by Guide & HOD.",
    ],
  },
  {
    key: "FINAL_REPORT",
    title: "Final Project Report Submission & Certificate",
    semester: 8,
    phase: "Phase 2 - Sem 8",
    deadlineDescription: "Before End-Semester University Viva",
    description: "Upload final bound report PDF and download GTU PMMS Completion Certificate.",
    instructions: [
      "Upload complete project report with all chapters, results, and references.",
      "Download GTU generated official completion certificate for external viva.",
    ],
  },
];
