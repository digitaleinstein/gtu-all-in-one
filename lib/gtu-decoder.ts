export interface DecodedGTUProfile {
  enrollmentNo: string;
  admissionYear: number;
  collegeCode: string;
  collegeName: string;
  courseCode: string;
  courseName: string;
  courseType: string; // "Regular" | "D2D (Diploma to Degree)" | "C2D"
  branchCode: string;
  branchName: string;
  rollNumber: string;
  estimatedSemester: number;
  isValid: boolean;
  message?: string;
}

export const GTU_COLLEGES_MAP: Record<string, string> = {
  "001": "001 - A.D. Patel Institute of Technology (ADIT), New V.V. Nagar",
  "002": "002 - Ahmedabad Institute of Technology (AIT), Gota, Ahmedabad",
  "003": "003 - Atmiya Institute of Technology & Science, Rajkot",
  "004": "004 - B.H. Gardi College of Engineering & Technology, Rajkot",
  "006": "006 - Bhagwan Mahavir College of Engineering & Technology, Surat",
  "007": "007 - Birla Vishvakarma Mahavidyalaya (BVM), Vallabh Vidyanagar",
  "008": "008 - Birla Vishvakarma Mahavidyalaya (SFI), V.V. Nagar",
  "011": "011 - G.H. Patel College of Engineering & Technology (GCET), V.V. Nagar",
  "012": "012 - Gandhinagar Institute of Technology (GIT), Gandhinagar",
  "013": "013 - Government Engineering College (GEC), Bharuch",
  "014": "014 - Government Engineering College (GEC), Bhavnagar",
  "015": "015 - Government Engineering College (GEC), Bhuj",
  "016": "016 - Government Engineering College (GEC), Modasa",
  "017": "017 - Vishwakarma Government Engineering College (VGEC), Chandkheda, Ahmedabad",
  "018": "018 - Government Engineering College (GEC), Dahod",
  "019": "019 - Government Engineering College (GEC), Godhra",
  "020": "020 - Government Engineering College (GEC), Rajkot",
  "021": "021 - Government Engineering College (GEC), Surat",
  "022": "022 - Government Engineering College (GEC), Patan",
  "023": "023 - Dr. S. & S. S. Ghandhy Government Engineering College, Surat",
  "024": "024 - Government Engineering College (GEC), Valsad",
  "025": "025 - Government Engineering College (GEC), Gandhinagar (Sector 28)",
  "026": "026 - Government Engineering College (GEC), Himatnagar",
  "028": "028 - L.D. College of Engineering (LDCE), Navrangpura, Ahmedabad",
  "031": "031 - Lukhdhirji Engineering College (LE College), Morbi",
  "032": "032 - Marwadi Education Foundation Group of Institutions, Rajkot",
  "033": "033 - Merchant Engineering College, Basna, Mehsana",
  "034": "034 - Narnarayan Shastri Institute of Technology (NSIT), Jetalpur",
  "036": "036 - Patel College of Engineering, Mehsana",
  "041": "041 - Sardar Vallabhbhai Patel Institute of Technology (SVIT), Vasad",
  "042": "042 - Sarvajanik College of Engineering & Technology (SCET), Surat",
  "043": "043 - Shantilal Shah Engineering College (SSEC), Sidsar, Bhavnagar",
  "044": "044 - C.K. Pithawalla College of Engineering & Technology, Surat",
  "045": "045 - Shri S'ad Vidya Mandal Institute of Technology (SVMIT), Bharuch",
  "047": "047 - V.V.P. Engineering College, Rajkot",
  "048": "048 - Valia Institute of Technology, Valia, Bharuch",
  "049": "049 - Vidyabharti Trust College of Engineering, Umrakh, Bardoli",
  "050": "050 - Sigma Institute of Engineering, Bakrol, Vadodara",
  "067": "067 - SAL Institute of Technology & Engineering Research, Ahmedabad",
  "077": "077 - Silver Oak College of Engineering & Technology, Gota, Ahmedabad",
  "080": "080 - Vadodara Institute of Engineering, Kotambi, Vadodara",
  "095": "095 - Institute of Technology & Management (ITM Universe), Jarod, Vadodara",
  "103": "103 - Om Engineering College, Junagadh",
  "112": "112 - Pacific School of Engineering, Surat",
  "116": "116 - Marwadi University Faculty of Engineering, Rajkot",
  "120": "120 - Indus Institute of Technology & Engineering, Ahmedabad",
};

