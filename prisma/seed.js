const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting GTU All In One database seeding...");

  // Clean existing tables
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
      college: "L.D. College of Engineering (028), Ahmedabad",
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
      college: "Birla Vishvakarma Mahavidyalaya (007), V.V. Nagar",
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
      college: "Vishwakarma Government Engineering College (017), Chandkheda",
      role: "STUDENT",
    },
  });

  console.log(`✅ Created 3 GTU student accounts (Password for all: gtu12345)`);

  // 2. Seed GTU Question Papers (PYQs)
  const papersData = [
    // Sem 5 CE
    { subjectCode: "3150703", subjectName: "Analysis and Design of Algorithms (ADA)", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3150703.pdf", fileSize: "1.4 MB", downloadsCount: 342 },
    { subjectCode: "3150703", subjectName: "Analysis and Design of Algorithms (ADA)", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Winter", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Winter2023/3150703.pdf", fileSize: "1.2 MB", downloadsCount: 512 },
    { subjectCode: "3150703", subjectName: "Analysis and Design of Algorithms (ADA)", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Summer", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2023/3150703.pdf", fileSize: "1.1 MB", downloadsCount: 289 },
    { subjectCode: "3150710", subjectName: "Computer Networks (CN)", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3150710.pdf", fileSize: "1.3 MB", downloadsCount: 420 },
    { subjectCode: "3150710", subjectName: "Computer Networks (CN)", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Winter", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Winter2023/3150710.pdf", fileSize: "1.5 MB", downloadsCount: 395 },
    { subjectCode: "3150711", subjectName: "Software Engineering (SE)", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3150711.pdf", fileSize: "1.0 MB", downloadsCount: 260 },
    { subjectCode: "3150711", subjectName: "Software Engineering (SE)", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Winter", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Winter2023/3150711.pdf", fileSize: "1.2 MB", downloadsCount: 310 },
    { subjectCode: "3150713", subjectName: "Python for Data Science", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3150713.pdf", fileSize: "1.6 MB", downloadsCount: 480 },
    { subjectCode: "3150709", subjectName: "Professional Ethics", course: "BE", branch: "Computer Engineering", semester: 5, examSeason: "Winter", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Winter2023/3150709.pdf", fileSize: "0.9 MB", downloadsCount: 190 },

    // Sem 3 CE
    { subjectCode: "3130702", subjectName: "Data Structures (DS)", course: "BE", branch: "Computer Engineering", semester: 3, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3130702.pdf", fileSize: "1.3 MB", downloadsCount: 650 },
    { subjectCode: "3130702", subjectName: "Data Structures (DS)", course: "BE", branch: "Computer Engineering", semester: 3, examSeason: "Winter", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Winter2023/3130702.pdf", fileSize: "1.4 MB", downloadsCount: 780 },
    { subjectCode: "3130703", subjectName: "Database Management Systems (DBMS)", course: "BE", branch: "Computer Engineering", semester: 3, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3130703.pdf", fileSize: "1.5 MB", downloadsCount: 590 },
    { subjectCode: "3130704", subjectName: "Digital Fundamentals (DF)", course: "BE", branch: "Computer Engineering", semester: 3, examSeason: "Winter", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Winter2023/3130704.pdf", fileSize: "1.1 MB", downloadsCount: 340 },

    // Sem 4 CE
    { subjectCode: "3140702", subjectName: "Operating System (OS)", course: "BE", branch: "Computer Engineering", semester: 4, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3140702.pdf", fileSize: "1.4 MB", downloadsCount: 510 },
    { subjectCode: "3140705", subjectName: "Object Oriented Programming - I (Java)", course: "BE", branch: "Computer Engineering", semester: 4, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3140705.pdf", fileSize: "1.7 MB", downloadsCount: 820 },
    { subjectCode: "3140708", subjectName: "Discrete Mathematics", course: "BE", branch: "Computer Engineering", semester: 4, examSeason: "Winter", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Winter2023/3140708.pdf", fileSize: "1.2 MB", downloadsCount: 430 },

    // Sem 6 CE
    { subjectCode: "3160704", subjectName: "Theory of Computation (TOC)", course: "BE", branch: "Computer Engineering", semester: 6, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3160704.pdf", fileSize: "1.3 MB", downloadsCount: 460 },
    { subjectCode: "3160707", subjectName: "Advanced Java Technology (AJT)", course: "BE", branch: "Computer Engineering", semester: 6, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3160707.pdf", fileSize: "1.6 MB", downloadsCount: 610 },
    { subjectCode: "3160714", subjectName: "Data Mining and Business Intelligence", course: "BE", branch: "Computer Engineering", semester: 6, examSeason: "Winter", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Winter2023/3160714.pdf", fileSize: "1.2 MB", downloadsCount: 320 },

    // Sem 7 CE
    { subjectCode: "3170701", subjectName: "Information and Network Security (INS)", course: "BE", branch: "Computer Engineering", semester: 7, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3170701.pdf", fileSize: "1.5 MB", downloadsCount: 380 },
    { subjectCode: "3170710", subjectName: "Mobile Application Development (MAD)", course: "BE", branch: "Computer Engineering", semester: 7, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3170710.pdf", fileSize: "1.4 MB", downloadsCount: 520 },
    { subjectCode: "3170716", subjectName: "Artificial Intelligence (AI)", course: "BE", branch: "Computer Engineering", semester: 7, examSeason: "Winter", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Winter2023/3170716.pdf", fileSize: "1.3 MB", downloadsCount: 490 },

    // Sem 8 CE
    { subjectCode: "3180701", subjectName: "Cloud Computing", course: "BE", branch: "Computer Engineering", semester: 8, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3180701.pdf", fileSize: "1.4 MB", downloadsCount: 410 },
    { subjectCode: "3180703", subjectName: "Big Data Analytics", course: "BE", branch: "Computer Engineering", semester: 8, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3180703.pdf", fileSize: "1.3 MB", downloadsCount: 350 },

    // Mechanical
    { subjectCode: "3151908", subjectName: "Heat Transfer", course: "BE", branch: "Mechanical Engineering", semester: 5, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3151908.pdf", fileSize: "1.5 MB", downloadsCount: 270 },
    { subjectCode: "3161902", subjectName: "Internal Combustion Engines", course: "BE", branch: "Mechanical Engineering", semester: 6, examSeason: "Winter", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Winter2023/3161902.pdf", fileSize: "1.4 MB", downloadsCount: 310 },

    // Civil
    { subjectCode: "3140603", subjectName: "Structural Analysis", course: "BE", branch: "Civil Engineering", semester: 4, examSeason: "Summer", year: 2024, pdfUrl: "https://www.gtu.ac.in/uploads/Summer2024/3140603.pdf", fileSize: "1.8 MB", downloadsCount: 430 },
    { subjectCode: "3150611", subjectName: "Transportation Engineering", course: "BE", branch: "Civil Engineering", semester: 5, examSeason: "Winter", year: 2023, pdfUrl: "https://www.gtu.ac.in/uploads/Winter2023/3150611.pdf", fileSize: "1.3 MB", downloadsCount: 290 },
  ];

  for (const paper of papersData) {
    await prisma.paper.create({ data: paper });
  }
  console.log(`✅ Seeded ${papersData.length} GTU Previous Question Papers`);

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
    {
      title: "Re-checking and Re-assessment Result Notification for Summer 2024 Examination Session",
      category: "Examinations",
      publishedDate: new Date("2024-10-05"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/Recheck_Results_Summer2024.pdf",
      isPinned: false,
      gtuRefNo: "GTU/Exam/Recheck/S24/4419",
      description: "List of students with revised grades after re-assessment for BE Sem 4 and Sem 6.",
    },
    {
      title: "Guidelines for 100 Activity Points for B.E. Students Admitted in 2021 & onwards",
      category: "General",
      publishedDate: new Date("2024-08-14"),
      pdfUrl: "https://s3-ap-southeast-1.amazonaws.com/gtusitecirculars/uploads/100_Activity_Points_Rules.pdf",
      isPinned: false,
      gtuRefNo: "GTU/100_Points/2024/318",
      description: "Detailed category-wise points breakdown for NSS, sports, tech fests, MOOCs, and cultural activities.",
    },
  ];

  for (const c of circulars) {
    await prisma.circular.create({ data: c });
  }
  console.log(`✅ Seeded ${circulars.length} GTU official circulars`);

  // 4. Seed Live Results
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
      examTitle: "Diploma Engg SEM 6 - Regular (MAY 2024) Exam Result",
      examCode: "DI_SEM6_REG_S2024",
      declaredDate: new Date("2024-07-20"),
      course: "Diploma",
      semester: 6,
      session: "Summer 2024",
      resultUrl: "https://result.gtu.ac.in/Default.aspx",
    },
    {
      examTitle: "BE SEM 8 - Regular (MAY 2024) Final Degree Result",
      examCode: "BE_SEM8_REG_S2024",
      declaredDate: new Date("2024-06-30"),
      course: "BE",
      semester: 8,
      session: "Summer 2024",
      resultUrl: "https://result.gtu.ac.in/Default.aspx",
    },
  ];

  for (const r of liveResults) {
    await prisma.liveResult.create({ data: r });
  }
  console.log(`✅ Seeded ${liveResults.length} GTU declared results`);

  // 5. Seed Subscriptions for User 1
  await prisma.resultSubscription.create({
    data: {
      userId: user1.id,
      enrollmentNo: user1.enrollmentNo,
      course: "BE",
      branch: "Computer Engineering",
      semester: 5,
      examSession: "Winter 2024",
      examType: "Regular",
      emailAlerts: true,
      pushAlerts: true,
      isActive: true,
    },
  });

  // 6. Seed In-app Notifications for User 1
  await prisma.notification.createMany({
    data: [
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
      {
        userId: user1.id,
        title: "🎉 Welcome to GTU All In One",
        message: "Your student dashboard has been configured with Semester 5 Computer Engineering syllabus & trackers.",
        type: "INFO",
        link: "/profile",
        isRead: true,
      },
    ],
  });

  // 7. Seed Midsem Marks for User 1 (Semester 5)
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
  console.log(`✅ Seeded Midsem marks for Semester 5 student`);

  // 8. Seed PMMS Milestones for User 1
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
  console.log(`✅ Seeded PMMS Milestones and progress checklist`);

  console.log("🎉 GTU All In One database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
