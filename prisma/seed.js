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

  // 2. Comprehensive GTU Question Papers (PYQs) spanning 2026 to 2022
  const popularSubjects = [
    // Sem 1 & 2
    { code: "3110005", name: "Basic Electrical Engineering (BEE)", course: "BE", branch: "Computer Engineering", semester: 1 },
    { code: "3110006", name: "Basic Mechanical Engineering (BME)", course: "BE", branch: "Mechanical Engineering", semester: 1 },
    { code: "3110014", name: "Mathematics - 1 (Calculus)", course: "BE", branch: "Computer Engineering", semester: 1 },
    { code: "3110015", name: "Mathematics - 2 (Vector Calculus & Linear Algebra)", course: "BE", branch: "Computer Engineering", semester: 2 },
    { code: "3110002", name: "English", course: "BE", branch: "Computer Engineering", semester: 1 },
    { code: "3110003", name: "Programming for Problem Solving (PPS)", course: "BE", branch: "Computer Engineering", semester: 2 },
    { code: "3110013", name: "Engineering Graphics & Design (EGD)", course: "BE", branch: "Civil Engineering", semester: 2 },
    { code: "3110016", name: "Basic Electronics", course: "BE", branch: "Electronics & Communication Engineering", semester: 2 },

    // Sem 3
    { code: "3130702", name: "Data Structures (DS)", course: "BE", branch: "Computer Engineering", semester: 3 },
    { code: "3130703", name: "Database Management Systems (DBMS)", course: "BE", branch: "Computer Engineering", semester: 3 },
    { code: "3130704", name: "Digital Fundamentals (DF)", course: "BE", branch: "Computer Engineering", semester: 3 },
    { code: "3130006", name: "Probability and Statistics (P&S)", course: "BE", branch: "Computer Engineering", semester: 3 },
    { code: "3130008", name: "Design Engineering - I A", course: "BE", branch: "Computer Engineering", semester: 3 },
    { code: "3131904", name: "Material Science and Metallurgy", course: "BE", branch: "Mechanical Engineering", semester: 3 },
    { code: "3130606", name: "Geotechnical Engineering", course: "BE", branch: "Civil Engineering", semester: 3 },

    // Sem 4
    { code: "3140702", name: "Operating System (OS)", course: "BE", branch: "Computer Engineering", semester: 4 },
    { code: "3140705", name: "Object Oriented Programming - I (Java)", course: "BE", branch: "Computer Engineering", semester: 4 },
    { code: "3140707", name: "Computer Organization & Architecture (COA)", course: "BE", branch: "Computer Engineering", semester: 4 },
    { code: "3140708", name: "Discrete Mathematics (DM)", course: "BE", branch: "Computer Engineering", semester: 4 },
    { code: "3140709", name: "Principles of Economics and Management (PEM)", course: "BE", branch: "Computer Engineering", semester: 4 },
    { code: "3141901", name: "Fluid Mechanics and Hydraulics", course: "BE", branch: "Mechanical Engineering", semester: 4 },
    { code: "3140603", name: "Structural Analysis", course: "BE", branch: "Civil Engineering", semester: 4 },

    // Sem 5
    { code: "3150703", name: "Analysis and Design of Algorithms (ADA)", course: "BE", branch: "Computer Engineering", semester: 5 },
    { code: "3150710", name: "Computer Networks (CN)", course: "BE", branch: "Computer Engineering", semester: 5 },
    { code: "3150711", name: "Software Engineering (SE)", course: "BE", branch: "Computer Engineering", semester: 5 },
    { code: "3150713", name: "Python for Data Science", course: "BE", branch: "Computer Engineering", semester: 5 },
    { code: "3150709", name: "Professional Ethics", course: "BE", branch: "Computer Engineering", semester: 5 },
    { code: "3151908", name: "Heat Transfer", course: "BE", branch: "Mechanical Engineering", semester: 5 },
    { code: "3150611", name: "Transportation Engineering", course: "BE", branch: "Civil Engineering", semester: 5 },

    // Sem 6
    { code: "3160704", name: "Theory of Computation (TOC)", course: "BE", branch: "Computer Engineering", semester: 6 },
    { code: "3160707", name: "Advanced Java Technology (AJT)", course: "BE", branch: "Computer Engineering", semester: 6 },
    { code: "3160714", name: "Data Mining and Business Intelligence", course: "BE", branch: "Computer Engineering", semester: 6 },
    { code: "3160712", name: "Microprocessor and Interfacing (MPI)", course: "BE", branch: "Computer Engineering", semester: 6 },
    { code: "3161902", name: "Internal Combustion Engines", course: "BE", branch: "Mechanical Engineering", semester: 6 },

    // Sem 7
    { code: "3170701", name: "Information and Network Security (INS)", course: "BE", branch: "Computer Engineering", semester: 7 },
    { code: "3170710", name: "Mobile Application Development (MAD)", course: "BE", branch: "Computer Engineering", semester: 7 },
    { code: "3170716", name: "Artificial Intelligence (AI)", course: "BE", branch: "Computer Engineering", semester: 7 },
    { code: "3170724", name: "Machine Learning (ML)", course: "BE", branch: "Computer Engineering", semester: 7 },

    // Sem 8
    { code: "3180701", name: "Cloud Computing (CC)", course: "BE", branch: "Computer Engineering", semester: 8 },
    { code: "3180703", name: "Big Data Analytics (BDA)", course: "BE", branch: "Computer Engineering", semester: 8 },
    { code: "3180710", name: "Internet of Things (IoT)", course: "BE", branch: "Computer Engineering", semester: 8 },

    // Diploma
    { code: "4330701", name: "Data Structures Using C", course: "Diploma", branch: "Computer Engineering", semester: 3 },
    { code: "4340702", name: "Object Oriented Programming Using C++", course: "Diploma", branch: "Computer Engineering", semester: 4 },
    { code: "4350703", name: "Database Management", course: "Diploma", branch: "Computer Engineering", semester: 5 },
    { code: "4360701", name: "Web Development Using PHP & MySQL", course: "Diploma", branch: "Computer Engineering", semester: 6 },

    // MBA & MCA
    { code: "4519201", name: "Management Information Systems", course: "MBA", branch: "Information Technology & Systems", semester: 1 },
    { code: "4529202", name: "Financial Management", course: "MBA", branch: "Finance", semester: 2 },
    { code: "3610001", name: "Object Oriented Concepts with Java", course: "MCA", branch: "Computer Applications", semester: 1 },
    { code: "3620002", name: "Full Stack Web Development", course: "MCA", branch: "Computer Applications", semester: 2 },
  ];

  const examCycles = [
    { year: 2026, season: "Summer" },
    { year: 2025, season: "Winter" },
    { year: 2025, season: "Summer" },
    { year: 2024, season: "Winter" },
    { year: 2024, season: "Summer" },
    { year: 2023, season: "Winter" },
    { year: 2023, season: "Summer" },
    { year: 2022, season: "Winter" },
  ];

  let papersCount = 0;
  for (const sub of popularSubjects) {
    for (const cycle of examCycles) {
      await prisma.paper.create({
        data: {
          subjectCode: sub.code,
          subjectName: sub.name,
          course: sub.course,
          branch: sub.branch,
          semester: sub.semester,
          examSeason: cycle.season,
          year: cycle.year,
          pdfUrl: `/api/papers/download?subjectCode=${sub.code}&year=${cycle.year}&season=${cycle.season}&course=${sub.course}&sem=${sub.semester}`,
          fileSize: "1.5 MB",
          downloadsCount: Math.floor(250 + Math.random() * 900),
        },
      });
      papersCount++;
    }
  }
  console.log(`✅ Seeded ${papersCount} GTU Previous Question Papers across 2026, 2025, 2024, 2023, 2022`);

  // 3. Seed Realistic GTU Circulars spanning August 2026 with authentic dates
  const circulars = [
    {
      title: "Notification for Result Declaration of Diploma in Engineering Sem-1 (Remedial) of Summer-2026 Examination",
      category: "Examinations",
      publishedDate: new Date("2026-08-25"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/20260825210705_803474.pdf",
      isPinned: true,
      gtuRefNo: "GTU/Result/S2026/8034",
      description: "Official notification for declaration of Diploma Engineering Semester 1 remedial examination results.",
    },
    {
      title: "Notification for result declaration of Diploma in Pharmacy Year-1 (Remedial) Recheck-Reassessment of Summer-2026",
      category: "Examinations",
      publishedDate: new Date("2026-08-25"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/Diploma_in_Pharmacy_Year1_Remedial_Recheck.pdf",
      isPinned: false,
      gtuRefNo: "GTU/Exam/Recheck/2026/739",
      description: "Recheck and reassessment grade notifications for Diploma in Pharmacy students.",
    },
    {
      title: "Extension in Elective Entry for BE, BE (Working Professional) and BVoc Semester-5 & 7 for Academic Year 2026-27",
      category: "Academic",
      publishedDate: new Date("2026-08-25"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/Elective_Entry_Extension_2026.pdf",
      isPinned: true,
      gtuRefNo: "GTU/Acad/Elective/2026/5129",
      description: "Institutes are notified regarding the extended date for online elective subject entry on the GTU admin portal.",
    },
    {
      title: "Notification for Result Declaration of Master of Pharmacy Sem-2 (Regular) of Summer-2026 Examination",
      category: "Examinations",
      publishedDate: new Date("2026-08-25"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/MPharm_Sem2_Result_Declaration.pdf",
      isPinned: false,
      gtuRefNo: "GTU/MPharm/Result/2026/1092",
      description: "Declaration of M.Pharm Sem-2 regular exam results and online mark verification portal open.",
    },
    {
      title: "Specialization & Elective Subject Entry of BBA Semester 5 (Regular) Students for Academic Year 2026-27",
      category: "Academic",
      publishedDate: new Date("2026-08-24"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/BBA_Sem5_Elective_Entry_2026.pdf",
      isPinned: false,
      gtuRefNo: "GTU/Acad/BBA/2026/410",
      description: "Guidelines for elective domain subject choice in Marketing, Finance, and Human Resources for BBA colleges.",
    },
    {
      title: "Notification for result declaration of Bachelor of Engineering Sem-8 (Remedial) of Summer-2026 Examination",
      category: "Examinations",
      publishedDate: new Date("2026-08-24"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/BE_Sem8_Remedial_Summer2026.pdf",
      isPinned: true,
      gtuRefNo: "GTU/Exam/BE8/S2026/8940",
      description: "Final semester BE remedial examination grade sheets published on gturesults.in server.",
    },
    {
      title: "Circular regarding Submission of Academic Audit Report 2025-26 for All GTU Affiliated Engineering Institutes",
      category: "Academic",
      publishedDate: new Date("2026-08-21"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/Academic_Audit_2025_26.pdf",
      isPinned: false,
      gtuRefNo: "GTU/Audit/2026/3012",
      description: "Principals and Academic Coordinators are requested to submit internal quality assurance and audit reports.",
    },
    {
      title: "Post-Metric and Mukhyamantri Yuva Swavalamban Yojana (MYSY) Scholarship Verification Window for 2026-27",
      category: "Scholarships",
      publishedDate: new Date("2026-08-18"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/MYSY_Scholarship_Verification_2026.pdf",
      isPinned: false,
      gtuRefNo: "GTU/StudAffairs/MYSY/2026/784",
      description: "Eligible degree & diploma engineering students can submit application approval documents to institute student section.",
    },
    {
      title: "Mid-Year Conferment of Degree and Diploma Certificates 2026 Examination (Convocation Update)",
      category: "Examinations",
      publishedDate: new Date("2026-08-01"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/MidYear_Conferment_Degree_2026.pdf",
      isPinned: true,
      gtuRefNo: "GTU/Convocation/Mid2026/01",
      description: "Important instructions for students passed in Summer 2026 examinations regarding degree certificate dispatch.",
    },
  ];

  for (const c of circulars) {
    await prisma.circular.create({ data: c });
  }
  console.log(`✅ Seeded ${circulars.length} GTU Circulars with accurate dates`);

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
