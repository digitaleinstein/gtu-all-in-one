export interface StudyUnit {
  unitNo: number;
  title: string;
  type: string;
  url: string;
  fileSize?: string;
}

export interface GTUStudyMaterial {
  id: string;
  subjectCode: string;
  subjectName: string;
  degree: string;
  department: string;
  semester: number;
  credits: number;
  darshanUrl: string;
  resourceTypes: string[];
  units: StudyUnit[];
  description: string;
}

export const GTU_STUDY_MATERIALS: GTUStudyMaterial[] = [
  {
    "id": "BE-3110003",
    "subjectCode": "3110003",
    "subjectName": "Programming for Problem Solving",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit-1 | Introduction to Computer And Programming",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1HmLLLXreVlFmL-Ybu3Ol_InoDO1h-zCP",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | Fundamentals of C",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1ve2_gaEHhZCCg_bioUONpssnua96QO13",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Decision Making In C",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1ewMicj8Ng_MlC4m0ES4U_X6vs5nUY4WE",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Looping",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1zqLmMkSXrFhg2kVRtZIP50A8xHPZwS26",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit-4 | Arrays & Strings",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1ICWl2b-BkAGr5_KgzAxHjfmgVFpPt7oY",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit-5 | Functions",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/17mz_KO6GxTViR_Atl0b2_SukSeqMEnDq",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "Unit-6 | Recursion",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1ERtt-1XBa8oPCg1gUk77GzT8JcHefrAi",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 7,
        "title": "Unit-7 | Pointer",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1fdLaK97Arh61jbwj9ZOd7p2dDqfimCMV",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 8,
        "title": "Unit-8 | Structure [Part-1]",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1X8mpUXaOTWQvHz6Q4_pboANkKwQRTgi-",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 8,
        "title": "Unit-8 | Union [Part-2]",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1Id7cVzFgdYmnwm5xCrs2Je07KRi3Vc_u",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 9,
        "title": "Unit-9 | Dynamic Memory Allocation",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1qLOu03TthqZPIm4RNksrkOfx7EjnykXn",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 10,
        "title": "Unit-10 | File Management",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1y7YqMTBOUxkmGSiz8OTUX4hncNLT6COC",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Programming for Problem Solving (3110003), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110006",
    "subjectCode": "3110006",
    "subjectName": "Basic Mechanical Engineering",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "All Units | Basic Mechanical Engineering (3110006)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/112HPeHCEhMOckbV8yTPFZ5ObJ6r13kPa",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "All | Basic Mechanical Engineering (3110006)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1ClDBzcOXLIUvt6x8I4VLalAMsxJmlXLN",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Basic Mechanical Engineering (3110006), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110007",
    "subjectCode": "3110007",
    "subjectName": "Environmental Science",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Environmental Science",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Environmental Science",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      }
    ],
    "description": "Complete GTU Syllabus study material for Environmental Science (3110007), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110011",
    "subjectCode": "3110011",
    "subjectName": "Physics Group - I",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Physics Group - I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Physics Group - I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I"
      }
    ],
    "description": "Complete GTU Syllabus study material for Physics Group - I (3110011), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110014",
    "subjectCode": "3110014",
    "subjectName": "Mathematics-I",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 1,
    "credits": 5,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "ALL | Mathematics - I",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1cM-pz3UwsCHVxjRcs5Dpg4X1IdHKG5Z-",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit - 1 | Indeterminate Forms ( Part - 1 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1ee_Jizdh37bpTdGeCBM5pLfVj6v1dTKU",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit - 1 | Improper Integrals, Gamma Function and Beta Function ( Part - 2 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1GL2XEgjWScRRBnfehsVaV5n87Gb9yuDE",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit - 1 | Application of Definite Integral ( Part - 3 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1WGADoYUx4--tri7iue56XH4IerTFO_v5",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit - 2 | Sequence",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/183YbvDUa-deyb8Kv_ZzAHPH71umL73Jg",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit - 2 | Series ( Part - 1 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1cLMQObZCmKgsoQhu5NzHdGO1ht3a6AnY",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit - 2 | Series ( Part - 2 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/139E2Oo2TEzkgLeGYd9wLB-uZDAUJa-GR",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit - 3 | Fourier Series ( Part - 1 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/11FZWyoFVJTVsUtarbp7P-b2bMJPwQXBS",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit - 3 | Fourier Series ( Part - 2 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/18-7c8cIX-lWuHJ_yzMG3bRKTqqBYQiJF",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit - 3 | Fourier Series ( Part - 3 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1OwJzxqdyIJOrTEmXul11A8uRHBqre7hE",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit - 4 | Partial Derivatives ( Part - 1 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1e-Vv07-dfDsZxkw1TqzBr7DQYRSNV8KL",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit - 4 | Partial Derivatives ( Part - 2 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1zb4_KMm09scLmod8Fs9aOut-m8DXXTdU",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit - 4 | Partial Derivatives ( Part - 3 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1d3syO8Mq2uxnr85gNk4CCzIVbIfLed8E",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit - 5 | Multiple Integral ( Part - 1 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1RSP8Rx85aN_0qnQm2KZJJZ0ixzROU2YJ",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit - 5 | Multiple Integral ( Part - 2 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1UeDWIv_alZaKW7VTIfkJ5hM4CGI5WoBO",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit - 5 | Multiple Integral ( Part - 3 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1PDWQPlpXBK7iiEnn1sHmkDFqFy9_vabS",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "Unit - 6 | Matrices ( Part - 1 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1okp--5III2lwOFKklxUSpD6wuxPOvUEq",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "Unit - 6 | Matrices ( Part - 2 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1MQt_1cWITCvl2TqwnrZ2UE0pm1fS7Iz4",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "Unit - 6 | Matrices ( Part - 3 )",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1ua7_tDQtwTsr1apSzgqSxsp3kjLP-hrs",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mathematics-I (3110014), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110005",
    "subjectCode": "3110005",
    "subjectName": "Basic Electrical Engineering",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit-1 | D.C. Circuits",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1DyqFmBSeW_3kfFtMiWrI1TYMCuxiLcKk",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | A.C. Circuits",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1s0OWhhOOpvfsOR8XvNQijANo0gn0mgGN",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Transformers",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1SN_cpo9iWZ1QDr-pRvBitKKwmkcNA4Uw",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit-4 | Electrical Machines",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1AGUkD7bWKqmox5tSmO3kBKlY3dO27Ul2",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit-5 | Electrical Installation",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1dsKqHPpzhkeCqxnDGK0S6TIHHmeoPThA",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Basic Electrical Engineering (3110005), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110013",
    "subjectCode": "3110013",
    "subjectName": "Engineering Graphics & Design",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Engineering Graphics & Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Engineering Graphics & Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      }
    ],
    "description": "Complete GTU Syllabus study material for Engineering Graphics & Design (3110013), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110015",
    "subjectCode": "3110015",
    "subjectName": "Mathematics-II",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 2,
    "credits": 5,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "All Units | Mathematics - II (3110015)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1eBu5ovwJIz1o6aWrAKGZnHxDicqyXEb2",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mathematics-II (3110015), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130004",
    "subjectCode": "3130004",
    "subjectName": "Effective Technical Communication",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "All-Units | Effective Technical Communication (3130004)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/10dJpaMhnaG-Q9AwJPJYUWqtZILknWFWM",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit 1 | Dynamics of Communication",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1QyUI3yU8nK3Rfz8QdPJ_tZPUPdcsBCzl",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit 2 | Technical Writing",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/10lWQTtNkf1VgUP1JSyptpXMKZXHhFK5z",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit 3 | Technical Communication",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1ZHnN-7FkCRAYrJeYXrHXn6PyeGzEC4MM",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit 4 | Ethics in Engineering",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1jM5RMYHwRzqrKQiUlAgUnBGAWH2lvfAO",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit 5 | Etiquettes",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1H9aEqUboidWc0h_Q6eTTPNRt3b4RKDlN",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "Unit 6 | Self-development and Assessment",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/17d8pgJeX9hpCGdql0GCLWPSnzDsWOTxX",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Effective Technical Communication (3130004), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130007",
    "subjectCode": "3130007",
    "subjectName": "Indian Constitution",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit-1 | Meaning of the constitution",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1SEKbiX72gX_p-gIcDQ6LTJbMQkaDNUft",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | History of Indian Constitution",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1yUhvHWhfjT2tmZaZpGYxH0jS2UszYbDn",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Salient features and Characteristics of the Constitution of India",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/18Mu8qjEq0j1jUaeOATmW12g36imokMWW",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit-4 | Fundamental Rights",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1rWtozK2jA1NgT8ueTsH1E5NnYRWQDt2S",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit-5 | Right to Equality",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/12SXAN9_LgWJpI2B9ETa7Il6ujbskDqcp",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "Unit-6 | Right to Certain Freedom",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1oahWGbml1GiP33VAJLsKuLMpb4m24API",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 7,
        "title": "Unit-7 | Liberty under Article 21",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/13bGt0PgRcBsK9iKJMSn3xY9PEsvXW01o",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 8,
        "title": "Unit-8 | Fundamental duties and its Legal Status",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1jrN93LdfvY7HLhERo9cAvqh3_mUZLQtd",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 9,
        "title": "Unit-9 | The Directive Principles of State Policy",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/14hIsN1fMxbnfS9uvaDa0N4lhc4oATNA3",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 10,
        "title": "Unit-10 | Federal Structure",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1O4Wap-Z6dqMAFEVcFRGgjoFxOuHuB0EB",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 11,
        "title": "Unit-11 | Parliamentary form of Government in India",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1NdgZhyaR_VRncbzufUk7ieTSSWwquSin",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 12,
        "title": "Unit-12 | Powers and Procedure of Amendment In Indian Constitutional",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1zBSvvsgjz6McyEWKMKk43sI_CV8Rtiwp",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 13,
        "title": "Unit-13 | History of Amendment",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1Lc0yGZTFj0BK28yd8Dfbgo7otYPnBxLO",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 14,
        "title": "Unit-14 | Emergency Provisions",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1wE2VqON6vQpRqNYN1crMWYhzcuExvxNF",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 15,
        "title": "Unit-15 | Local SeIf Government Constitutional Scheme in India",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1El4cPEQ27n_qJ7okV_v5G2VfSD_HU83I",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 17,
        "title": "ALL | Constitution of India",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1mSxB9-dZ9W0ttAG4PHbJVkR9czRTkEeG",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 18,
        "title": "ALL | Features",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1ggmtg5bDlNm-RwqBBxPOQ8KPMWImYnHS",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 19,
        "title": "ALL | Federal Structure",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1yDz-aDnfJaZjMUoIMkozvpjS4gRJWcNN",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 20,
        "title": "ALL | Fundamental Duties",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1efp2KZ6HxsAoKelnmPOWYttYkemMnyhh",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 21,
        "title": "ALL | Fundamental Rights",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1oz2RRFOJagninxq0IEFj7lNIuCxFuQvt",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 22,
        "title": "ALL | Parliamentary form & The President",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1VJrkxmlNAz3NwNJO4FCKY9udTXIjXNTS",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 23,
        "title": "ALL | Amendments",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/13_0mZvs292ciD_NmEHUxbRBJDaH4Fi1q",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 24,
        "title": "ALL | Directive Principles of State Policy",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1ASdEoDrTLXxvfZI6sCRyJb7l3_JH4m06",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Indian Constitution (3130007), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130606",
    "subjectCode": "3130606",
    "subjectName": "Geotechnical Engineering",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130606-Geotechnical-Engineering",
    "resourceTypes": [
      "Tutorials - Assignments",
      "Lab Manual"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "ALL | Tutorials",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1gT48w031MoZL9HGCR7jL9nX-wyyS6sUO",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "ALL | Assignment",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1TBX3G2iGy_sem-3z0Kh0byTu-v4VIHK2",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "ALL | Lab Manual",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1h2Fn4xXzwXIFRgXBe64iy7IRoGs0GlEd",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Geotechnical Engineering (3130606), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130607",
    "subjectCode": "3130607",
    "subjectName": "Building Constructiuon Technology",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130607-Building-Constructiuon-Technology",
    "resourceTypes": [
      "Presentations",
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "ALL | Building Components - Doors",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1OiH8etx-Phen43wAPXbHY6222t1rIm5Q",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "ALL | Building Components - Roof and Roof covering",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1I8z-xEmtOyi9Wa46OVLpNMF6c0VfGuVI",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "ALL | Building Components - Windows",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/11W-o9HQbsUVMBWUGz5cU-KvuiCL2nuQN",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "ALL | Building Components - Floors",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1bb2_Ql9VenJk1aSAE-3_0rlOwctdL4-V",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "ALL | Building Components - Stairs and Staircases",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1KoiS3R-nTIANJucPWLsqR0WSSLiEIYRx",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 7,
        "title": "ALL | Shallow Foundation",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/153FSJaCjHkf1PgRbA8RCDPmyedVfwyA4",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 8,
        "title": "ALL | Caissons",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1IPLrYJOdzRQJk4Dd3YyAjei_yFFyoer-",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 9,
        "title": "All | Assignment",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1NV-rzMo8qAQwy3H8WwRBXQ9BdhJ0PXaq",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Building Constructiuon Technology (3130607), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130608",
    "subjectCode": "3130608",
    "subjectName": "Mechanics Of Solids",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130608-Mechanics-Of-Solids",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit - 1 | Ch - 1 : Introduction",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1igr89wjx5BJKwUV-8dFmJlH_JIUO00E3",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit - 1 | Ch - 2 : Fundamentals of Statics",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1FNo_pdexdOkI-AhMrkwL4urTH2dN5Fk0",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit - 3 | Ch - 5.1 : Centroid",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1cLSWMhL3BdgDxrOD2HBLPTGwWtD6bWh0",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit - 3 | Ch - 5.2 : Moment of Inertia",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1t6P8i1QdK3W5bpDsfLzBoeYXlW2W9Rsn",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit - 4 | Ch. - 7 : Simple Stresses & Strains",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1AhDIuXtKB1HJcy3J1gKxipwAGSNvEfvC",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit - 2 | Ch - 3 : Support Reaction & SFD_BMD",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/153zINbkPwsuDts_zjTXhzUGmDzcfC8Eq",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit 2 | Ch - 4 : Stresses in Beam",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1SKlEyhPySyNAom2Vw8_wFWsthR1upNlN",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit 3 | Ch - 6 : Torsion",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1toSimcWmeN8yDkFMJy0atQjhWdorgmGV",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit 4 | Ch - 8 : Principle Stresses",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/183xoctETdx62GTeLi6lGET9U7ErVVNDR",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mechanics Of Solids (3130608), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130609",
    "subjectCode": "3130609",
    "subjectName": "Building and Town Planning",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130609-Building-and-Town-Planning",
    "resourceTypes": [
      "Presentations",
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Building and Town Planning",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130609-Building-and-Town-Planning"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Building and Town Planning",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130609-Building-and-Town-Planning"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130609-Building-and-Town-Planning"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130609-Building-and-Town-Planning"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130609-Building-and-Town-Planning"
      }
    ],
    "description": "Complete GTU Syllabus study material for Building and Town Planning (3130609), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140601",
    "subjectCode": "3140601",
    "subjectName": "SURVEYING",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140601-SURVEYING",
    "resourceTypes": [
      "e-Notes",
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Ch. 8 | Theory of Errors",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/11QyW6D1SjAS98j_lUZLvV6-4zRYDA4B6",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "ALL | Assignment",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/16U6V4iAEYfSbzGkaprBOnA8TfKkILtuR",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for SURVEYING (3140601), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140603",
    "subjectCode": "3140603",
    "subjectName": "Structural Analysis - I",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140603-Structural-Analysis---I",
    "resourceTypes": [
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "ALL | Assignment",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1RRFg37nNJTD9Z-ctWO1R9w0Y49UXnc42",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Structural Analysis - I (3140603), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140609",
    "subjectCode": "3140609",
    "subjectName": "Civil Engineering - Societal & Global Impact",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140609-Civil-Engineering---Societal-And-Global-Impact",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Module | 2",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1p4kn97NbqL4GXA_M2Iae46OgyzjPhKYY",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Module | 3",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1ynzNVQIES_VVzv0j3Wpwl_CVZMbZaakv",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Module | 5",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1kg1f4y-6l8JQMMzK58qSHxrfpe9ezsSR",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Module | 6",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1XOlVe416rgA9iPezFttDp2HKeo5QlfOo",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Civil Engineering - Societal & Global Impact (3140609), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140610",
    "subjectCode": "3140610",
    "subjectName": "Complex Variables and Partial Differential Equations",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140610-Complex-Variables-and-Partial-Differential-Equations",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit - 1 | Complex Function and Conformal Mapping",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1uSXhzkD3S2XzYcfoVAqJPrhgz_B4JLQ1",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit - 2 | Complex Integral, Sequence and Series",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/14qujbpfaMpvw5Qr2S39_hNArXMkOU84N",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit - 3 | Laurent's Series and Residues",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1AeZIXyDcfuTanW4q05mWCz4PcFnMpvVr",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit - 4 | First Order Partial Differential Equation",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/15Pd2dwsJQ0SEL8YrxDbrXQTyU5QeGOvZ",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit - 5 | Higher Order Partial Differential Equation",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1qZSCOWSQOdg_CefCAlPZ-PArQIWVuCq_",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Complex Variables and Partial Differential Equations (3140610), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140611",
    "subjectCode": "3140611",
    "subjectName": "Fluid Mechanics & Hydraulics",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140611-Fluid-Mechanics-And-Hydraulics",
    "resourceTypes": [
      "e-Notes",
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Module 1 | Properties of Fluid",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1b_fb4KD3__7FvpwAh9tjq3CFK302peRy",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Module 2 | Fluid Statics",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1LmNdHGDb6iH2VHQ1VbUqqfUI-IDwBR4C",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Module 3 | Fluid Kinematics and Dynamics",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/18yN784PpVlhMtFyktP8Gx1_fdZiH-pEo",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Module 5 | Flow Through Pipes",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1vKfgSdvP8NxoxSmuVma9LZZJF75jlDDY",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "Module 5.1 | Viscous Flow",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1wGUV9enwKpd9vojlWJReJHgzlI8Z1zJ1",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 7,
        "title": "Module 5.2 | Turbulent Flow",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1nSWA3nlfiFtEQBYJrUNJlRJyXnsF4BKj",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 8,
        "title": "Module 6 | Open Channel Flow",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1c1pC5OVOyJOK_Di0r6OHc1QeLK1P8tXa",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 9,
        "title": "Module 7 | Dimensional Analysis and Similitude",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1hy0fGuV0ouKuMk4V-AzFz-tsjC19a5Uh",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 10,
        "title": "ALL | Important Questions",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/13upwY4wl9sVZgRf_ZPqbL0BsaNRbnJGO",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Fluid Mechanics & Hydraulics (3140611), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150611",
    "subjectCode": "3150611",
    "subjectName": "TRANSPORTATION ENGINEERING",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150611-TRANSPORTATION-ENGINEERING",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Lecture 1 | Highway Material_Soil-1",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1WFfm9HQXsY4_7KKRCuQEexV24LkDdUf_",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Lecture 2 | Highway Material_Soil-2",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1913GGxR69tkAVgwpP_w96ThcXSQbgpUB",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Lecture 3 | Highway Material_Aggregate",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1YDMWN0zBu3KSGbdXHyNYXJffMNpk2myv",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Lecture 4 | Bitumen",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/18ecT-OmRd1XasQVdkYq17wJF4R5JkRS9",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "Lecture 5 | Bituminous Mix Design",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/14fCv0AjgTFu9QMmfYf7oMQnlwcyuoYl9",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 7,
        "title": "Lecture 6 | Flexible Pavement Design",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1goaWMSUawSP7QloN_xhxv6dBB_WBUl-W",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 8,
        "title": "Lecture 7 | Rigid Pavement Design and Joints",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1XVdVPWJq1z23xA1sAAJ6UJ8vs-LfAGwM",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 9,
        "title": "Lecture 8 | Pavement Construction_Flexible",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1RON0P7hAoAAbAck1wuMcOLgstLA06OrX",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 10,
        "title": "Lecture 9 | Pavement Construction_Rigid",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1lOqd4TbkWph456l6ItEnSyiifi7TJpZS",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 11,
        "title": "Lecture 10 | Railway Transport",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1uPInes3mWq6dGAYpwQeRX4eHuPYupXo5",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 12,
        "title": "Lecture 11 | Air Transportation",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1-Mx_FAk7DF1L4smu8x7lb_M06w-GcRUL",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 13,
        "title": "Lecture 12 | Pavement Maintenance_Drainage_Arboriculture",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/19Vwn-K8VPgb-OHzfei2_DkG9zrm2JR-x",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for TRANSPORTATION ENGINEERING (3150611), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150612",
    "subjectCode": "3150612",
    "subjectName": "DESIGN OF STRUCTURES",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150612-DESIGN-OF-STRUCTURES",
    "resourceTypes": [
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of DESIGN OF STRUCTURES",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150612-DESIGN-OF-STRUCTURES"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of DESIGN OF STRUCTURES",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150612-DESIGN-OF-STRUCTURES"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150612-DESIGN-OF-STRUCTURES"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150612-DESIGN-OF-STRUCTURES"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150612-DESIGN-OF-STRUCTURES"
      }
    ],
    "description": "Complete GTU Syllabus study material for DESIGN OF STRUCTURES (3150612), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150613",
    "subjectCode": "3150613",
    "subjectName": "PAVEMENT DESIGN AND HIGHWAY CONSTRUCTION",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150613-PAVEMENT-DESIGN-AND-HIGHWAY-CONSTRUCTION",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of PAVEMENT DESIGN AND HIGHWAY CONSTRUCTION",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150613-PAVEMENT-DESIGN-AND-HIGHWAY-CONSTRUCTION"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of PAVEMENT DESIGN AND HIGHWAY CONSTRUCTION",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150613-PAVEMENT-DESIGN-AND-HIGHWAY-CONSTRUCTION"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150613-PAVEMENT-DESIGN-AND-HIGHWAY-CONSTRUCTION"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150613-PAVEMENT-DESIGN-AND-HIGHWAY-CONSTRUCTION"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150613-PAVEMENT-DESIGN-AND-HIGHWAY-CONSTRUCTION"
      }
    ],
    "description": "Complete GTU Syllabus study material for PAVEMENT DESIGN AND HIGHWAY CONSTRUCTION (3150613), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2160601",
    "subjectCode": "2160601",
    "subjectName": "Advanced Construction And Equipments",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2160601-Advanced-Construction-And-Equipments",
    "resourceTypes": [
      "e-Notes",
      "Tutorials - Assignments",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Advanced Construction And Equipments",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160601-Advanced-Construction-And-Equipments"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Advanced Construction And Equipments",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160601-Advanced-Construction-And-Equipments"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160601-Advanced-Construction-And-Equipments"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160601-Advanced-Construction-And-Equipments"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160601-Advanced-Construction-And-Equipments"
      }
    ],
    "description": "Complete GTU Syllabus study material for Advanced Construction And Equipments (2160601), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2160602",
    "subjectCode": "2160602",
    "subjectName": "Applied Fluid Mechanics",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2160602-Applied-Fluid-Mechanics",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Tutorials - Assignments",
      "Lab Manual"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Applied Fluid Mechanics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160602-Applied-Fluid-Mechanics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Applied Fluid Mechanics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160602-Applied-Fluid-Mechanics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160602-Applied-Fluid-Mechanics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160602-Applied-Fluid-Mechanics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160602-Applied-Fluid-Mechanics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Applied Fluid Mechanics (2160602), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2160603",
    "subjectCode": "2160603",
    "subjectName": "Railway, Bridge And Tunnel Engineering",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2160603-Railway-Bridge-And-Tunnel-Engineering",
    "resourceTypes": [
      "e-Notes",
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Railway, Bridge And Tunnel Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160603-Railway-Bridge-And-Tunnel-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Railway, Bridge And Tunnel Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160603-Railway-Bridge-And-Tunnel-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160603-Railway-Bridge-And-Tunnel-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160603-Railway-Bridge-And-Tunnel-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160603-Railway-Bridge-And-Tunnel-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Railway, Bridge And Tunnel Engineering (2160603), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2160604",
    "subjectCode": "2160604",
    "subjectName": "Water & Waste Water Engineering",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2160604-Water-And-Waste-Water-Engineering",
    "resourceTypes": [
      "Tutorials - Assignments",
      "Lab Manual"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Water & Waste Water Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160604-Water-And-Waste-Water-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Water & Waste Water Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160604-Water-And-Waste-Water-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160604-Water-And-Waste-Water-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160604-Water-And-Waste-Water-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160604-Water-And-Waste-Water-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Water & Waste Water Engineering (2160604), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2160607",
    "subjectCode": "2160607",
    "subjectName": "Elementary Structural Design",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2160607-Elementary-Structural-Design",
    "resourceTypes": [
      "e-Notes",
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Elementary Structural Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160607-Elementary-Structural-Design"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Elementary Structural Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160607-Elementary-Structural-Design"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160607-Elementary-Structural-Design"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160607-Elementary-Structural-Design"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160607-Elementary-Structural-Design"
      }
    ],
    "description": "Complete GTU Syllabus study material for Elementary Structural Design (2160607), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2160608",
    "subjectCode": "2160608",
    "subjectName": "Urban Transportation System",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2160608-Urban-Transportation-System",
    "resourceTypes": [
      "Presentations",
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Urban Transportation System",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160608-Urban-Transportation-System"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Urban Transportation System",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160608-Urban-Transportation-System"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160608-Urban-Transportation-System"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160608-Urban-Transportation-System"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160608-Urban-Transportation-System"
      }
    ],
    "description": "Complete GTU Syllabus study material for Urban Transportation System (2160608), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170607",
    "subjectCode": "2170607",
    "subjectName": "Design of Reinforced Concrete Structures",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170607-Design-of-Reinforced-Concrete-Structures",
    "resourceTypes": [
      "Tutorials - Assignments",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Design of Reinforced Concrete Structures",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170607-Design-of-Reinforced-Concrete-Structures"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Design of Reinforced Concrete Structures",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170607-Design-of-Reinforced-Concrete-Structures"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170607-Design-of-Reinforced-Concrete-Structures"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170607-Design-of-Reinforced-Concrete-Structures"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170607-Design-of-Reinforced-Concrete-Structures"
      }
    ],
    "description": "Complete GTU Syllabus study material for Design of Reinforced Concrete Structures (2170607), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170609",
    "subjectCode": "2170609",
    "subjectName": "Irrigation Engineering",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170609-Irrigation-Engineering",
    "resourceTypes": [
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Irrigation Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170609-Irrigation-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Irrigation Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170609-Irrigation-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170609-Irrigation-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170609-Irrigation-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170609-Irrigation-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Irrigation Engineering (2170609), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170610",
    "subjectCode": "2170610",
    "subjectName": "Professional Practices & Valuation",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170610-Professional-Practices-And-Valuation",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Professional Practices & Valuation",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170610-Professional-Practices-And-Valuation"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Professional Practices & Valuation",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170610-Professional-Practices-And-Valuation"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170610-Professional-Practices-And-Valuation"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170610-Professional-Practices-And-Valuation"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170610-Professional-Practices-And-Valuation"
      }
    ],
    "description": "Complete GTU Syllabus study material for Professional Practices & Valuation (2170610), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170613",
    "subjectCode": "2170613",
    "subjectName": "Traffic Engineering",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170613-Traffic-Engineering",
    "resourceTypes": [
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Traffic Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170613-Traffic-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Traffic Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170613-Traffic-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170613-Traffic-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170613-Traffic-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170613-Traffic-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Traffic Engineering (2170613), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2180602",
    "subjectCode": "2180602",
    "subjectName": "Harbour & Airport Engineering",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2180602-Harbour-And-Airport-Engineering",
    "resourceTypes": [
      "e-Notes",
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Harbour & Airport Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180602-Harbour-And-Airport-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Harbour & Airport Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180602-Harbour-And-Airport-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180602-Harbour-And-Airport-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180602-Harbour-And-Airport-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180602-Harbour-And-Airport-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Harbour & Airport Engineering (2180602), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2180609",
    "subjectCode": "2180609",
    "subjectName": "Foundation Engineering",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2180609-Foundation-Engineering",
    "resourceTypes": [
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Foundation Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180609-Foundation-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Foundation Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180609-Foundation-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180609-Foundation-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180609-Foundation-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180609-Foundation-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Foundation Engineering (2180609), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2180610",
    "subjectCode": "2180610",
    "subjectName": "Design of Steel Structures",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2180610-Design-of-Steel-Structures",
    "resourceTypes": [
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Design of Steel Structures",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180610-Design-of-Steel-Structures"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Design of Steel Structures",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180610-Design-of-Steel-Structures"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180610-Design-of-Steel-Structures"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180610-Design-of-Steel-Structures"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180610-Design-of-Steel-Structures"
      }
    ],
    "description": "Complete GTU Syllabus study material for Design of Steel Structures (2180610), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2180611",
    "subjectCode": "2180611",
    "subjectName": "Construction Management",
    "degree": "BE",
    "department": "Civil Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2180611-Construction-Management",
    "resourceTypes": [
      "Tutorials - Assignments"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Construction Management",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180611-Construction-Management"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Construction Management",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180611-Construction-Management"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180611-Construction-Management"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180611-Construction-Management"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180611-Construction-Management"
      }
    ],
    "description": "Complete GTU Syllabus study material for Construction Management (2180611), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110005",
    "subjectCode": "3110005",
    "subjectName": "Basic Electrical Engineering",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Basic Electrical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Basic Electrical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Basic Electrical Engineering (3110005), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110007",
    "subjectCode": "3110007",
    "subjectName": "Environmental Science",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Environmental Science",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Environmental Science",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      }
    ],
    "description": "Complete GTU Syllabus study material for Environmental Science (3110007), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110013",
    "subjectCode": "3110013",
    "subjectName": "Engineering Graphics & Design",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Engineering Graphics & Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Engineering Graphics & Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      }
    ],
    "description": "Complete GTU Syllabus study material for Engineering Graphics & Design (3110013), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110014",
    "subjectCode": "3110014",
    "subjectName": "Mathematics-I",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 1,
    "credits": 5,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Mathematics-I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Mathematics-I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mathematics-I (3110014), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110003",
    "subjectCode": "3110003",
    "subjectName": "Programming for Problem Solving",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Programming for Problem Solving",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Programming for Problem Solving",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      }
    ],
    "description": "Complete GTU Syllabus study material for Programming for Problem Solving (3110003), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110006",
    "subjectCode": "3110006",
    "subjectName": "Basic Mechanical Engineering",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Basic Mechanical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Basic Mechanical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Basic Mechanical Engineering (3110006), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110015",
    "subjectCode": "3110015",
    "subjectName": "Mathematics-II",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 2,
    "credits": 5,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Mathematics-II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Mathematics-II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mathematics-II (3110015), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110016",
    "subjectCode": "3110016",
    "subjectName": "Basic Electronics",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Basic Electronics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Basic Electronics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Basic Electronics (3110016), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110018",
    "subjectCode": "3110018",
    "subjectName": "Physics Group - II",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Physics Group - II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Physics Group - II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Physics Group - II (3110018), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130004",
    "subjectCode": "3130004",
    "subjectName": "Effective Technical Communication",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Effective Technical Communication",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Effective Technical Communication",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      }
    ],
    "description": "Complete GTU Syllabus study material for Effective Technical Communication (3130004), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130006",
    "subjectCode": "3130006",
    "subjectName": "Probability and Statistics",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130006-Probability-and-Statistics",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Probability and Statistics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130006-Probability-and-Statistics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Probability and Statistics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130006-Probability-and-Statistics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130006-Probability-and-Statistics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130006-Probability-and-Statistics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130006-Probability-and-Statistics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Probability and Statistics (3130006), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130007",
    "subjectCode": "3130007",
    "subjectName": "Indian Constitution",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Indian Constitution",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Indian Constitution",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      }
    ],
    "description": "Complete GTU Syllabus study material for Indian Constitution (3130007), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130702",
    "subjectCode": "3130702",
    "subjectName": "Data Structures",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130702-Data-Structures",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "All-Units | Data Structures (2130702)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1kksvRxZkEmo7U-qTDx8Tu1GjVFm50Nka",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit-1 | Introduction to Data Structures",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1YXXF82J_QwneSeLP0pCsl3hqUtzlTWrT",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | Linear Data Structure | Part-1 (Array)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1K_VFuG2WiJp7FxFpem-Fgje4gJZbH8kU",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | Linear Data Structure | Part-2 (Stack)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1UwpzdG4eer7QSHglocWqoFmmN-pq1oYF",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | Linear Data Structure | Part-3 (Queue)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1N9kYguZv2I3usDfyVWTEy-SsAPFbZ90X",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | Linear Data Structure | Part-4 (Linked List)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1SJetmDMr4h8HBl2_CCwDUlwz9cccotas",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Non-Linear Data Structure | Part-1 (Tree-I)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/13w-rdUCeXZKQRfhtnKU3w6hwnmxZa68t",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Non-Linear Data Structure | Part-2 (Tree-II)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1whQZGhbNgAXHdLVdTzTDgH2p-0NjeKS4",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Non-Linear Data Structure | Part-1 (Tree-III)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1s_pAgm27ErJE17ENB63zsLkUTTmotbeF",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Non-Linear Data Structure | Part-4 (Graph)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/13D7Wgk1lSSQv_CjOI50tc3_FLThefBiv",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit-4 | Hashing and File Structures | Part-1 (Hashing)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1dl57LNc5un78dCuIU3B2IIQaHBzhAJUX",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit-4 | Hashing and File Structures | Part-2 (File)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/16Kmb0Gg5cjjXXm5MxFEGEYgjgmjuEcC7",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit-5 | Sorting & Searching",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1SenhxCdvzDcELSy4sK1IqutJ7gwGjiuh",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Data Structures (3130702), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130703",
    "subjectCode": "3130703",
    "subjectName": "Database Management Systems",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130703-Database-Management-Systems",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Database Management Systems",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130703-Database-Management-Systems"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Database Management Systems",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130703-Database-Management-Systems"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130703-Database-Management-Systems"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130703-Database-Management-Systems"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130703-Database-Management-Systems"
      }
    ],
    "description": "Complete GTU Syllabus study material for Database Management Systems (3130703), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130704",
    "subjectCode": "3130704",
    "subjectName": "Digital Fundamentals",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130704-Digital-Fundamentals",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Digital Fundamentals",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130704-Digital-Fundamentals"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Digital Fundamentals",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130704-Digital-Fundamentals"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130704-Digital-Fundamentals"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130704-Digital-Fundamentals"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130704-Digital-Fundamentals"
      }
    ],
    "description": "Complete GTU Syllabus study material for Digital Fundamentals (3130704), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2140705",
    "subjectCode": "2140705",
    "subjectName": "Object Oriented Programming With C++",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2140705-Object-Oriented-Programming-With-Cpp",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Object Oriented Programming With C++",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2140705-Object-Oriented-Programming-With-Cpp"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Object Oriented Programming With C++",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2140705-Object-Oriented-Programming-With-Cpp"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2140705-Object-Oriented-Programming-With-Cpp"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2140705-Object-Oriented-Programming-With-Cpp"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2140705-Object-Oriented-Programming-With-Cpp"
      }
    ],
    "description": "Complete GTU Syllabus study material for Object Oriented Programming With C++ (2140705), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140702",
    "subjectCode": "3140702",
    "subjectName": "Operating System",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140702-Operating-System",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Lab Manual",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Operating System",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140702-Operating-System"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Operating System",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140702-Operating-System"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140702-Operating-System"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140702-Operating-System"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140702-Operating-System"
      }
    ],
    "description": "Complete GTU Syllabus study material for Operating System (3140702), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140705",
    "subjectCode": "3140705",
    "subjectName": "Object Oriented Programming - I",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140705-Object-Oriented-Programming---I",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Lab Manual",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Object Oriented Programming - I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140705-Object-Oriented-Programming---I"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Object Oriented Programming - I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140705-Object-Oriented-Programming---I"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140705-Object-Oriented-Programming---I"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140705-Object-Oriented-Programming---I"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140705-Object-Oriented-Programming---I"
      }
    ],
    "description": "Complete GTU Syllabus study material for Object Oriented Programming - I (3140705), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140707",
    "subjectCode": "3140707",
    "subjectName": "Computer Organization & Architecture",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140707-Computer-Organization-And-Architecture",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Computer Organization & Architecture",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140707-Computer-Organization-And-Architecture"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Computer Organization & Architecture",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140707-Computer-Organization-And-Architecture"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140707-Computer-Organization-And-Architecture"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140707-Computer-Organization-And-Architecture"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140707-Computer-Organization-And-Architecture"
      }
    ],
    "description": "Complete GTU Syllabus study material for Computer Organization & Architecture (3140707), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140708",
    "subjectCode": "3140708",
    "subjectName": "Discrete Mathematics",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 4,
    "credits": 5,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140708-Discrete-Mathematics",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Discrete Mathematics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140708-Discrete-Mathematics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Discrete Mathematics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140708-Discrete-Mathematics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140708-Discrete-Mathematics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140708-Discrete-Mathematics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140708-Discrete-Mathematics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Discrete Mathematics (3140708), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140709",
    "subjectCode": "3140709",
    "subjectName": "Principles Of Economics And Management",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140709-Principles-Of-Economics-And-Management",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Principles Of Economics And Management",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140709-Principles-Of-Economics-And-Management"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Principles Of Economics And Management",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140709-Principles-Of-Economics-And-Management"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140709-Principles-Of-Economics-And-Management"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140709-Principles-Of-Economics-And-Management"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140709-Principles-Of-Economics-And-Management"
      }
    ],
    "description": "Complete GTU Syllabus study material for Principles Of Economics And Management (3140709), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150703",
    "subjectCode": "3150703",
    "subjectName": "Analysis And Design Of Algorithms",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 5,
    "credits": 5,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150703-Analysis-And-Design-Of-Algorithms",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "All-Units | Analysis and Design of Algorithms (3150703)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1fQJOlkJF1tXRdO4fxlajlMdJGWstatUA",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "ADA | Course Introduction",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1u4iKMBggoCugHAe-VLD8-k930YIfwGaq",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit-1 | Basics of Algorithms and Mathematics",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1217sl1AnkdMWY_rj_gBWoN5agV6fjgRJ",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | Analysis of Algorithm",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/18qOmIh25LMDRvAEgOvzQnMoGIF9Tex71",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Divide and Conquer Algorithm",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1D3uhRLWrnyjknKKOvDTHZYpc3DeMEZP_",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit-4 | Dynamic Programming",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1oiXAwLlmj1Cb2z1GeUUo3fcymK4_4hp8",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit-5 | Greedy Algorithm",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1XyqdwFDgGMbNh1-cXlr5Sp5Exq8XxQTs",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "Unit-6 | Exploring Graphs",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1xLw5LZih0hi1WR9Ng9QHKL38XKlCfKFN",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 7,
        "title": "Unit-7 | Backtracking and Branch and Bound",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1_ctQ495DrMhUBYkBTLrX3UDntXqgeYWw",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 8,
        "title": "Unit-8 | String Matching",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1rQdCYiJojA7sBiNAjKhr8nERWx7E1aLW",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 9,
        "title": "Unit-9 | Introduction to NP-Completeness",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1UeFqFPgGVQLshdUjDLEoSoQi8XogGWaA",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Analysis And Design Of Algorithms (3150703), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150709",
    "subjectCode": "3150709",
    "subjectName": "Professional Ethics",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Professional Ethics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Professional Ethics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Professional Ethics (3150709), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150710",
    "subjectCode": "3150710",
    "subjectName": "Computer Networks",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150710-Computer-Networks",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "All-Units | Computer Networks (3150710)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1OZSdFNgaRG3fsl83PtaerltyD2JLAmLO",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit-1 | Introduction to computer networks and Internet",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1BECuLqpXMQwdbB5v0l5LX5iYV-oQZ14V",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | Part-1 | Application Layer",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1FLdDCQsnHe2EbMoqxIhte5mt1mOGWhuk",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | Part-2 | Application Layer",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/10dxXDULHHDQJF1_a2pyZ_1tbV9S-lx4l",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Transport Layer",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1hCshpWnw8zLD6T-PZLkzdkkCbVRuCcaV",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit-4 | Network Layer",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1VNA-zwbZyfteGECy1PHTBBlxO6dx7-JZ",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit-5 | The Link layer and Local area networks",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/14KI0k8nVH6Djj93n7TLdHTB_ZJk0ou17",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Computer Networks (3150710), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150711",
    "subjectCode": "3150711",
    "subjectName": "Software Engineering",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150711-Software-Engineering",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Lab Manual",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Software Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150711-Software-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Software Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150711-Software-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150711-Software-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150711-Software-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150711-Software-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Software Engineering (3150711), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150712",
    "subjectCode": "3150712",
    "subjectName": "Computer Graphics",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150712-Computer-Graphics",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Lab Manual",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Computer Graphics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150712-Computer-Graphics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Computer Graphics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150712-Computer-Graphics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150712-Computer-Graphics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150712-Computer-Graphics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150712-Computer-Graphics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Computer Graphics (3150712), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150713",
    "subjectCode": "3150713",
    "subjectName": "Python for Data Science",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150713-Python-for-Data-Science",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Python for Data Science",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150713-Python-for-Data-Science"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Python for Data Science",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150713-Python-for-Data-Science"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150713-Python-for-Data-Science"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150713-Python-for-Data-Science"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150713-Python-for-Data-Science"
      }
    ],
    "description": "Complete GTU Syllabus study material for Python for Data Science (3150713), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150714",
    "subjectCode": "3150714",
    "subjectName": "Cyber Security",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150714-Cyber-Security",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Cyber Security",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150714-Cyber-Security"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Cyber Security",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150714-Cyber-Security"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150714-Cyber-Security"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150714-Cyber-Security"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150714-Cyber-Security"
      }
    ],
    "description": "Complete GTU Syllabus study material for Cyber Security (3150714), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2160704",
    "subjectCode": "2160704",
    "subjectName": "Theory of Computation",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2160704-Theory-of-Computation",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Theory of Computation",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160704-Theory-of-Computation"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Theory of Computation",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160704-Theory-of-Computation"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160704-Theory-of-Computation"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160704-Theory-of-Computation"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160704-Theory-of-Computation"
      }
    ],
    "description": "Complete GTU Syllabus study material for Theory of Computation (2160704), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2160707",
    "subjectCode": "2160707",
    "subjectName": "Advanced Java",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2160707-Advanced-Java",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Lab Manual",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Advanced Java",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160707-Advanced-Java"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Advanced Java",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160707-Advanced-Java"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160707-Advanced-Java"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160707-Advanced-Java"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160707-Advanced-Java"
      }
    ],
    "description": "Complete GTU Syllabus study material for Advanced Java (2160707), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2160708",
    "subjectCode": "2160708",
    "subjectName": "Web Technology",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2160708-Web-Technology",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Lab Manual",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Web Technology",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160708-Web-Technology"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Web Technology",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160708-Web-Technology"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160708-Web-Technology"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160708-Web-Technology"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2160708-Web-Technology"
      }
    ],
    "description": "Complete GTU Syllabus study material for Web Technology (2160708), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3160704",
    "subjectCode": "3160704",
    "subjectName": "Theory of Computation",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3160704-Theory-of-Computation",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit-1 | Review of Mathematical Theory",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/18Cy29MLoLkOllI9xaMf3rI2eLGv37gP8",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | Regular Expression & Finite Automata",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1DOpTC18VrnlCVhDFUxB7YxzC4D60WmZV",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Context Free Grammer (CFG)",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1b-PfJ4Czg5ZwdS-nP4GDdK8n4rcbDimP",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit-4 | Pushdown Automata",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1SoT5eguL1J_kx8Gx6WxhA7W5xLsFKnoK",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit-5 | Turing Machine",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/18VUbuc8MF1oJ7c14_Jc7kCeNyqPqgSUw",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "Unit-6 | Computable Function",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1r3HpcZB8qrMUkQ_3WdXqCocLpQriJA0x",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 7,
        "title": "Unit-7 | Undecidebility",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1qqPEIqnNFYkal5-UdJT4c9bjQpmIUbto",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Theory of Computation (3160704), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3160707",
    "subjectCode": "3160707",
    "subjectName": "Advance java Programming",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3160707-Advance-java-Programming",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Advance java Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160707-Advance-java-Programming"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Advance java Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160707-Advance-java-Programming"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160707-Advance-java-Programming"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160707-Advance-java-Programming"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160707-Advance-java-Programming"
      }
    ],
    "description": "Complete GTU Syllabus study material for Advance java Programming (3160707), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3160712",
    "subjectCode": "3160712",
    "subjectName": "Microprocessor and Interfacing",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3160712-Microprocessor-and-Interfacing",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Lab Manual"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Microprocessor and Interfacing",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160712-Microprocessor-and-Interfacing"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Microprocessor and Interfacing",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160712-Microprocessor-and-Interfacing"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160712-Microprocessor-and-Interfacing"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160712-Microprocessor-and-Interfacing"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160712-Microprocessor-and-Interfacing"
      }
    ],
    "description": "Complete GTU Syllabus study material for Microprocessor and Interfacing (3160712), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3160713",
    "subjectCode": "3160713",
    "subjectName": "WEB Programming",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3160713-WEB-Programming",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of WEB Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160713-WEB-Programming"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of WEB Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160713-WEB-Programming"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160713-WEB-Programming"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160713-WEB-Programming"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160713-WEB-Programming"
      }
    ],
    "description": "Complete GTU Syllabus study material for WEB Programming (3160713), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3160714",
    "subjectCode": "3160714",
    "subjectName": "Data Mining",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3160714-Data-Mining",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Data Mining",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160714-Data-Mining"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Data Mining",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160714-Data-Mining"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160714-Data-Mining"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160714-Data-Mining"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160714-Data-Mining"
      }
    ],
    "description": "Complete GTU Syllabus study material for Data Mining (3160714), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3160716",
    "subjectCode": "3160716",
    "subjectName": "IOT and Applications",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3160716-IOT-and-Applications",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of IOT and Applications",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160716-IOT-and-Applications"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of IOT and Applications",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160716-IOT-and-Applications"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160716-IOT-and-Applications"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160716-IOT-and-Applications"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3160716-IOT-and-Applications"
      }
    ],
    "description": "Complete GTU Syllabus study material for IOT and Applications (3160716), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170701",
    "subjectCode": "2170701",
    "subjectName": "Complier Design",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170701-Complier-Design",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Complier Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170701-Complier-Design"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Complier Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170701-Complier-Design"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170701-Complier-Design"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170701-Complier-Design"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170701-Complier-Design"
      }
    ],
    "description": "Complete GTU Syllabus study material for Complier Design (2170701), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170709",
    "subjectCode": "2170709",
    "subjectName": "Information and Network Security",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170709-Information-and-Network-Security",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Information and Network Security",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170709-Information-and-Network-Security"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Information and Network Security",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170709-Information-and-Network-Security"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170709-Information-and-Network-Security"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170709-Information-and-Network-Security"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170709-Information-and-Network-Security"
      }
    ],
    "description": "Complete GTU Syllabus study material for Information and Network Security (2170709), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170710",
    "subjectCode": "2170710",
    "subjectName": "Mobile Computing and Wireless Communication",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170710-Mobile-Computing-and-Wireless-Communication",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Mobile Computing and Wireless Communication",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170710-Mobile-Computing-and-Wireless-Communication"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Mobile Computing and Wireless Communication",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170710-Mobile-Computing-and-Wireless-Communication"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170710-Mobile-Computing-and-Wireless-Communication"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170710-Mobile-Computing-and-Wireless-Communication"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170710-Mobile-Computing-and-Wireless-Communication"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mobile Computing and Wireless Communication (2170710), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170715",
    "subjectCode": "2170715",
    "subjectName": "Data Mining and Business Intelligence",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170715-Data-Mining-and-Business-Intelligence",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Data Mining and Business Intelligence",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170715-Data-Mining-and-Business-Intelligence"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Data Mining and Business Intelligence",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170715-Data-Mining-and-Business-Intelligence"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170715-Data-Mining-and-Business-Intelligence"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170715-Data-Mining-and-Business-Intelligence"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170715-Data-Mining-and-Business-Intelligence"
      }
    ],
    "description": "Complete GTU Syllabus study material for Data Mining and Business Intelligence (2170715), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3170701",
    "subjectCode": "3170701",
    "subjectName": "Compiler Design",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3170701-Compiler-Design",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "DU-Act",
        "type": "e-Notes",
        "url": "https://du-website.s3.ap-south-1.amazonaws.com/U01/Files/---03-06-2021-04-13-02.pdf",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 1,
        "title": "Unit-1 | Overview of the Compiler and its Structure",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1NAEOjqssiQ8f0ATO8kG7At7UDa3sbOg2",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 2,
        "title": "Unit-2 | Lexical Analysis",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1Qj1BF2i6sUT0gidqhnXSIGdHVoLdRCmC",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Part-1 | Syntax Analysis",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1yx4mVPlejS-vyWjZxT6yiFpaUZqmBOIu",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 3,
        "title": "Unit-3 | Part-2 | Syntax Analysis",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1n99V1eRJNUBabIWodIhYUzHpudbDz1r5",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 4,
        "title": "Unit-4 | Error Recovery",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1zvQ1rSuJZ9Svu7kStqu7azumj4ccZXT8",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 5,
        "title": "Unit-5 | Intermediate-Code Generation",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1hxAFLbA64Arvjfs-OMy06PmpMA_e45C6",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 6,
        "title": "Unit-6 | Run-Time Environments",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1Y3L2xoHHKtybfZ2a9AA1_m3eHXL-Y3sx",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 7,
        "title": "Unit-7 | Code Generation and Optimization",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1aATZ39m5KvXfFZIlHll34Rqv7R6e4IJS",
        "fileSize": "2.4 MB"
      },
      {
        "unitNo": 8,
        "title": "Unit-8 | Instruction-Level Parallelism",
        "type": "e-Notes",
        "url": "https://drive.google.com/file/d/1NIyXr2bj1Eg2hwWrpOYUDF4aj0KzYvz5",
        "fileSize": "2.4 MB"
      }
    ],
    "description": "Complete GTU Syllabus study material for Compiler Design (3170701), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3170710",
    "subjectCode": "3170710",
    "subjectName": "Mobile Computing and Wireless communication",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3170710-Mobile-Computing-and-Wireless-communication",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Mobile Computing and Wireless communication",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170710-Mobile-Computing-and-Wireless-communication"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Mobile Computing and Wireless communication",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170710-Mobile-Computing-and-Wireless-communication"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170710-Mobile-Computing-and-Wireless-communication"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170710-Mobile-Computing-and-Wireless-communication"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170710-Mobile-Computing-and-Wireless-communication"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mobile Computing and Wireless communication (3170710), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3170716",
    "subjectCode": "3170716",
    "subjectName": "Artificial Intelligence",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3170716-Artificial-Intelligence",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Artificial Intelligence",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170716-Artificial-Intelligence"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Artificial Intelligence",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170716-Artificial-Intelligence"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170716-Artificial-Intelligence"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170716-Artificial-Intelligence"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170716-Artificial-Intelligence"
      }
    ],
    "description": "Complete GTU Syllabus study material for Artificial Intelligence (3170716), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3170719",
    "subjectCode": "3170719",
    "subjectName": "Distributed System",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3170719-Distributed-System",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Distributed System",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170719-Distributed-System"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Distributed System",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170719-Distributed-System"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170719-Distributed-System"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170719-Distributed-System"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170719-Distributed-System"
      }
    ],
    "description": "Complete GTU Syllabus study material for Distributed System (3170719), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3170722",
    "subjectCode": "3170722",
    "subjectName": "Big Data Analytics",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3170722-Big-Data-Analytics",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Big Data Analytics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170722-Big-Data-Analytics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Big Data Analytics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170722-Big-Data-Analytics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170722-Big-Data-Analytics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170722-Big-Data-Analytics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170722-Big-Data-Analytics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Big Data Analytics (3170722), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3170726",
    "subjectCode": "3170726",
    "subjectName": "Mobile Application Development",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3170726-Mobile-Application-Development",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Mobile Application Development",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170726-Mobile-Application-Development"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Mobile Application Development",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170726-Mobile-Application-Development"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170726-Mobile-Application-Development"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170726-Mobile-Application-Development"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3170726-Mobile-Application-Development"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mobile Application Development (3170726), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2180703",
    "subjectCode": "2180703",
    "subjectName": "Artificial Intelligence",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2180703-Artificial-Intelligence",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Artificial Intelligence",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180703-Artificial-Intelligence"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Artificial Intelligence",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180703-Artificial-Intelligence"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180703-Artificial-Intelligence"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180703-Artificial-Intelligence"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180703-Artificial-Intelligence"
      }
    ],
    "description": "Complete GTU Syllabus study material for Artificial Intelligence (2180703), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2180712",
    "subjectCode": "2180712",
    "subjectName": "Cloud Infrastructure and Services",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2180712-Cloud-Infrastructure-and-Services",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Cloud Infrastructure and Services",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180712-Cloud-Infrastructure-and-Services"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Cloud Infrastructure and Services",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180712-Cloud-Infrastructure-and-Services"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180712-Cloud-Infrastructure-and-Services"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180712-Cloud-Infrastructure-and-Services"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180712-Cloud-Infrastructure-and-Services"
      }
    ],
    "description": "Complete GTU Syllabus study material for Cloud Infrastructure and Services (2180712), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2180713",
    "subjectCode": "2180713",
    "subjectName": "Web Data Management",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2180713-Web-Data-Management",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Web Data Management",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180713-Web-Data-Management"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Web Data Management",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180713-Web-Data-Management"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180713-Web-Data-Management"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180713-Web-Data-Management"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180713-Web-Data-Management"
      }
    ],
    "description": "Complete GTU Syllabus study material for Web Data Management (2180713), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2180714",
    "subjectCode": "2180714",
    "subjectName": "iOS Programming",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2180714-iOS-Programming",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of iOS Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180714-iOS-Programming"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of iOS Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180714-iOS-Programming"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180714-iOS-Programming"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180714-iOS-Programming"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180714-iOS-Programming"
      }
    ],
    "description": "Complete GTU Syllabus study material for iOS Programming (2180714), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2180715",
    "subjectCode": "2180715",
    "subjectName": "Android Programming",
    "degree": "BE",
    "department": "Computer Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2180715-Android-Programming",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Android Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180715-Android-Programming"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Android Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180715-Android-Programming"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180715-Android-Programming"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180715-Android-Programming"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180715-Android-Programming"
      }
    ],
    "description": "Complete GTU Syllabus study material for Android Programming (2180715), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110005",
    "subjectCode": "3110005",
    "subjectName": "Basic Electrical Engineering",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Basic Electrical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Basic Electrical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Basic Electrical Engineering (3110005), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110007",
    "subjectCode": "3110007",
    "subjectName": "Environmental Science",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Environmental Science",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Environmental Science",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      }
    ],
    "description": "Complete GTU Syllabus study material for Environmental Science (3110007), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110013",
    "subjectCode": "3110013",
    "subjectName": "Engineering Graphics & Design",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Engineering Graphics & Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Engineering Graphics & Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      }
    ],
    "description": "Complete GTU Syllabus study material for Engineering Graphics & Design (3110013), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110014",
    "subjectCode": "3110014",
    "subjectName": "Mathematics-I",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 1,
    "credits": 5,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Mathematics-I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Mathematics-I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mathematics-I (3110014), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110003",
    "subjectCode": "3110003",
    "subjectName": "Programming for Problem Solving",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Programming for Problem Solving",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Programming for Problem Solving",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      }
    ],
    "description": "Complete GTU Syllabus study material for Programming for Problem Solving (3110003), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110006",
    "subjectCode": "3110006",
    "subjectName": "Basic Mechanical Engineering",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Basic Mechanical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Basic Mechanical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Basic Mechanical Engineering (3110006), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110015",
    "subjectCode": "3110015",
    "subjectName": "Mathematics-II",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 2,
    "credits": 5,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Mathematics-II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Mathematics-II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mathematics-II (3110015), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110016",
    "subjectCode": "3110016",
    "subjectName": "Basic Electronics",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Basic Electronics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Basic Electronics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110016-Basic-Electronics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Basic Electronics (3110016), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110018",
    "subjectCode": "3110018",
    "subjectName": "Physics Group - II",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Physics Group - II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Physics Group - II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110018-Physics-Group---II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Physics Group - II (3110018), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130004",
    "subjectCode": "3130004",
    "subjectName": "Effective Technical Communication",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Effective Technical Communication",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Effective Technical Communication",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      }
    ],
    "description": "Complete GTU Syllabus study material for Effective Technical Communication (3130004), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130007",
    "subjectCode": "3130007",
    "subjectName": "Indian Constitution",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Indian Constitution",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Indian Constitution",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      }
    ],
    "description": "Complete GTU Syllabus study material for Indian Constitution (3130007), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130906",
    "subjectCode": "3130906",
    "subjectName": "Electrical Circuit Analysis",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130906-Electrical-Circuit-Analysis",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Electrical Circuit Analysis",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130906-Electrical-Circuit-Analysis"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Electrical Circuit Analysis",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130906-Electrical-Circuit-Analysis"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130906-Electrical-Circuit-Analysis"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130906-Electrical-Circuit-Analysis"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130906-Electrical-Circuit-Analysis"
      }
    ],
    "description": "Complete GTU Syllabus study material for Electrical Circuit Analysis (3130906), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130907",
    "subjectCode": "3130907",
    "subjectName": "Analog and Digital Electronics",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130907-Analog-and-Digital-Electronics",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Analog and Digital Electronics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130907-Analog-and-Digital-Electronics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Analog and Digital Electronics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130907-Analog-and-Digital-Electronics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130907-Analog-and-Digital-Electronics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130907-Analog-and-Digital-Electronics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130907-Analog-and-Digital-Electronics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Analog and Digital Electronics (3130907), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130908",
    "subjectCode": "3130908",
    "subjectName": "Applied Mathematics for Electrical Engineering",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 3,
    "credits": 5,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130908-Applied-Mathematics-for-Electrical-Engineering",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Applied Mathematics for Electrical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130908-Applied-Mathematics-for-Electrical-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Applied Mathematics for Electrical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130908-Applied-Mathematics-for-Electrical-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130908-Applied-Mathematics-for-Electrical-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130908-Applied-Mathematics-for-Electrical-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130908-Applied-Mathematics-for-Electrical-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Applied Mathematics for Electrical Engineering (3130908), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140911",
    "subjectCode": "3140911",
    "subjectName": "Economics for Engineers",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140911-Economics-for-Engineers",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Economics for Engineers",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140911-Economics-for-Engineers"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Economics for Engineers",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140911-Economics-for-Engineers"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140911-Economics-for-Engineers"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140911-Economics-for-Engineers"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140911-Economics-for-Engineers"
      }
    ],
    "description": "Complete GTU Syllabus study material for Economics for Engineers (3140911), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3140915",
    "subjectCode": "3140915",
    "subjectName": "Power Electronics",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3140915-Power-Electronics",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Power Electronics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140915-Power-Electronics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Power Electronics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140915-Power-Electronics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140915-Power-Electronics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140915-Power-Electronics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3140915-Power-Electronics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Power Electronics (3140915), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150709",
    "subjectCode": "3150709",
    "subjectName": "Professional Ethics",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Professional Ethics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Professional Ethics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150709-Professional-Ethics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Professional Ethics (3150709), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150910",
    "subjectCode": "3150910",
    "subjectName": "Electrical Machine- II",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150910-Electrical-Machine--II",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Electrical Machine- II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150910-Electrical-Machine--II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Electrical Machine- II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150910-Electrical-Machine--II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150910-Electrical-Machine--II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150910-Electrical-Machine--II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150910-Electrical-Machine--II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Electrical Machine- II (3150910), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150911",
    "subjectCode": "3150911",
    "subjectName": "Power System- II",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150911-Power-System--II",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Power System- II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150911-Power-System--II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Power System- II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150911-Power-System--II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150911-Power-System--II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150911-Power-System--II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150911-Power-System--II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Power System- II (3150911), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150912",
    "subjectCode": "3150912",
    "subjectName": "Signals and Systems",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150912-Signals-and-Systems",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Signals and Systems",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150912-Signals-and-Systems"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Signals and Systems",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150912-Signals-and-Systems"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150912-Signals-and-Systems"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150912-Signals-and-Systems"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150912-Signals-and-Systems"
      }
    ],
    "description": "Complete GTU Syllabus study material for Signals and Systems (3150912), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3150913",
    "subjectCode": "3150913",
    "subjectName": "Disaster Management",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3150913-Disaster-Management",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Disaster Management",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150913-Disaster-Management"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Disaster Management",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150913-Disaster-Management"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150913-Disaster-Management"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150913-Disaster-Management"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3150913-Disaster-Management"
      }
    ],
    "description": "Complete GTU Syllabus study material for Disaster Management (3150913), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170901",
    "subjectCode": "2170901",
    "subjectName": "Interconnected Power System",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170901-Interconnected-Power-System",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Interconnected Power System",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170901-Interconnected-Power-System"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Interconnected Power System",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170901-Interconnected-Power-System"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170901-Interconnected-Power-System"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170901-Interconnected-Power-System"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170901-Interconnected-Power-System"
      }
    ],
    "description": "Complete GTU Syllabus study material for Interconnected Power System (2170901), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170906",
    "subjectCode": "2170906",
    "subjectName": "Advanced Power Electronics",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170906-Advanced-Power--Electronics",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Advanced Power Electronics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170906-Advanced-Power--Electronics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Advanced Power Electronics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170906-Advanced-Power--Electronics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170906-Advanced-Power--Electronics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170906-Advanced-Power--Electronics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170906-Advanced-Power--Electronics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Advanced Power Electronics (2170906), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170908",
    "subjectCode": "2170908",
    "subjectName": "Switch Gear and Protection",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170908-Switch-Gear-and-Protection",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Switch Gear and Protection",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170908-Switch-Gear-and-Protection"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Switch Gear and Protection",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170908-Switch-Gear-and-Protection"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170908-Switch-Gear-and-Protection"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170908-Switch-Gear-and-Protection"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170908-Switch-Gear-and-Protection"
      }
    ],
    "description": "Complete GTU Syllabus study material for Switch Gear and Protection (2170908), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2170909",
    "subjectCode": "2170909",
    "subjectName": "Design of AC Machines",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2170909-Design-of--AC-Machines",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Design of AC Machines",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170909-Design-of--AC-Machines"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Design of AC Machines",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170909-Design-of--AC-Machines"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170909-Design-of--AC-Machines"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170909-Design-of--AC-Machines"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2170909-Design-of--AC-Machines"
      }
    ],
    "description": "Complete GTU Syllabus study material for Design of AC Machines (2170909), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2180903",
    "subjectCode": "2180903",
    "subjectName": "Power System Planning And Design",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2180903-Power-System-Planning-And-Design",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Power System Planning And Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180903-Power-System-Planning-And-Design"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Power System Planning And Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180903-Power-System-Planning-And-Design"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180903-Power-System-Planning-And-Design"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180903-Power-System-Planning-And-Design"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180903-Power-System-Planning-And-Design"
      }
    ],
    "description": "Complete GTU Syllabus study material for Power System Planning And Design (2180903), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2180911",
    "subjectCode": "2180911",
    "subjectName": "Power Quality and Management",
    "degree": "BE",
    "department": "Electrical Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2180911-Power-Quality-and-Management",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Power Quality and Management",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180911-Power-Quality-and-Management"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Power Quality and Management",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180911-Power-Quality-and-Management"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180911-Power-Quality-and-Management"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180911-Power-Quality-and-Management"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2180911-Power-Quality-and-Management"
      }
    ],
    "description": "Complete GTU Syllabus study material for Power Quality and Management (2180911), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110003",
    "subjectCode": "3110003",
    "subjectName": "Programming for Problem Solving",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving",
    "resourceTypes": [
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Programming for Problem Solving",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Programming for Problem Solving",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110003-Programming-for-Problem-Solving"
      }
    ],
    "description": "Complete GTU Syllabus study material for Programming for Problem Solving (3110003), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110006",
    "subjectCode": "3110006",
    "subjectName": "Basic Mechanical Engineering",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Basic Mechanical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Basic Mechanical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110006-Basic-Mechanical-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Basic Mechanical Engineering (3110006), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110007",
    "subjectCode": "3110007",
    "subjectName": "Environmental Science",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Environmental Science",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Environmental Science",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110007-Environmental-Science"
      }
    ],
    "description": "Complete GTU Syllabus study material for Environmental Science (3110007), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110011",
    "subjectCode": "3110011",
    "subjectName": "Physics Group - I",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Physics Group - I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Physics Group - I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110011-Physics-Group---I"
      }
    ],
    "description": "Complete GTU Syllabus study material for Physics Group - I (3110011), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110014",
    "subjectCode": "3110014",
    "subjectName": "Mathematics-I",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 1,
    "credits": 5,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Mathematics-I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Mathematics-I",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110014-Mathematics-I"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mathematics-I (3110014), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110005",
    "subjectCode": "3110005",
    "subjectName": "Basic Electrical Engineering",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 1,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Basic Electrical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Basic Electrical Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110005-Basic-Electrical-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Basic Electrical Engineering (3110005), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110013",
    "subjectCode": "3110013",
    "subjectName": "Engineering Graphics & Design",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 2,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Engineering Graphics & Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Engineering Graphics & Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110013-Engineering-Graphics-And-Design"
      }
    ],
    "description": "Complete GTU Syllabus study material for Engineering Graphics & Design (3110013), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3110015",
    "subjectCode": "3110015",
    "subjectName": "Mathematics-II",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 2,
    "credits": 5,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Mathematics-II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Mathematics-II",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3110015-Mathematics-II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mathematics-II (3110015), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130004",
    "subjectCode": "3130004",
    "subjectName": "Effective Technical Communication",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication",
    "resourceTypes": [
      "e-Notes",
      "Presentations",
      "Video Lectures"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Effective Technical Communication",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Effective Technical Communication",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130004-Effective-Technical-Communication"
      }
    ],
    "description": "Complete GTU Syllabus study material for Effective Technical Communication (3130004), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130005",
    "subjectCode": "3130005",
    "subjectName": "Complex Variables and Partial Differential Equations",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130005-Complex-Variables-and-Partial-Differential-Equations",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Complex Variables and Partial Differential Equations",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130005-Complex-Variables-and-Partial-Differential-Equations"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Complex Variables and Partial Differential Equations",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130005-Complex-Variables-and-Partial-Differential-Equations"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130005-Complex-Variables-and-Partial-Differential-Equations"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130005-Complex-Variables-and-Partial-Differential-Equations"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130005-Complex-Variables-and-Partial-Differential-Equations"
      }
    ],
    "description": "Complete GTU Syllabus study material for Complex Variables and Partial Differential Equations (3130005), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3130007",
    "subjectCode": "3130007",
    "subjectName": "Indian Constitution",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Indian Constitution",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Indian Constitution",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3130007-Indian-Constitution"
      }
    ],
    "description": "Complete GTU Syllabus study material for Indian Constitution (3130007), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3131904",
    "subjectCode": "3131904",
    "subjectName": "Material Science And Metallurgy",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3131904-Material-Science-And-Metallurgy",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Material Science And Metallurgy",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131904-Material-Science-And-Metallurgy"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Material Science And Metallurgy",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131904-Material-Science-And-Metallurgy"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131904-Material-Science-And-Metallurgy"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131904-Material-Science-And-Metallurgy"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131904-Material-Science-And-Metallurgy"
      }
    ],
    "description": "Complete GTU Syllabus study material for Material Science And Metallurgy (3131904), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3131905",
    "subjectCode": "3131905",
    "subjectName": "Engineering Thermodynamics",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3131905-Engineering-Thermodynamics",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Engineering Thermodynamics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131905-Engineering-Thermodynamics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Engineering Thermodynamics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131905-Engineering-Thermodynamics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131905-Engineering-Thermodynamics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131905-Engineering-Thermodynamics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131905-Engineering-Thermodynamics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Engineering Thermodynamics (3131905), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3131906",
    "subjectCode": "3131906",
    "subjectName": "Kinematics And Theory Of Machines",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 3,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3131906-Kinematics-And-Theory-Of-Machines",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Kinematics And Theory Of Machines",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131906-Kinematics-And-Theory-Of-Machines"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Kinematics And Theory Of Machines",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131906-Kinematics-And-Theory-Of-Machines"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131906-Kinematics-And-Theory-Of-Machines"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131906-Kinematics-And-Theory-Of-Machines"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3131906-Kinematics-And-Theory-Of-Machines"
      }
    ],
    "description": "Complete GTU Syllabus study material for Kinematics And Theory Of Machines (3131906), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3141901",
    "subjectCode": "3141901",
    "subjectName": "Mechanical Measurement and Metrology",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3141901-Mechanical-Measurement-and-Metrology",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Mechanical Measurement and Metrology",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141901-Mechanical-Measurement-and-Metrology"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Mechanical Measurement and Metrology",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141901-Mechanical-Measurement-and-Metrology"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141901-Mechanical-Measurement-and-Metrology"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141901-Mechanical-Measurement-and-Metrology"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141901-Mechanical-Measurement-and-Metrology"
      }
    ],
    "description": "Complete GTU Syllabus study material for Mechanical Measurement and Metrology (3141901), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3141906",
    "subjectCode": "3141906",
    "subjectName": "Fluid Mechanics and Hydraulic Machines",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3141906-Fluid-Mechanics-and-Hydraulic-Machines",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Fluid Mechanics and Hydraulic Machines",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141906-Fluid-Mechanics-and-Hydraulic-Machines"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Fluid Mechanics and Hydraulic Machines",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141906-Fluid-Mechanics-and-Hydraulic-Machines"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141906-Fluid-Mechanics-and-Hydraulic-Machines"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141906-Fluid-Mechanics-and-Hydraulic-Machines"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141906-Fluid-Mechanics-and-Hydraulic-Machines"
      }
    ],
    "description": "Complete GTU Syllabus study material for Fluid Mechanics and Hydraulic Machines (3141906), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3141907",
    "subjectCode": "3141907",
    "subjectName": "Fundamentals of Machine Design",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3141907-Fundamentals-of-Machine-Design",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Fundamentals of Machine Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141907-Fundamentals-of-Machine-Design"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Fundamentals of Machine Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141907-Fundamentals-of-Machine-Design"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141907-Fundamentals-of-Machine-Design"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141907-Fundamentals-of-Machine-Design"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141907-Fundamentals-of-Machine-Design"
      }
    ],
    "description": "Complete GTU Syllabus study material for Fundamentals of Machine Design (3141907), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3141908",
    "subjectCode": "3141908",
    "subjectName": "Manufacturing Processes",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3141908-Manufacturing-Processes",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Manufacturing Processes",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141908-Manufacturing-Processes"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Manufacturing Processes",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141908-Manufacturing-Processes"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141908-Manufacturing-Processes"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141908-Manufacturing-Processes"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141908-Manufacturing-Processes"
      }
    ],
    "description": "Complete GTU Syllabus study material for Manufacturing Processes (3141908), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3141909",
    "subjectCode": "3141909",
    "subjectName": "Organizational Behavior",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 4,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3141909-Organizational-Behavior",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Organizational Behavior",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141909-Organizational-Behavior"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Organizational Behavior",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141909-Organizational-Behavior"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141909-Organizational-Behavior"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141909-Organizational-Behavior"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3141909-Organizational-Behavior"
      }
    ],
    "description": "Complete GTU Syllabus study material for Organizational Behavior (3141909), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3151909",
    "subjectCode": "3151909",
    "subjectName": "Heat Transfer",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3151909-Heat-Transfer",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Heat Transfer",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151909-Heat-Transfer"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Heat Transfer",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151909-Heat-Transfer"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151909-Heat-Transfer"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151909-Heat-Transfer"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151909-Heat-Transfer"
      }
    ],
    "description": "Complete GTU Syllabus study material for Heat Transfer (3151909), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3151910",
    "subjectCode": "3151910",
    "subjectName": "Operation Research",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3151910-Operation-Research",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Operation Research",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151910-Operation-Research"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Operation Research",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151910-Operation-Research"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151910-Operation-Research"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151910-Operation-Research"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151910-Operation-Research"
      }
    ],
    "description": "Complete GTU Syllabus study material for Operation Research (3151910), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3151911",
    "subjectCode": "3151911",
    "subjectName": "Dynamics of Machinery",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3151911-Dynamics-of-Machinery",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Dynamics of Machinery",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151911-Dynamics-of-Machinery"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Dynamics of Machinery",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151911-Dynamics-of-Machinery"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151911-Dynamics-of-Machinery"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151911-Dynamics-of-Machinery"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151911-Dynamics-of-Machinery"
      }
    ],
    "description": "Complete GTU Syllabus study material for Dynamics of Machinery (3151911), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3151912",
    "subjectCode": "3151912",
    "subjectName": "Manufacturing Technology",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3151912-Manufacturing-Technology",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Manufacturing Technology",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151912-Manufacturing-Technology"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Manufacturing Technology",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151912-Manufacturing-Technology"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151912-Manufacturing-Technology"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151912-Manufacturing-Technology"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151912-Manufacturing-Technology"
      }
    ],
    "description": "Complete GTU Syllabus study material for Manufacturing Technology (3151912), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3151913",
    "subjectCode": "3151913",
    "subjectName": "Oil Hydraulics and Pneumatics (Open Elective-1)",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3151913-Oil-Hydraulics-and-Pneumatics--Open-Elective-1",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Oil Hydraulics and Pneumatics (Open Elective-1)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151913-Oil-Hydraulics-and-Pneumatics--Open-Elective-1"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Oil Hydraulics and Pneumatics (Open Elective-1)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151913-Oil-Hydraulics-and-Pneumatics--Open-Elective-1"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151913-Oil-Hydraulics-and-Pneumatics--Open-Elective-1"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151913-Oil-Hydraulics-and-Pneumatics--Open-Elective-1"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3151913-Oil-Hydraulics-and-Pneumatics--Open-Elective-1"
      }
    ],
    "description": "Complete GTU Syllabus study material for Oil Hydraulics and Pneumatics (Open Elective-1) (3151913), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3161903",
    "subjectCode": "3161903",
    "subjectName": "Computer Aided Design (Professional Elective - I)",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3161903-Computer-Aided-Design--Professional-Elective---I",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Computer Aided Design (Professional Elective - I)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161903-Computer-Aided-Design--Professional-Elective---I"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Computer Aided Design (Professional Elective - I)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161903-Computer-Aided-Design--Professional-Elective---I"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161903-Computer-Aided-Design--Professional-Elective---I"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161903-Computer-Aided-Design--Professional-Elective---I"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161903-Computer-Aided-Design--Professional-Elective---I"
      }
    ],
    "description": "Complete GTU Syllabus study material for Computer Aided Design (Professional Elective - I) (3161903), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3161910",
    "subjectCode": "3161910",
    "subjectName": "Applied Thermodynamics",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3161910-Applied-Thermodynamics",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Applied Thermodynamics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161910-Applied-Thermodynamics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Applied Thermodynamics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161910-Applied-Thermodynamics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161910-Applied-Thermodynamics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161910-Applied-Thermodynamics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161910-Applied-Thermodynamics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Applied Thermodynamics (3161910), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3161917",
    "subjectCode": "3161917",
    "subjectName": "Computer Aided Manufacturing (Professional Elective - II)",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3161917-Computer-Aided-Manufacturing--Professional-Elective---II",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Computer Aided Manufacturing (Professional Elective - II)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161917-Computer-Aided-Manufacturing--Professional-Elective---II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Computer Aided Manufacturing (Professional Elective - II)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161917-Computer-Aided-Manufacturing--Professional-Elective---II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161917-Computer-Aided-Manufacturing--Professional-Elective---II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161917-Computer-Aided-Manufacturing--Professional-Elective---II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161917-Computer-Aided-Manufacturing--Professional-Elective---II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Computer Aided Manufacturing (Professional Elective - II) (3161917), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3161922",
    "subjectCode": "3161922",
    "subjectName": "Advanced Manufacturing Processes (Professional Elective - III)",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3161922-Advanced-Manufacturing-Processes--Professional-Elective---III",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Advanced Manufacturing Processes (Professional Elective - III)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161922-Advanced-Manufacturing-Processes--Professional-Elective---III"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Advanced Manufacturing Processes (Professional Elective - III)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161922-Advanced-Manufacturing-Processes--Professional-Elective---III"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161922-Advanced-Manufacturing-Processes--Professional-Elective---III"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161922-Advanced-Manufacturing-Processes--Professional-Elective---III"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161922-Advanced-Manufacturing-Processes--Professional-Elective---III"
      }
    ],
    "description": "Complete GTU Syllabus study material for Advanced Manufacturing Processes (Professional Elective - III) (3161922), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-3161926",
    "subjectCode": "3161926",
    "subjectName": "Industry 4.0 (Open Elective -II)",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3161926-Industry-40--Open-Elective--II",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Industry 4.0 (Open Elective -II)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161926-Industry-40--Open-Elective--II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Industry 4.0 (Open Elective -II)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161926-Industry-40--Open-Elective--II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161926-Industry-40--Open-Elective--II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161926-Industry-40--Open-Elective--II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3161926-Industry-40--Open-Elective--II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Industry 4.0 (Open Elective -II) (3161926), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2171901",
    "subjectCode": "2171901",
    "subjectName": "Operation Research",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2171901-Operation-Research",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Operation Research",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171901-Operation-Research"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Operation Research",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171901-Operation-Research"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171901-Operation-Research"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171901-Operation-Research"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171901-Operation-Research"
      }
    ],
    "description": "Complete GTU Syllabus study material for Operation Research (2171901), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2171903",
    "subjectCode": "2171903",
    "subjectName": "Computer Aided Manufacturing",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2171903-Computer-Aided-Manufacturing",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Computer Aided Manufacturing",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171903-Computer-Aided-Manufacturing"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Computer Aided Manufacturing",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171903-Computer-Aided-Manufacturing"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171903-Computer-Aided-Manufacturing"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171903-Computer-Aided-Manufacturing"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171903-Computer-Aided-Manufacturing"
      }
    ],
    "description": "Complete GTU Syllabus study material for Computer Aided Manufacturing (2171903), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2171909",
    "subjectCode": "2171909",
    "subjectName": "Machine Design",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2171909-Machine-Design",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Machine Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171909-Machine-Design"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Machine Design",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171909-Machine-Design"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171909-Machine-Design"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171909-Machine-Design"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171909-Machine-Design"
      }
    ],
    "description": "Complete GTU Syllabus study material for Machine Design (2171909), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2171910",
    "subjectCode": "2171910",
    "subjectName": "Power Plant Engineering",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2171910-Power-Plant-Engineering",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Power Plant Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171910-Power-Plant-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Power Plant Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171910-Power-Plant-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171910-Power-Plant-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171910-Power-Plant-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171910-Power-Plant-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Power Plant Engineering (2171910), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2171912",
    "subjectCode": "2171912",
    "subjectName": "Oil Hydraulics and Pneumatics",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 7,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2171912-Oil-Hydraulics-and-Pneumatics",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Oil Hydraulics and Pneumatics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171912-Oil-Hydraulics-and-Pneumatics"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Oil Hydraulics and Pneumatics",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171912-Oil-Hydraulics-and-Pneumatics"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171912-Oil-Hydraulics-and-Pneumatics"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171912-Oil-Hydraulics-and-Pneumatics"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2171912-Oil-Hydraulics-and-Pneumatics"
      }
    ],
    "description": "Complete GTU Syllabus study material for Oil Hydraulics and Pneumatics (2171912), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2181910",
    "subjectCode": "2181910",
    "subjectName": "Renewable Energy Engineering",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2181910-Renewable-Energy-Engineering",
    "resourceTypes": [
      "e-Notes",
      "GTU Paper Analysis"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Renewable Energy Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181910-Renewable-Energy-Engineering"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Renewable Energy Engineering",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181910-Renewable-Energy-Engineering"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181910-Renewable-Energy-Engineering"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181910-Renewable-Energy-Engineering"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181910-Renewable-Energy-Engineering"
      }
    ],
    "description": "Complete GTU Syllabus study material for Renewable Energy Engineering (2181910), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2181913",
    "subjectCode": "2181913",
    "subjectName": "Product Design and Value Engineering (Departmental Elective II)",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2181913-Product-Design-and-Value-Engineering--Departmental-Elective-II",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Product Design and Value Engineering (Departmental Elective II)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181913-Product-Design-and-Value-Engineering--Departmental-Elective-II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Product Design and Value Engineering (Departmental Elective II)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181913-Product-Design-and-Value-Engineering--Departmental-Elective-II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181913-Product-Design-and-Value-Engineering--Departmental-Elective-II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181913-Product-Design-and-Value-Engineering--Departmental-Elective-II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181913-Product-Design-and-Value-Engineering--Departmental-Elective-II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Product Design and Value Engineering (Departmental Elective II) (2181913), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2181914",
    "subjectCode": "2181914",
    "subjectName": "Rapid Prototyping (Departmental Elective II)",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2181914-Rapid-Prototyping--Departmental-Elective-II",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Rapid Prototyping (Departmental Elective II)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181914-Rapid-Prototyping--Departmental-Elective-II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Rapid Prototyping (Departmental Elective II)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181914-Rapid-Prototyping--Departmental-Elective-II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181914-Rapid-Prototyping--Departmental-Elective-II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181914-Rapid-Prototyping--Departmental-Elective-II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181914-Rapid-Prototyping--Departmental-Elective-II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Rapid Prototyping (Departmental Elective II) (2181914), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "BE-2181920",
    "subjectCode": "2181920",
    "subjectName": "Quality Engineering (Departmental Elective II)",
    "degree": "BE",
    "department": "Mechanical Engineering",
    "semester": 8,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/2181920-Quality-Engineering--Departmental-Elective-II",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Quality Engineering (Departmental Elective II)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181920-Quality-Engineering--Departmental-Elective-II"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Quality Engineering (Departmental Elective II)",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181920-Quality-Engineering--Departmental-Elective-II"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181920-Quality-Engineering--Departmental-Elective-II"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181920-Quality-Engineering--Departmental-Elective-II"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/2181920-Quality-Engineering--Departmental-Elective-II"
      }
    ],
    "description": "Complete GTU Syllabus study material for Quality Engineering (Departmental Elective II) (2181920), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "Diploma-3350701",
    "subjectCode": "3350701",
    "subjectName": "Computer Maintenance And Trouble Shooting",
    "degree": "Diploma",
    "department": "Computer Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3350701-Computer-Maintenance-And-Trouble-Shooting",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Computer Maintenance And Trouble Shooting",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350701-Computer-Maintenance-And-Trouble-Shooting"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Computer Maintenance And Trouble Shooting",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350701-Computer-Maintenance-And-Trouble-Shooting"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350701-Computer-Maintenance-And-Trouble-Shooting"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350701-Computer-Maintenance-And-Trouble-Shooting"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350701-Computer-Maintenance-And-Trouble-Shooting"
      }
    ],
    "description": "Complete GTU Syllabus study material for Computer Maintenance And Trouble Shooting (3350701), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "Diploma-3350702",
    "subjectCode": "3350702",
    "subjectName": "Dynamic Web Page Development",
    "degree": "Diploma",
    "department": "Computer Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3350702-Dynamic-Web-Page-Development",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Dynamic Web Page Development",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350702-Dynamic-Web-Page-Development"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Dynamic Web Page Development",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350702-Dynamic-Web-Page-Development"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350702-Dynamic-Web-Page-Development"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350702-Dynamic-Web-Page-Development"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350702-Dynamic-Web-Page-Development"
      }
    ],
    "description": "Complete GTU Syllabus study material for Dynamic Web Page Development (3350702), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "Diploma-3350703",
    "subjectCode": "3350703",
    "subjectName": "Java Programming",
    "degree": "Diploma",
    "department": "Computer Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3350703-Java-Programming",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Java Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350703-Java-Programming"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Java Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350703-Java-Programming"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350703-Java-Programming"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350703-Java-Programming"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350703-Java-Programming"
      }
    ],
    "description": "Complete GTU Syllabus study material for Java Programming (3350703), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "Diploma-3350705",
    "subjectCode": "3350705",
    "subjectName": "Multimedia And Animation Techniques",
    "degree": "Diploma",
    "department": "Computer Engineering",
    "semester": 5,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3350705-Multimedia-And-Animation-Techniques",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Multimedia And Animation Techniques",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350705-Multimedia-And-Animation-Techniques"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Multimedia And Animation Techniques",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350705-Multimedia-And-Animation-Techniques"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350705-Multimedia-And-Animation-Techniques"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350705-Multimedia-And-Animation-Techniques"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3350705-Multimedia-And-Animation-Techniques"
      }
    ],
    "description": "Complete GTU Syllabus study material for Multimedia And Animation Techniques (3350705), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "Diploma-3360701",
    "subjectCode": "3360701",
    "subjectName": "Advance Java Programming",
    "degree": "Diploma",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3360701-Advance-Java-Programming",
    "resourceTypes": [
      "e-Notes",
      "Presentations"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Advance Java Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360701-Advance-Java-Programming"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Advance Java Programming",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360701-Advance-Java-Programming"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360701-Advance-Java-Programming"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360701-Advance-Java-Programming"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360701-Advance-Java-Programming"
      }
    ],
    "description": "Complete GTU Syllabus study material for Advance Java Programming (3360701), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "Diploma-3360705",
    "subjectCode": "3360705",
    "subjectName": "Dynamic Webpage With Scripting Language",
    "degree": "Diploma",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3360705-Dynamic-Webpage-With-Scripting-Language",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Dynamic Webpage With Scripting Language",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360705-Dynamic-Webpage-With-Scripting-Language"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Dynamic Webpage With Scripting Language",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360705-Dynamic-Webpage-With-Scripting-Language"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360705-Dynamic-Webpage-With-Scripting-Language"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360705-Dynamic-Webpage-With-Scripting-Language"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360705-Dynamic-Webpage-With-Scripting-Language"
      }
    ],
    "description": "Complete GTU Syllabus study material for Dynamic Webpage With Scripting Language (3360705), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  },
  {
    "id": "Diploma-3360706",
    "subjectCode": "3360706",
    "subjectName": "Advance Web Technology",
    "degree": "Diploma",
    "department": "Computer Engineering",
    "semester": 6,
    "credits": 4,
    "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/3360706-Advance-Web-Technology",
    "resourceTypes": [
      "e-Notes"
    ],
    "units": [
      {
        "unitNo": 1,
        "title": "Introduction & Fundamentals of Advance Web Technology",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360706-Advance-Web-Technology"
      },
      {
        "unitNo": 2,
        "title": "Core Concepts & Architecture of Advance Web Technology",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360706-Advance-Web-Technology"
      },
      {
        "unitNo": 3,
        "title": "Design, Analysis & Implementation Methodologies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360706-Advance-Web-Technology"
      },
      {
        "unitNo": 4,
        "title": "Advanced Topics, Practical Algorithms & Case Studies",
        "type": "e-Notes",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360706-Advance-Web-Technology"
      },
      {
        "unitNo": 5,
        "title": "GTU Question Bank & Model Solved Papers",
        "type": "Paper Analysis",
        "url": "https://www.darshan.ac.in/gtu-study-material/3360706-Advance-Web-Technology"
      }
    ],
    "description": "Complete GTU Syllabus study material for Advance Web Technology (3360706), including chapter-wise e-Notes, PPT slide decks, practical lab manuals, and GTU previous exam paper solutions."
  }
