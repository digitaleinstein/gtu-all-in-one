const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting GTU All In One complete database seeding...");

  // Clean existing tables
  await prisma.studentResult.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.resultSubscription.deleteMany();
  await prisma.savedPaper.deleteMany();
  await prisma.paper.deleteMany();
  await prisma.circular.deleteMany();
  await prisma.midsemRecord.deleteMany();
  await prisma.pMMSMilestone.deleteMany();
  await prisma.liveResult.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Default Users
  const hashedPassword = await bcrypt.hash("gtu12345", 10);

  const user1 = await prisma.user.create({
    data: {
      name: "Aarav Mehta",
      email: "student@gtu.ac.in",
      password: hashedPassword,
      enrollmentNo: "210120111001",
      course: "BE",
      branch: "Computer Engineering",
      semester: 5,
      college: "028 - L.D. College of Engineering (LDCE), Ahmedabad",
      role: "STUDENT",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Priya Patel",
      email: "priya.patel@gtu.ac.in",
      password: hashedPassword,
      enrollmentNo: "220280116015",
      course: "BE",
      branch: "Information Technology",
      semester: 3,
      college: "007 - Birla Vishvakarma Mahavidyalaya (BVM), V.V. Nagar",
      role: "STUDENT",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Rahul Shah",
      email: "rahul.shah@gtu.ac.in",
      password: hashedPassword,
      enrollmentNo: "200170119042",
      course: "BE",
      branch: "Mechanical Engineering",
      semester: 7,
      college: "017 - Vishwakarma Government Engineering College (VGEC), Chandkheda",
      role: "STUDENT",
    },
  });

  console.log(`✅ Created 3 GTU student accounts (Password for all: gtu12345)`);

  // 2. Comprehensive GTU Question Papers (PYQs)
  const papersData = [
    // Sem 1 & 2
    { subjectCode: "3110005", subjectName: "Basic Electrical Engineering (BEE)", course: "BE", branch: "Computer Engineering", semester: 1, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3110005&year=2024&season=Summer", fileSize: "1.4 MB", downloadsCount: 512 },
    { subjectCode: "3110005", subjectName: "Basic Electrical Engineering (BEE)", course: "BE", branch: "Computer Engineering", semester: 1, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3110005&year=2023&season=Winter", fileSize: "1.2 MB", downloadsCount: 420 },
    { subjectCode: "3110014", subjectName: "Mathematics - 1 (Calculus)", course: "BE", branch: "Computer Engineering", semester: 1, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3110014&year=2024&season=Summer", fileSize: "1.6 MB", downloadsCount: 890 },
    { subjectCode: "3110014", subjectName: "Mathematics - 1 (Calculus)", course: "BE", branch: "Computer Engineering", semester: 1, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3110014&year=2023&season=Winter", fileSize: "1.5 MB", downloadsCount: 760 },
    { subjectCode: "3110002", subjectName: "English", course: "BE", branch: "Computer Engineering", semester: 1, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3110002&year=2024&season=Summer", fileSize: "1.1 MB", downloadsCount: 310 },
    { subjectCode: "3110006", subjectName: "Basic Mechanical Engineering (BME)", course: "BE", branch: "Mechanical Engineering", semester: 1, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3110006&year=2023&season=Winter", fileSize: "1.3 MB", downloadsCount: 450 },
    { subjectCode: "3110003", subjectName: "Programming for Problem Solving (PPS)", course: "BE", branch: "Computer Engineering", semester: 2, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3110003&year=2024&season=Summer", fileSize: "1.7 MB", downloadsCount: 940 },
    { subjectCode: "3110015", subjectName: "Mathematics - 2 (Vector Calculus & Linear Algebra)", course: "BE", branch: "Computer Engineering", semester: 2, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3110015&year=2024&season=Summer", fileSize: "1.5 MB", downloadsCount: 810 },

    // Sem 3
    { subjectCode: "3130702", subjectName: "Data Structures (DS)", course: "BE", branch: "Computer Engineering", semester: 3, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3130702&year=2024&season=Summer", fileSize: "1.5 MB", downloadsCount: 1120 },
    { subjectCode: "3130702", subjectName: "Data Structures (DS)", course: "BE", branch: "Computer Engineering", semester: 3, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3130702&year=2023&season=Winter", fileSize: "1.4 MB", downloadsCount: 980 },
    { subjectCode: "3130703", subjectName: "Database Management Systems (DBMS)", course: "BE", branch: "Computer Engineering", semester: 3, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3130703&year=2024&season=Summer", fileSize: "1.6 MB", downloadsCount: 890 },
    { subjectCode: "3130704", subjectName: "Digital Fundamentals (DF)", course: "BE", branch: "Computer Engineering", semester: 3, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3130704&year=2023&season=Winter", fileSize: "1.2 MB", downloadsCount: 560 },
    { subjectCode: "3130006", subjectName: "Probability and Statistics (P&S)", course: "BE", branch: "Computer Engineering", semester: 3, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3130006&year=2024&season=Summer", fileSize: "1.3 MB", downloadsCount: 470 },
    { subjectCode: "3131904", subjectName: "Material Science and Metallurgy", course: "BE", branch: "Mechanical Engineering", semester: 3, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3131904&year=2024&season=Summer", fileSize: "1.4 MB", downloadsCount: 380 },
    { subjectCode: "3130606", subjectName: "Geotechnical Engineering", course: "BE", branch: "Civil Engineering", semester: 3, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3130606&year=2023&season=Winter", fileSize: "1.3 MB", downloadsCount: 340 },

    // Sem 4
    { subjectCode: "3140702", subjectName: "Operating System (OS)", course: "BE", branch: "Computer Engineering", semester: 4, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3140702&year=2024&season=Summer", fileSize: "1.5 MB", downloadsCount: 780 },
    { subjectCode: "3140705", subjectName: "Object Oriented Programming - I (Java)", course: "BE", branch: "Computer Engineering", semester: 4, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3140705&year=2024&season=Summer", fileSize: "1.8 MB", downloadsCount: 1250 },
    { subjectCode: "3140707", subjectName: "Computer Organization & Architecture (COA)", course: "BE", branch: "Computer Engineering", semester: 4, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3140707&year=2023&season=Winter", fileSize: "1.3 MB", downloadsCount: 620 },
    { subjectCode: "3140708", subjectName: "Discrete Mathematics (DM)", course: "BE", branch: "Computer Engineering", semester: 4, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3140708&year=2024&season=Summer", fileSize: "1.4 MB", downloadsCount: 690 },
    { subjectCode: "3141901", subjectName: "Fluid Mechanics and Hydraulics", course: "BE", branch: "Mechanical Engineering", semester: 4, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3141901&year=2024&season=Summer", fileSize: "1.5 MB", downloadsCount: 410 },
    { subjectCode: "3140603", subjectName: "Structural Analysis", course: "BE", branch: "Civil Engineering", semester: 4, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3140603&year=2024&season=Summer", fileSize: "1.7 MB", downloadsCount: 490 },

    // Sem 5
    { subjectCode: "3150703", subjectName: "Analysis and Design of Algorithms (ADA)", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3150703&year=2024&season=Summer", fileSize: "1.6 MB", downloadsCount: 1450 },
    { subjectCode: "3150703", subjectName: "Analysis and Design of Algorithms (ADA)", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3150703&year=2023&season=Winter", fileSize: "1.5 MB", downloadsCount: 1200 },
    { subjectCode: "3150710", subjectName: "Computer Networks (CN)", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3150710&year=2024&season=Summer", fileSize: "1.4 MB", downloadsCount: 890 },
    { subjectCode: "3150711", subjectName: "Software Engineering (SE)", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3150711&year=2024&season=Summer", fileSize: "1.3 MB", downloadsCount: 710 },
    { subjectCode: "3150713", subjectName: "Python for Data Science", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3150713&year=2024&season=Summer", fileSize: "1.7 MB", downloadsCount: 960 },
    { subjectCode: "3150709", subjectName: "Professional Ethics", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3150709&year=2023&season=Winter", fileSize: "1.0 MB", downloadsCount: 390 },
    { subjectCode: "3151908", subjectName: "Heat Transfer", course: "BE", branch: "Mechanical Engineering", semester: 5, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3151908&year=2024&season=Summer", fileSize: "1.5 MB", downloadsCount: 460 },
    { subjectCode: "3150611", subjectName: "Transportation Engineering", course: "BE", branch: "Civil Engineering", semester: 5, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3150611&year=2023&season=Winter", fileSize: "1.3 MB", downloadsCount: 370 },

    // Sem 6
    { subjectCode: "3160704", subjectName: "Theory of Computation (TOC)", course: "BE", branch: "Computer Engineering", semester: 6, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3160704&year=2024&season=Summer", fileSize: "1.5 MB", downloadsCount: 840 },
    { subjectCode: "3160707", subjectName: "Advanced Java Technology (AJT)", course: "BE", branch: "Computer Engineering", semester: 6, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3160707&year=2024&season=Summer", fileSize: "1.8 MB", downloadsCount: 1100 },
    { subjectCode: "3160714", subjectName: "Data Mining and Business Intelligence", course: "BE", branch: "Computer Engineering", semester: 6, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3160714&year=2023&season=Winter", fileSize: "1.3 MB", downloadsCount: 520 },
    { subjectCode: "3160712", subjectName: "Microprocessor and Interfacing (MPI)", course: "BE", branch: "Computer Engineering", semester: 6, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3160712&year=2024&season=Summer", fileSize: "1.4 MB", downloadsCount: 670 },
    { subjectCode: "3161902", subjectName: "Internal Combustion Engines", course: "BE", branch: "Mechanical Engineering", semester: 6, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3161902&year=2023&season=Winter", fileSize: "1.4 MB", downloadsCount: 420 },

    // Sem 7
    { subjectCode: "3170701", subjectName: "Information and Network Security (INS)", course: "BE", branch: "Computer Engineering", semester: 7, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3170701&year=2024&season=Summer", fileSize: "1.6 MB", downloadsCount: 750 },
    { subjectCode: "3170710", subjectName: "Mobile Application Development (MAD)", course: "BE", branch: "Computer Engineering", semester: 7, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3170710&year=2024&season=Summer", fileSize: "1.7 MB", downloadsCount: 980 },
    { subjectCode: "3170716", subjectName: "Artificial Intelligence (AI)", course: "BE", branch: "Computer Engineering", semester: 7, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3170716&year=2023&season=Winter", fileSize: "1.5 MB", downloadsCount: 890 },
    { subjectCode: "3170724", subjectName: "Machine Learning (ML)", course: "BE", branch: "Computer Engineering", semester: 7, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3170724&year=2024&season=Summer", fileSize: "1.8 MB", downloadsCount: 1120 },

    // Sem 8
    { subjectCode: "3180701", subjectName: "Cloud Computing (CC)", course: "BE", branch: "Computer Engineering", semester: 8, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3180701&year=2024&season=Summer", fileSize: "1.6 MB", downloadsCount: 820 },
    { subjectCode: "3180703", subjectName: "Big Data Analytics (BDA)", course: "BE", branch: "Computer Engineering", semester: 8, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3180703&year=2024&season=Summer", fileSize: "1.5 MB", downloadsCount: 650 },
    { subjectCode: "3180710", subjectName: "Internet of Things (IoT)", course: "BE", branch: "Computer Engineering", semester: 8, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=3180710&year=2023&season=Winter", fileSize: "1.4 MB", downloadsCount: 590 },

    // Diploma
    { subjectCode: "4330701", subjectName: "Data Structures Using C", course: "Diploma", branch: "Computer Engineering", semester: 3, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=4330701&year=2024&season=Summer", fileSize: "1.3 MB", downloadsCount: 460 },
    { subjectCode: "4340702", subjectName: "Object Oriented Programming Using C++", course: "Diploma", branch: "Computer Engineering", semester: 4, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=4340702&year=2024&season=Summer", fileSize: "1.4 MB", downloadsCount: 520 },
    { subjectCode: "4350703", subjectName: "Database Management", course: "Diploma", branch: "Computer Engineering", semester: 5, examSeason: "Winter", year: 2023, pdfUrl: "/api/papers/download?subjectCode=4350703&year=2023&season=Winter", fileSize: "1.3 MB", downloadsCount: 480 },

    // MBA & MCA
    { code: "4519201", subjectCode: "4519201", subjectName: "Management Information Systems", course: "MBA", branch: "Information Technology & Systems", semester: 1, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=4519201&year=2024&season=Summer", fileSize: "1.2 MB", downloadsCount: 320 },
    { code: "3610001", subjectCode: "3610001", subjectName: "Object Oriented Concepts with Java", course: "MCA", branch: "Computer Applications", semester: 1, examSeason: "Summer", year: 2024, pdfUrl: "/api/papers/download?subjectCode=3610001&year=2024&season=Summer", fileSize: "1.5 MB", downloadsCount: 410 },
  ];

  for (const paper of papersData) {
    const { code, ...validPaper } = paper;
    await prisma.paper.create({ data: validPaper });
  }
  console.log(`✅ Seeded ${papersData.length} GTU Previous Question Papers with dynamic downloadable links`);

  // 3. Seed GTU Circulars
  const circulars = [
    {
      title: "Tentative Academic Calendar for Academic Year 2024-25 for All UG & PG Courses",
      category: "Academic",
      publishedDate: new Date("2024-10-15"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/Academic_Calendar_2024_25.pdf",
      isPinned: true,
      gtuRefNo: "GTU/Acad/Cal/2024/7821",
      description: "Detailed schedule for term commencement, mid-semester exams, project submissions, and end-semester university examinations.",
    },
    {
      title: "Important Instructions regarding BE Sem 5, 7 Regular & Remedial Winter 2024 Theory Exam Time Table",
      category: "Examinations",
      publishedDate: new Date("2024-11-02"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/BE_Sem_5_7_Winter_2024.pdf",
      isPinned: true,
      gtuRefNo: "GTU/Exam/W2024/8912",
      description: "All examination centers and students are requested to review updated timetable slots and reporting guidelines.",
    },
    {
      title: "Schedule of Practical & Viva Examinations for BE, B.Pharm, and Diploma Sem 3 to 8 (Winter 2024)",
      category: "Timetables",
      publishedDate: new Date("2024-11-10"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/Practical_Viva_Schedule_W24.pdf",
      isPinned: false,
      gtuRefNo: "GTU/Practical/W24/9103",
      description: "External examiner allocation and deadline for internal marks submission on the GTU admin portal.",
    },
    {
      title: "Post-Metric and Mukhyamantri Yuva Swavalamban Yojana (MYSY) Scholarship Verification Window Open",
      category: "Scholarships",
      publishedDate: new Date("2024-10-28"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/MYSY_Scholarship_2024.pdf",
      isPinned: false,
      gtuRefNo: "GTU/StudAffairs/MYSY/2024/654",
      description: "Eligible diploma and degree engineering students can submit application approval documents to student section.",
    },
    {
      title: "PMMS 2024-25: Mandatory Registration and Phase 1 Milestone Deadlines for Final Year B.E. Students",
      category: "Academic",
      publishedDate: new Date("2024-09-20"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/PMMS_Circular_2024_25.pdf",
      isPinned: true,
      gtuRefNo: "GTU/Innovation/PMMS/2024/5012",
      description: "Guidance on team creation, internal guide tagging, Periodic Progress Reports (PPR), and canvas sheet uploads.",
    },
  ];

  for (const c of circulars) {
    await prisma.circular.create({ data: c });
  }

  // 4. Seed Live Declared Results
  const liveResults = [
    {
      examTitle: "BE SEM 6 - Regular (MAY 2024) Exam Result",
      examCode: "BE_SEM6_REG_S2024",
      declaredDate: new Date("2024-07-28"),
      course: "BE",
      semester: 6,
      branch: "Computer Engineering",
      session: "Summer 2024",
      resultUrl: "https://result.gtu.ac.in/Default.aspx",
    },
    {
      examTitle: "BE SEM 4 - Regular & Remedial (JUN 2024) Exam Result",
      examCode: "BE_SEM4_REG_S2024",
      declaredDate: new Date("2024-08-15"),
      course: "BE",
      semester: 4,
      branch: "Computer Engineering",
      session: "Summer 2024",
      resultUrl: "https://result.gtu.ac.in/Default.aspx",
    },
    {
      examTitle: "BE SEM 5 - Regular & Remedial (DEC 2024) Exam Result",
      examCode: "BE_SEM5_REG_W2024",
      declaredDate: new Date("2025-02-15"),
      course: "BE",
      semester: 5,
      branch: "Computer Engineering",
      session: "Winter 2024",
      resultUrl: "https://result.gtu.ac.in/Default.aspx",
    },
    {
      examTitle: "Diploma Engg SEM 6 - Regular (MAY 2024) Exam Result",
      examCode: "DI_SEM6_REG_S2024",
      declaredDate: new Date("2024-07-20"),
      course: "Diploma",
      semester: 6,
      session: "Summer 2024",
      resultUrl: "https://result.gtu.ac.in/Default.aspx",
    },
  ];

  for (const r of liveResults) {
    await prisma.liveResult.create({ data: r });
  }

  // 5. Seed Complete Semester-by-Semester GTU Results History for User 1 (Sem 1 to Sem 5)
  const user1Results = [
    {
      semester: 1,
      examSession: "Winter 2021",
      spi: 9.15,
      cpi: 9.15,
      cgpa: 9.15,
      totalCredits: 22,
      earnedCredits: 22,
      resultStatus: "PASS",
      subjectsJson: JSON.stringify([
        { code: "3110005", name: "Basic Electrical Engineering", theoryE: "58/70", theoryM: "27/30", practicalE: "45/50", practicalM: "19/20", grade: "AA", gradePoints: 10, credits: 4 },
        { code: "3110014", name: "Mathematics - 1 (Calculus)", theoryE: "54/70", theoryM: "26/30", practicalE: "--", practicalM: "--", grade: "AB", gradePoints: 9, credits: 4 },
        { code: "3110002", name: "English", theoryE: "56/70", theoryM: "27/30", practicalE: "42/50", practicalM: "18/20", grade: "AA", gradePoints: 10, credits: 2 },
        { code: "3110006", name: "Basic Mechanical Engineering", theoryE: "50/70", theoryM: "23/30", practicalE: "40/50", practicalM: "17/20", grade: "AB", gradePoints: 9, credits: 4 },
        { code: "3110003", name: "Programming for Problem Solving", theoryE: "62/70", theoryM: "28/30", practicalE: "48/50", practicalM: "19/20", grade: "AA", gradePoints: 10, credits: 5 },
        { code: "3110018", name: "Physics", theoryE: "52/70", theoryM: "24/30", practicalE: "44/50", practicalM: "18/20", grade: "AB", gradePoints: 9, credits: 3 },
      ]),
    },
    {
      semester: 2,
      examSession: "Summer 2022",
      spi: 8.86,
      cpi: 9.00,
      cgpa: 9.00,
      totalCredits: 22,
      earnedCredits: 22,
      resultStatus: "PASS",
      subjectsJson: JSON.stringify([
        { code: "3110015", name: "Mathematics - 2", theoryE: "52/70", theoryM: "24/30", practicalE: "--", practicalM: "--", grade: "AB", gradePoints: 9, credits: 4 },
        { code: "3110007", name: "Environmental Sciences", theoryE: "46/70", theoryM: "22/30", practicalE: "--", practicalM: "--", grade: "BB", gradePoints: 8, credits: 2 },
        { code: "3110016", name: "Basic Electronics", theoryE: "56/70", theoryM: "26/30", practicalE: "44/50", practicalM: "18/20", grade: "AA", gradePoints: 10, credits: 4 },
        { code: "3110013", name: "Engineering Graphics & Design", theoryE: "58/70", theoryM: "27/30", practicalE: "46/50", practicalM: "19/20", grade: "AA", gradePoints: 10, credits: 4 },
        { code: "3110001", name: "Chemistry", theoryE: "48/70", theoryM: "23/30", practicalE: "42/50", practicalM: "17/20", grade: "AB", gradePoints: 9, credits: 4 },
      ]),
    },
    {
      semester: 3,
      examSession: "Winter 2022",
      spi: 8.95,
      cpi: 8.98,
      cgpa: 8.98,
      totalCredits: 21,
      earnedCredits: 21,
      resultStatus: "PASS",
      subjectsJson: JSON.stringify([
        { code: "3130702", name: "Data Structures", theoryE: "59/70", theoryM: "28/30", practicalE: "46/50", practicalM: "19/20", grade: "AA", gradePoints: 10, credits: 5 },
        { code: "3130703", name: "Database Management Systems", theoryE: "53/70", theoryM: "25/30", practicalE: "44/50", practicalM: "18/20", grade: "AB", gradePoints: 9, credits: 5 },
        { code: "3130704", name: "Digital Fundamentals", theoryE: "50/70", theoryM: "24/30", practicalE: "42/50", practicalM: "17/20", grade: "AB", gradePoints: 9, credits: 4 },
        { code: "3130006", name: "Probability and Statistics", theoryE: "48/70", theoryM: "22/30", practicalE: "--", practicalM: "--", grade: "BB", gradePoints: 8, credits: 4 },
        { code: "3130008", name: "Design Engineering - I A", theoryE: "--", theoryM: "--", practicalE: "46/50", practicalM: "45/50", grade: "AA", gradePoints: 10, credits: 3 },
      ]),
    },
    {
      semester: 4,
      examSession: "Summer 2023",
      spi: 8.81,
      cpi: 8.94,
      cgpa: 8.94,
      totalCredits: 23,
      earnedCredits: 23,
      resultStatus: "PASS",
      subjectsJson: JSON.stringify([
        { code: "3140702", name: "Operating System", theoryE: "55/70", theoryM: "26/30", practicalE: "44/50", practicalM: "18/20", grade: "AA", gradePoints: 10, credits: 4 },
        { code: "3140705", name: "Object Oriented Programming - I (Java)", theoryE: "60/70", theoryM: "28/30", practicalE: "47/50", practicalM: "19/20", grade: "AA", gradePoints: 10, credits: 5 },
        { code: "3140707", name: "Computer Organization & Architecture", theoryE: "50/70", theoryM: "23/30", practicalE: "42/50", practicalM: "17/20", grade: "AB", gradePoints: 9, credits: 4 },
        { code: "3140708", name: "Discrete Mathematics", theoryE: "52/70", theoryM: "25/30", practicalE: "--", practicalM: "--", grade: "AB", gradePoints: 9, credits: 4 },
        { code: "3140709", name: "Principles of Economics and Management", theoryE: "45/70", theoryM: "21/30", practicalE: "--", practicalM: "--", grade: "BB", gradePoints: 8, credits: 3 },
        { code: "3140005", name: "Design Engineering - I B", theoryE: "--", theoryM: "--", practicalE: "45/50", practicalM: "44/50", grade: "AA", gradePoints: 10, credits: 3 },
      ]),
    },
    {
      semester: 5,
      examSession: "Winter 2023",
      spi: 9.09,
      cpi: 8.97,
      cgpa: 8.97,
      totalCredits: 22,
      earnedCredits: 22,
      resultStatus: "PASS",
      subjectsJson: JSON.stringify([
        { code: "3150703", name: "Analysis and Design of Algorithms", theoryE: "61/70", theoryM: "28/30", practicalE: "47/50", practicalM: "19/20", grade: "AA", gradePoints: 10, credits: 5 },
        { code: "3150710", name: "Computer Networks", theoryE: "53/70", theoryM: "25/30", practicalE: "43/50", practicalM: "18/20", grade: "AB", gradePoints: 9, credits: 5 },
        { code: "3150711", name: "Software Engineering", theoryE: "57/70", theoryM: "27/30", practicalE: "46/50", practicalM: "19/20", grade: "AA", gradePoints: 10, credits: 4 },
        { code: "3150713", name: "Python for Data Science", theoryE: "62/70", theoryM: "29/30", practicalE: "48/50", practicalM: "20/20", grade: "AA", gradePoints: 10, credits: 4 },
        { code: "3150709", name: "Professional Ethics", theoryE: "50/70", theoryM: "24/30", practicalE: "--", practicalM: "--", grade: "AB", gradePoints: 9, credits: 3 },
        { code: "3150005", name: "Integrated Personality Development Course", theoryE: "--", theoryM: "--", practicalE: "46/50", practicalM: "45/50", grade: "AA", gradePoints: 10, credits: 1 },
      ]),
    },
  ];

  for (const res of user1Results) {
    await prisma.studentResult.create({
      data: {
        userId: user1.id,
        enrollmentNo: user1.enrollmentNo,
        ...res,
      },
    });
  }
  console.log(`✅ Seeded 5 Semesters of GTU Result Transcripts for student`);

  // 6. Seed In-app Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: user1.id,
        title: "🎉 GTU Result Transcript Synced",
        message: "Your official semester transcripts (Sem 1 to Sem 5) have been verified and saved to your profile.",
        type: "RESULT",
        link: "/profile",
        isRead: false,
      },
      {
        userId: user1.id,
        title: "⚡ Winter 2024 Exam Timetable Released",
        message: "GTU has announced the final exam timetable for BE Sem 5. Check Papers Hub & Circulars.",
        type: "EXAM",
        link: "/circulars",
        isRead: false,
      },
      {
        userId: user1.id,
        title: "📌 PMMS Phase 1 Milestone Alert",
        message: "Reminder: Periodic Progress Report 1 (PPR-1) deadline is approaching. Update your submission status.",
        type: "ACADEMIC",
        link: "/pmms",
        isRead: false,
      },
    ],
  });

  // 7. Seed Midsem Marks for User 1
  const midsemSubjects = [
    { subjectCode: "3150703", subjectName: "Analysis and Design of Algorithms (ADA)", credits: 5, midsemMarks: 27, totalMidsemMarks: 30, internalMarks: 18, totalInternalMarks: 20, practicalMarks: 45, totalPracticalMarks: 50, targetGrade: "AA" },
    { subjectCode: "3150710", subjectName: "Computer Networks (CN)", credits: 5, midsemMarks: 24, totalMidsemMarks: 30, internalMarks: 17, totalInternalMarks: 20, practicalMarks: 42, totalPracticalMarks: 50, targetGrade: "AB" },
    { subjectCode: "3150711", subjectName: "Software Engineering (SE)", credits: 4, midsemMarks: 26, totalMidsemMarks: 30, internalMarks: 19, totalInternalMarks: 20, practicalMarks: 46, totalPracticalMarks: 50, targetGrade: "AA" },
    { subjectCode: "3150713", subjectName: "Python for Data Science", credits: 4, midsemMarks: 28, totalMidsemMarks: 30, internalMarks: 19, totalInternalMarks: 20, practicalMarks: 48, totalPracticalMarks: 50, targetGrade: "AA" },
    { subjectCode: "3150709", subjectName: "Professional Ethics", credits: 3, midsemMarks: 23, totalMidsemMarks: 30, internalMarks: 16, totalInternalMarks: 20, practicalMarks: 0, totalPracticalMarks: 0, targetGrade: "AB" },
  ];

  for (const s of midsemSubjects) {
    await prisma.midsemRecord.create({
      data: {
        userId: user1.id,
        semester: 5,
        ...s,
      },
    });
  }

  // 8. Seed PMMS Milestones
  const pmmsMilestones = [
    { milestoneKey: "team_reg", title: "Team Formation & Project Title Registration", phase: "Phase 1 (Sem 7)", isCompleted: true, notes: "Formed 4-member team 'NeuralCraft', submitted IoT & AI smart campus project title.", completedAt: new Date("2024-09-10") },
    { milestoneKey: "guide_allocation", title: "Internal Guide Mapping & Approval", phase: "Phase 1 (Sem 7)", isCompleted: true, notes: "Mapped to Prof. K. R. Sharma (HOD CE Dept). Guide approved synopsis.", completedAt: new Date("2024-09-18") },
    { milestoneKey: "ppr_1", title: "Periodic Progress Report 1 (PPR-1)", phase: "Phase 1 (Sem 7)", isCompleted: true, notes: "Reviewed 12 research papers on Edge AI & MQTT protocols.", completedAt: new Date("2024-10-02") },
    { milestoneKey: "canvas_aeiou", title: "Design Engineering: AEIOU Canvas", phase: "Phase 1 (Sem 7)", isCompleted: false, notes: "Drafting user interactions and campus parking zone environment mappings." },
    { milestoneKey: "canvas_empathy", title: "Design Engineering: Empathy & Ideation", phase: "Phase 1 (Sem 7)", isCompleted: false, notes: "Scheduled student user interviews." },
    { milestoneKey: "psar_report", title: "Patent Search and Analysis Report (PSAR)", phase: "Phase 1 (Sem 7)", isCompleted: false, notes: "Need to search 5 IPO patent claims." },
    { milestoneKey: "final_report", title: "Final Project Report & PMMS Certificate", phase: "Phase 2 (Sem 8)", isCompleted: false, notes: "Pending Semester 8 implementation." },
  ];

  for (const m of pmmsMilestones) {
    await prisma.pMMSMilestone.create({
      data: {
        userId: user1.id,
        ...m,
      },
    });
  }

  console.log("🎉 GTU All In One complete database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