export const GTU_PROGRAMS_MAP: Record<string, { code: string; name: string; type: string }> = {
  "01": { code: "BE", name: "Bachelor of Engineering (B.E.)", type: "Regular" },
  "31": { code: "BE", name: "Bachelor of Engineering (B.E. D2D)", type: "D2D (Diploma to Degree)" },
  "02": { code: "Diploma", name: "Diploma Engineering", type: "Regular" },
  "32": { code: "Diploma", name: "Diploma Engineering (C2D)", type: "C2D (Certificate to Diploma)" },
  "04": { code: "ME", name: "Master of Engineering (M.E.)", type: "Post Graduate" },
  "05": { code: "MBA", name: "Master of Business Administration (MBA)", type: "Post Graduate" },
  "06": { code: "MCA", name: "Master of Computer Applications (MCA)", type: "Post Graduate" },
  "08": { code: "B.Pharm", name: "Bachelor of Pharmacy (B.Pharm)", type: "Regular" },
  "09": { code: "M.Pharm", name: "Master of Pharmacy (M.Pharm)", type: "Post Graduate" },
  "50": { code: "Integrated MSc", name: "Integrated M.Sc / MCA", type: "Integrated" },
};

export const GTU_BRANCHES_MAP: Record<string, string> = {
  "07": "Computer Engineering",
  "16": "Information Technology",
  "31": "Artificial Intelligence and Data Science",
  "32": "Computer Science & Engineering (AI / ML)",
  "02": "Automobile Engineering",
  "03": "Biomedical Engineering",
  "05": "Chemical Engineering",
  "06": "Civil Engineering",
  "09": "Electrical Engineering",
  "11": "Electronics & Communication Engineering",
  "17": "Environmental Engineering",
  "19": "Mechanical Engineering",
  "20": "Mechatronics Engineering",
  "24": "Power Electronics",
  "29": "Textile Technology",
  "41": "Robotics & Automation",
};

/**
 * Decodes a 12-digit GTU Enrollment Number into official student profile details
 */
export function decodeGTUEnrollment(enrollmentInput: string): DecodedGTUProfile {
  const enrollment = enrollmentInput.replace(/\D/g, "").trim();

  if (enrollment.length < 11) {
    return {
      enrollmentNo: enrollment,
      admissionYear: 2022,
      collegeCode: "028",
      collegeName: "028 - L.D. College of Engineering, Ahmedabad",
      courseCode: "BE",
      courseName: "Bachelor of Engineering (B.E.)",
      courseType: "Regular",
      branchCode: "07",
      branchName: "Computer Engineering",
      rollNumber: "001",
      estimatedSemester: 5,
      isValid: false,
      message: "Please enter a valid 12-digit GTU Enrollment Number (e.g. 210120111001)",
    };
  }

  // Format: YY (2) + III (3) + CC (2) + BB (2) + RRR (2 or 3)
  const yy = enrollment.substring(0, 2);
  const iii = enrollment.substring(2, 5);
  const cc = enrollment.substring(5, 7);
  const bb = enrollment.substring(7, 9);
  const rrr = enrollment.substring(9);

  const admissionYear = 2000 + parseInt(yy, 10);
  const collegeName = GTU_COLLEGES_MAP[iii] || `${iii} - GTU Affiliated Engineering Institute`;
  const program = GTU_PROGRAMS_MAP[cc] || { code: "BE", name: "Bachelor of Engineering (B.E.)", type: "Regular" };
  const branchName = GTU_BRANCHES_MAP[bb] || "Computer Engineering";

  // Compute Current Semester based on admission year (Current year 2025/2026)
  const currentAcademicYear = 2025;
  const yearsPassed = currentAcademicYear - admissionYear;
  let estimatedSem = 5;

  if (program.type.includes("D2D")) {
    // D2D starts in Sem 3
    estimatedSem = Math.min(8, Math.max(3, 3 + (yearsPassed * 2)));
  } else if (program.code === "ME" || program.code === "MBA" || program.code === "MCA") {
    estimatedSem = Math.min(4, Math.max(1, (yearsPassed * 2) + 1));
  } else if (program.code === "Diploma") {
    estimatedSem = Math.min(6, Math.max(1, (yearsPassed * 2) + 1));
  } else {
    // Standard BE 4-year
    estimatedSem = Math.min(8, Math.max(1, (yearsPassed * 2) + 1));
  }

  return {
    enrollmentNo: enrollment,
    admissionYear,
    collegeCode: iii,
    collegeName,
    courseCode: program.code,
    courseName: program.name,
    courseType: program.type,
    branchCode: bb,
    branchName,
    rollNumber: rrr,
    estimatedSemester: estimatedSem,
    isValid: true,
  };
}