,
  {
  "id": "DI-4310001",
  "subjectCode": "4310001",
  "subjectName": "Basic Mathematics",
  "degree": "Diploma",
  "department": "Diploma Engineering",
  "semester": 1,
  "credits": 4,
  "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/4310001-Basic-Mathematics",
  "resourceTypes": [
    "e-Notes",
    "Presentations",
    "Paper Solutions"
  ],
  "description": "Fundamental mathematics, logarithms, trigonometry, and matrices for diploma engineering.",
  "units": [
    {
      "unitNo": 1,
      "title": "Unit 1: Logarithms & Determinants",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1HmLLLXreVlFmL-Ybu3Ol_InoDO1h-zCP",
      "fileSize": "3.2 MB"
    },
    {
      "unitNo": 2,
      "title": "Unit 2: Trigonometry & Functions",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1ve2_gaEHhZCCg_bioUONpssnua96QO13",
      "fileSize": "2.8 MB"
    },
    {
      "unitNo": 3,
      "title": "Unit 3: Vectors & Coordinate Geometry",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1ewMicj8Ng_MlC4m0ES4U_X6vs5nUY4WE",
      "fileSize": "3.5 MB"
    }
  ]
},
  {
  "id": "DI-4320002",
  "subjectCode": "4320002",
  "subjectName": "Applied Mathematics",
  "degree": "Diploma",
  "department": "Diploma Engineering",
  "semester": 2,
  "credits": 4,
  "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/4320002-Applied-Mathematics",
  "resourceTypes": [
    "e-Notes",
    "Presentations",
    "Paper Solutions"
  ],
  "description": "Differentiation, integration, statistics, and differential equations for diploma engineering.",
  "units": [
    {
      "unitNo": 1,
      "title": "Unit 1: Differential Calculus",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7u",
      "fileSize": "3.1 MB"
    },
    {
      "unitNo": 2,
      "title": "Unit 2: Integral Calculus",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7v",
      "fileSize": "4.0 MB"
    },
    {
      "unitNo": 3,
      "title": "Unit 3: Differential Equations & Statistics",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7w",
      "fileSize": "2.9 MB"
    }
  ]
},
  {
  "id": "DI-4330701",
  "subjectCode": "4330701",
  "subjectName": "Data Structures",
  "degree": "Diploma",
  "department": "Diploma Engineering",
  "semester": 3,
  "credits": 5,
  "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/4330701-Data-Structures",
  "resourceTypes": [
    "e-Notes",
    "Lab Manuals",
    "Presentations"
  ],
  "description": "Linear and non-linear data structures, stacks, queues, linked lists, trees, graphs, and searching & sorting.",
  "units": [
    {
      "unitNo": 1,
      "title": "Unit 1: Introduction to Data Structures & Arrays",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7x",
      "fileSize": "3.5 MB"
    },
    {
      "unitNo": 2,
      "title": "Unit 2: Stacks and Queues Implementation",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7y",
      "fileSize": "4.2 MB"
    },
    {
      "unitNo": 3,
      "title": "Unit 3: Linked Lists (Singly, Doubly, Circular)",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7z",
      "fileSize": "3.8 MB"
    },
    {
      "unitNo": 4,
      "title": "Unit 4: Trees and Binary Search Trees",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f70",
      "fileSize": "4.5 MB"
    },
    {
      "unitNo": 5,
      "title": "Unit 5: Graphs & Sorting Algorithms",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f71",
      "fileSize": "3.9 MB"
    }
  ]
},
  {
  "id": "DI-4330702",
  "subjectCode": "4330702",
  "subjectName": "Database Management Systems",
  "degree": "Diploma",
  "department": "Diploma Engineering",
  "semester": 3,
  "credits": 5,
  "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/4330702-Database-Management-Systems",
  "resourceTypes": [
    "e-Notes",
    "Lab Manuals",
    "Presentations"
  ],
  "description": "Relational database concepts, SQL queries, normalization, PL/SQL, indexing, and transaction processing.",
  "units": [
    {
      "unitNo": 1,
      "title": "Unit 1: DBMS Architecture & ER Modeling",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f72",
      "fileSize": "3.4 MB"
    },
    {
      "unitNo": 2,
      "title": "Unit 2: Relational Data Model & Keys",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f73",
      "fileSize": "2.9 MB"
    },
    {
      "unitNo": 3,
      "title": "Unit 3: SQL DDL, DML, DCL & Joins",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f74",
      "fileSize": "4.8 MB"
    },
    {
      "unitNo": 4,
      "title": "Unit 4: Normalization (1NF, 2NF, 3NF, BCNF)",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f75",
      "fileSize": "3.1 MB"
    },
    {
      "unitNo": 5,
      "title": "Unit 5: PL/SQL, Triggers & Cursors",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f76",
      "fileSize": "3.6 MB"
    }
  ]
},
  {
  "id": "DI-4340701",
  "subjectCode": "4340701",
  "subjectName": "Advanced Java Programming",
  "degree": "Diploma",
  "department": "Diploma Engineering",
  "semester": 4,
  "credits": 5,
  "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/4340701-Advanced-Java-Programming",
  "resourceTypes": [
    "e-Notes",
    "Lab Manuals",
    "Presentations"
  ],
  "description": "Swing GUI development, JDBC database connectivity, Servlets, JSP, JavaBeans, and network socket programming.",
  "units": [
    {
      "unitNo": 1,
      "title": "Unit 1: Swing GUI Components & Event Handling",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f77",
      "fileSize": "4.1 MB"
    },
    {
      "unitNo": 2,
      "title": "Unit 2: JDBC Architecture & CRUD Operations",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f78",
      "fileSize": "3.7 MB"
    },
    {
      "unitNo": 3,
      "title": "Unit 3: Java Servlets & Session Tracking",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f79",
      "fileSize": "4.4 MB"
    },
    {
      "unitNo": 4,
      "title": "Unit 4: JavaServer Pages (JSP) & Taglibs",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7a",
      "fileSize": "3.8 MB"
    }
  ]
},
  {
  "id": "DI-4340702",
  "subjectCode": "4340702",
  "subjectName": "Computer Networks & Security",
  "degree": "Diploma",
  "department": "Diploma Engineering",
  "semester": 4,
  "credits": 4,
  "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/4340702-Computer-Networks-Security",
  "resourceTypes": [
    "e-Notes",
    "Presentations",
    "Paper Solutions"
  ],
  "description": "OSI and TCP/IP reference models, routing, switching, cryptography, firewalls, and cyber security fundamentals.",
  "units": [
    {
      "unitNo": 1,
      "title": "Unit 1: Networking Basics & Physical Layer",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7b",
      "fileSize": "3.5 MB"
    },
    {
      "unitNo": 2,
      "title": "Unit 2: Data Link Layer & MAC Protocols",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7c",
      "fileSize": "3.2 MB"
    },
    {
      "unitNo": 3,
      "title": "Unit 3: Network & Transport Layer (IP, TCP, UDP)",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7d",
      "fileSize": "4.1 MB"
    },
    {
      "unitNo": 4,
      "title": "Unit 4: Network Security, Cryptography & Firewalls",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7e",
      "fileSize": "3.9 MB"
    }
  ]
},
  {
  "id": "DI-4350701",
  "subjectCode": "4350701",
  "subjectName": "Python Programming",
  "degree": "Diploma",
  "department": "Diploma Engineering",
  "semester": 5,
  "credits": 5,
  "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/4350701-Python-Programming",
  "resourceTypes": [
    "e-Notes",
    "Lab Manuals",
    "Presentations"
  ],
  "description": "Python data structures, OOPs, modules, NumPy, Pandas, file handling, and GUI development with Tkinter.",
  "units": [
    {
      "unitNo": 1,
      "title": "Unit 1: Python Basics & Control Flow",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7f",
      "fileSize": "3.6 MB"
    },
    {
      "unitNo": 2,
      "title": "Unit 2: Lists, Tuples, Dictionaries & Sets",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7g",
      "fileSize": "3.4 MB"
    },
    {
      "unitNo": 3,
      "title": "Unit 3: Functions, Modules & Packages",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7h",
      "fileSize": "3.1 MB"
    },
    {
      "unitNo": 4,
      "title": "Unit 4: OOP Concepts in Python & File I/O",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7i",
      "fileSize": "4.0 MB"
    },
    {
      "unitNo": 5,
      "title": "Unit 5: Data Analysis with NumPy & Pandas",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7j",
      "fileSize": "4.5 MB"
    }
  ]
},
  {
  "id": "DI-4350702",
  "subjectCode": "4350702",
  "subjectName": "Web Development with PHP",
  "degree": "Diploma",
  "department": "Diploma Engineering",
  "semester": 5,
  "credits": 5,
  "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/4350702-Web-Development-PHP",
  "resourceTypes": [
    "e-Notes",
    "Lab Manuals",
    "Presentations"
  ],
  "description": "PHP syntax, form processing, MySQL database integration, cookies, sessions, and building dynamic CRUD web apps.",
  "units": [
    {
      "unitNo": 1,
      "title": "Unit 1: HTML5, CSS3 & JavaScript Integration",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7k",
      "fileSize": "3.8 MB"
    },
    {
      "unitNo": 2,
      "title": "Unit 2: PHP Syntax, Variables & Superglobals",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7l",
      "fileSize": "3.3 MB"
    },
    {
      "unitNo": 3,
      "title": "Unit 3: Form Handling & Session Management",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7m",
      "fileSize": "3.9 MB"
    },
    {
      "unitNo": 4,
      "title": "Unit 4: PHP & MySQL Database Connectivity",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7n",
      "fileSize": "4.6 MB"
    }
  ]
},
  {
  "id": "DI-4360701",
  "subjectCode": "4360701",
  "subjectName": "Mobile Application Development (Android)",
  "degree": "Diploma",
  "department": "Diploma Engineering",
  "semester": 6,
  "credits": 5,
  "darshanUrl": "https://www.darshan.ac.in/gtu-study-material/4360701-Mobile-App-Development",
  "resourceTypes": [
    "e-Notes",
    "Lab Manuals",
    "Presentations"
  ],
  "description": "Android Studio, Activity lifecycle, Intents, UI layouts, SQLite local database, and publishing mobile apps.",
  "units": [
    {
      "unitNo": 1,
      "title": "Unit 1: Android Architecture & App Structure",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7o",
      "fileSize": "3.7 MB"
    },
    {
      "unitNo": 2,
      "title": "Unit 2: Android UI Layouts, Views & Event Listeners",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7p",
      "fileSize": "4.2 MB"
    },
    {
      "unitNo": 3,
      "title": "Unit 3: Intents, Broadcast Receivers & Services",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7q",
      "fileSize": "3.8 MB"
    },
    {
      "unitNo": 4,
      "title": "Unit 4: SQLite Database & Room Persistence",
      "type": "e-Notes",
      "url": "https://drive.google.com/file/d/1_9i35h3a4Zk0h5W5L6f7r",
      "fileSize": "4.5 MB"
    }
  ]
}
];

export const STUDY_DEPARTMENTS = [
  "All Departments",
  "Computer Engineering",
  "Civil Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Diploma Engineering",
];

export const RESOURCE_TYPES = [
  "All Types",
  "e-Notes",
  "Presentations",
  "GTU Paper Analysis",
  "Lab Manual",
  "Tutorials - Assignments",
  "Video Lectures",
];
