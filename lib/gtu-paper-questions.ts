export interface QuestionPart {
  label: string;
  text: string;
  marks: string;
}

export interface PaperQuestion {
  qNum: string;
  parts: QuestionPart[];
  orOption?: QuestionPart;
}

const SUBJECT_QUESTIONS_MAP: Record<string, PaperQuestion[]> = {
  // Mathematics - 1 (Calculus)
  "3110014": [
    {
      qNum: "Q.1",
      parts: [
        { label: "(a)", text: "State Rolle's theorem and verify it for f(x) = x^2 - 4x + 3 in [1, 3].", marks: "[03]" },
        { label: "(b)", text: "Expand e^(x) * sin(y) in powers of x and y using Maclaurin's series up to second degree.", marks: "[04]" },
        { label: "(c)", text: "Find the maxima and minima of the function f(x, y) = x^3 + y^3 - 3axy.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.2",
      parts: [
        { label: "(a)", text: "Test the convergence of the infinite series sum (1 / (n * (ln n)^p)).", marks: "[03]" },
        { label: "(b)", text: "Find the radius of convergence of power series sum (x^n / (n * 2^n)).", marks: "[04]" },
        { label: "(c)", text: "Evaluate the double integral integral(0 to 1) integral(x to sqrt(x)) (x^2 + y^2) dy dx by changing the order of integration.", marks: "[07]" },
      ],
      orOption: { label: "(c)", text: "Find the volume of the sphere x^2 + y^2 + z^2 = a^2 using spherical polar coordinates.", marks: "[07]" },
    },
    {
      qNum: "Q.3",
      parts: [
        { label: "(a)", text: "Evaluate limit as x->0 of (tan x - x) / (x - sin x) using L'Hopital's Rule.", marks: "[03]" },
        { label: "(b)", text: "Find the directional derivative of f(x, y, z) = 2xy + z^2 at (1, -1, 3) in the direction of vector i + 2j + 2k.", marks: "[04]" },
        { label: "(c)", text: "State Green's Theorem in a plane and evaluate line integral (xy + y^2) dx + x^2 dy around the curve bounded by y = x and y = x^2.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.4",
      parts: [
        { label: "(a)", text: "Test the convergence of alternating series sum ((-1)^(n-1) / n) using Leibniz rule.", marks: "[03]" },
        { label: "(b)", text: "Evaluate integral(0 to pi/2) sin^6(x) * cos^4(x) dx using Beta and Gamma functions.", marks: "[04]" },
        { label: "(c)", text: "Verify Divergence Theorem for F = 4x i - 2y^2 j + z^2 k over the cylinder x^2 + y^2 = 4, z = 0 and z = 3.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.5",
      parts: [
        { label: "(a)", text: "Define curl and divergence of a vector field with physical significance.", marks: "[03]" },
        { label: "(b)", text: "State Stokes' Theorem and verify it for F = (2x - y) i - y z^2 j - y^2 z k over upper half sphere.", marks: "[04]" },
        { label: "(c)", text: "Write short notes on: (1) Ratio Test (2) Lagrange Multipliers Method for constrained extrema.", marks: "[07]" },
      ],
    },
  ],

  // Programming for Problem Solving (PPS)
  "3110003": [
    {
      qNum: "Q.1",
      parts: [
        { label: "(a)", text: "Draw flowchart and write algorithm to find the largest of three given numbers.", marks: "[03]" },
        { label: "(b)", text: "Explain different data types and storage classes in C language with examples.", marks: "[04]" },
        { label: "(c)", text: "Write a complete C program to check whether a given integer is a Prime number or Armstrong number.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.2",
      parts: [
        { label: "(a)", text: "Differentiate between while loop and do-while loop with syntax and example.", marks: "[03]" },
        { label: "(b)", text: "Explain switch-case statement in C with rules and suitable demonstration code.", marks: "[04]" },
        { label: "(c)", text: "Write a C program to perform Matrix Multiplication of two 2D arrays after checking dimension compatibility.", marks: "[07]" },
      ],
      orOption: { label: "(c)", text: "Write a C program to sort an array of N integers in ascending order using Bubble Sort.", marks: "[07]" },
    },
    {
      qNum: "Q.3",
      parts: [
        { label: "(a)", text: "What is recursion? State its advantages and disadvantages.", marks: "[03]" },
        { label: "(b)", text: "Write a recursive function in C to calculate the factorial of a given positive integer.", marks: "[04]" },
        { label: "(c)", text: "Explain Call by Value and Call by Reference parameter passing mechanisms with swap function example.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.4",
      parts: [
        { label: "(a)", text: "Explain pointer declaration, initialization, and dereferencing in C.", marks: "[03]" },
        { label: "(b)", text: "Differentiate between Structure and Union with memory layout diagrams.", marks: "[04]" },
        { label: "(c)", text: "Define a structure 'Student' with roll_no, name, and marks. Write a C program to read and display records of 5 students.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.5",
      parts: [
        { label: "(a)", text: "Explain dynamic memory allocation functions: malloc(), calloc(), realloc(), and free().", marks: "[03]" },
        { label: "(b)", text: "Explain various file opening modes (r, w, a, r+, w+) in C file handling.", marks: "[04]" },
        { label: "(c)", text: "Write a C program to copy contents of one text file into another file character by character.", marks: "[07]" },
      ],
    },
  ],

  // Data Structures (DS)
  "3130702": [
    {
      qNum: "Q.1",
      parts: [
        { label: "(a)", text: "Define Data Structure. Differentiate between Primitive and Non-Primitive data structures.", marks: "[03]" },
        { label: "(b)", text: "Explain Stack data structure with its primitive operations (PUSH, POP, PEEP).", marks: "[04]" },
        { label: "(c)", text: "Write an algorithm to convert an Infix expression into Postfix notation using stack. Convert: (A + B * C) / (D - E).", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.2",
      parts: [
        { label: "(a)", text: "Explain Circular Queue and state the conditions for Queue Full and Queue Empty.", marks: "[03]" },
        { label: "(b)", text: "Write C functions for insertion and deletion operations in a Singly Linked List.", marks: "[04]" },
        { label: "(c)", text: "Explain Doubly Linked List with structure definition and node insertion at the beginning and end.", marks: "[07]" },
      ],
      orOption: { label: "(c)", text: "Explain Circular Linked List and write an algorithm to count total number of nodes.", marks: "[07]" },
    },
    {
      qNum: "Q.3",
      parts: [
        { label: "(a)", text: "Define Binary Tree, Full Binary Tree, and Complete Binary Tree with diagrams.", marks: "[03]" },
        { label: "(b)", text: "Construct a Binary Search Tree (BST) for elements: 45, 15, 79, 90, 10, 55, 12, 20, 50.", marks: "[04]" },
        { label: "(c)", text: "Explain Tree Traversal techniques (Inorder, Preorder, Postorder) with algorithms and examples.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.4",
      parts: [
        { label: "(a)", text: "Explain AVL Tree and describe LL, RR, LR, and RL rotation techniques with diagrams.", marks: "[03]" },
        { label: "(b)", text: "Explain Graph representation using Adjacency Matrix and Adjacency List.", marks: "[04]" },
        { label: "(c)", text: "Explain Breadth First Search (BFS) and Depth First Search (DFS) graph traversal algorithms.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.5",
      parts: [
        { label: "(a)", text: "Compare Linear Search and Binary Search algorithms with time complexities.", marks: "[03]" },
        { label: "(b)", text: "Explain Quick Sort algorithm with partitioning step and trace for given numbers.", marks: "[04]" },
        { label: "(c)", text: "What is Hashing? Explain Collision resolution techniques: Chaining and Open Addressing (Linear Probing).", marks: "[07]" },
      ],
    },
  ],

  // Database Management Systems (DBMS)
  "3130703": [
    {
      qNum: "Q.1",
      parts: [
        { label: "(a)", text: "What is DBMS? Explain Three-Schema Architecture with a neat block diagram.", marks: "[03]" },
        { label: "(b)", text: "Explain Data Independence and differentiate between Logical and Physical Data Independence.", marks: "[04]" },
        { label: "(c)", text: "Design an Entity-Relationship (ER) diagram for a University Management System showing entities, attributes, and relationships.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.2",
      parts: [
        { label: "(a)", text: "Explain Primary Key, Foreign Key, Candidate Key, and Super Key with examples.", marks: "[03]" },
        { label: "(b)", text: "Explain Relational Algebra fundamental operations: Select, Project, Union, Set Difference, and Cartesian Product.", marks: "[04]" },
        { label: "(c)", text: "Given Schema: Employee(emp_id, emp_name, dept_id, salary), Department(dept_id, dept_name). Write SQL queries for: (1) Find highest salary in each dept (2) Employees joined in 2023.", marks: "[07]" },
      ],
      orOption: { label: "(c)", text: "Explain various SQL Joins (INNER, LEFT OUTER, RIGHT OUTER, FULL OUTER) with syntax and output tables.", marks: "[07]" },
    },
    {
      qNum: "Q.3",
      parts: [
        { label: "(a)", text: "What is Functional Dependency? State Armstrong's Axioms for functional dependencies.", marks: "[03]" },
        { label: "(b)", text: "Explain 1NF, 2NF, and 3NF normalization forms with step-by-step table decomposition examples.", marks: "[04]" },
        { label: "(c)", text: "What is Boyce-Codd Normal Form (BCNF)? How does BCNF differ from 3NF? Explain with a counter-example.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.4",
      parts: [
        { label: "(a)", text: "Explain ACID properties of a database transaction in detail.", marks: "[03]" },
        { label: "(b)", text: "Explain Transaction State Transition Diagram with states: Active, Partially Committed, Committed, Failed, Aborted.", marks: "[04]" },
        { label: "(c)", text: "Explain Conflict Serializability and precedence graph method for conflict serializability testing.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.5",
      parts: [
        { label: "(a)", text: "Explain Two-Phase Locking (2PL) protocol and differentiate between Strict 2PL and Rigorous 2PL.", marks: "[03]" },
        { label: "(b)", text: "What is Deadlock in DBMS? Explain Deadlock Prevention and Detection mechanisms.", marks: "[04]" },
        { label: "(c)", text: "Write short notes on: (1) PL/SQL Stored Procedures and Triggers (2) Log-based Recovery Mechanisms.", marks: "[07]" },
      ],
    },
  ],

  // Operating Systems (OS)
  "3140702": [
    {
      qNum: "Q.1",
      parts: [
        { label: "(a)", text: "Define Operating System. Explain different types of OS: Batch, Time-sharing, Real-time, and Distributed.", marks: "[03]" },
        { label: "(b)", text: "Explain Dual-mode operation (User Mode and Kernel Mode) and role of System Calls.", marks: "[04]" },
        { label: "(c)", text: "Explain Process State Transition Diagram with states: New, Ready, Running, Waiting, and Terminated.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.2",
      parts: [
        { label: "(a)", text: "Explain Process Control Block (PCB) and its constituent data attributes.", marks: "[03]" },
        { label: "(b)", text: "Differentiate between Preemptive and Non-Preemptive CPU Scheduling algorithms.", marks: "[04]" },
        { label: "(c)", text: "Consider processes with Arrival Time and Burst Time: P1(0, 8), P2(1, 4), P3(2, 9), P4(3, 5). Calculate Average Turnaround Time and Waiting Time using Round Robin (Quantum = 3).", marks: "[07]" },
      ],
      orOption: { label: "(c)", text: "Calculate Average Waiting Time for Shortest Job First (Preemptive SRTF) scheduling algorithm for given processes.", marks: "[07]" },
    },
    {
      qNum: "Q.3",
      parts: [
        { label: "(a)", text: "What is Critical Section Problem? State the three mandatory requirements to solve it.", marks: "[03]" },
        { label: "(b)", text: "Explain Peterson's Algorithm for mutual exclusion of two processes.", marks: "[04]" },
        { label: "(c)", text: "Explain Semaphores (Counting and Binary) and solve the Producer-Consumer Problem using semaphores.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.4",
      parts: [
        { label: "(a)", text: "State the four necessary conditions for Deadlock occurrence.", marks: "[03]" },
        { label: "(b)", text: "Explain Banker's Algorithm for Deadlock Avoidance with Safety Algorithm.", marks: "[04]" },
        { label: "(c)", text: "Given 5 processes and 3 resource types (A, B, C). Verify whether system is in safe state using Banker's Algorithm.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.5",
      parts: [
        { label: "(a)", text: "Explain Paging memory management scheme with Page Table structure and address translation.", marks: "[03]" },
        { label: "(b)", text: "Explain Virtual Memory and calculate Page Faults for reference string using FIFO and LRU page replacement.", marks: "[04]" },
        { label: "(c)", text: "Explain Disk Scheduling algorithms (FCFS, SSTF, SCAN, C-SCAN) with a numeric example.", marks: "[07]" },
      ],
    },
  ],

  // Computer Networks (CN)
  "3150710": [
    {
      qNum: "Q.1",
      parts: [
        { label: "(a)", text: "Compare OSI Reference Model and TCP/IP Reference Model with layer-by-layer mapping.", marks: "[03]" },
        { label: "(b)", text: "Explain guided transmission media (Twisted Pair, Coaxial Cable, Fiber Optic) with characteristics.", marks: "[04]" },
        { label: "(c)", text: "Explain CRC (Cyclic Redundancy Check) error detection method. Generate CRC codeword for Message 1101011011 and Generator Polynomial x^4 + x + 1.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.2",
      parts: [
        { label: "(a)", text: "Explain Stop-and-Wait ARQ and calculate channel utilization efficiency.", marks: "[03]" },
        { label: "(b)", text: "Differentiate between Go-Back-N ARQ and Selective Repeat ARQ sliding window protocols.", marks: "[04]" },
        { label: "(c)", text: "Explain CSMA/CD protocol and explain the Exponential Backoff algorithm in Ethernet.", marks: "[07]" },
      ],
      orOption: { label: "(c)", text: "Explain Pure ALOHA and Slotted ALOHA with throughput mathematical expressions and derivations.", marks: "[07]" },
    },
    {
      qNum: "Q.3",
      parts: [
        { label: "(a)", text: "Explain IPv4 Classful and Classless (CIDR) addressing scheme with subnet mask.", marks: "[03]" },
        { label: "(b)", text: "Perform Subnetting: Given IP network 192.168.1.0/24, create 4 subnets and find Network ID, Subnet Mask, and Host Range.", marks: "[04]" },
        { label: "(c)", text: "Explain Distance Vector Routing algorithm (Bellman-Ford) and explain the Count-to-Infinity problem.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.4",
      parts: [
        { label: "(a)", text: "Explain Link State Routing algorithm (Dijkstra) with routing table updates.", marks: "[03]" },
        { label: "(b)", text: "Differentiate between IPv4 and IPv6 header structures and features.", marks: "[04]" },
        { label: "(c)", text: "Explain TCP 3-Way Handshake connection establishment and TCP 4-Way connection termination.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.5",
      parts: [
        { label: "(a)", text: "Explain TCP Congestion Control mechanisms (Slow Start, Congestion Avoidance, Fast Retransmit).", marks: "[03]" },
        { label: "(b)", text: "Explain DNS (Domain Name System) architecture, recursive vs iterative query resolution.", marks: "[04]" },
        { label: "(c)", text: "Write short notes on: (1) HTTP/HTTPS protocols (2) Dynamic Host Configuration Protocol (DHCP).", marks: "[07]" },
      ],
    },
  ],

  // Software Engineering (SE)
  "3150711": [
    {
      qNum: "Q.1",
      parts: [
        { label: "(a)", text: "Define Software Engineering. Explain the characteristics of software in comparison to hardware.", marks: "[03]" },
        { label: "(b)", text: "Compare Waterfall Model, Prototype Model, and Spiral Model with pros and cons.", marks: "[04]" },
        { label: "(c)", text: "Explain Agile Development Methodology and Scrum Framework with roles, artifacts, and sprint ceremonies.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.2",
      parts: [
        { label: "(a)", text: "Explain Software Requirement Specification (SRS) and characteristics of a good SRS document.", marks: "[03]" },
        { label: "(b)", text: "Explain Functional vs Non-Functional requirements with real-world examples.", marks: "[04]" },
        { label: "(c)", text: "Draw Data Flow Diagram (DFD Level 0, Level 1) and Use Case Diagram for an Online Food Delivery System.", marks: "[07]" },
      ],
      orOption: { label: "(c)", text: "Explain COCOMO (Constructive Cost Model) basic, intermediate, and detailed estimation methods.", marks: "[07]" },
    },
    {
      qNum: "Q.3",
      parts: [
        { label: "(a)", text: "Explain Cohesion and Coupling. Why is 'High Cohesion and Low Coupling' desired in software architecture?", marks: "[03]" },
        { label: "(b)", text: "Explain Function Point (FP) metric calculation formula with complexity adjustment factors.", marks: "[04]" },
        { label: "(c)", text: "Differentiate between Black Box Testing and White Box Testing techniques.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.4",
      parts: [
        { label: "(a)", text: "Explain Equivalence Partitioning and Boundary Value Analysis (BVA) test case design methods.", marks: "[03]" },
        { label: "(b)", text: "Explain Basis Path Testing and calculate Cyclomatic Complexity for a given Control Flow Graph.", marks: "[04]" },
        { label: "(c)", text: "Explain Levels of Testing: Unit Testing, Integration Testing (Top-Down/Bottom-Up), System Testing, and Acceptance Testing.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.5",
      parts: [
        { label: "(a)", text: "Explain Software Maintenance types: Corrective, Adaptive, Perfective, and Preventive.", marks: "[03]" },
        { label: "(b)", text: "Explain Software Configuration Management (SCM) and version control workflows.", marks: "[04]" },
        { label: "(c)", text: "Write short notes on: (1) DevOps CI/CD Pipelines (2) Software Quality Assurance (SQA) & ISO 9001 standards.", marks: "[07]" },
      ],
    },
  ],

  // Analysis and Design of Algorithms (ADA)
  "3150703": [
    {
      qNum: "Q.1",
      parts: [
        { label: "(a)", text: "Define asymptotic notations (Big-O, Omega, Theta) with mathematical formulations.", marks: "[03]" },
        { label: "(b)", text: "Explain Divide and Conquer design paradigm with suitable example.", marks: "[04]" },
        { label: "(c)", text: "Solve the recurrence relation T(n) = 2T(n/2) + n using Master Theorem and Substitution Method.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.2",
      parts: [
        { label: "(a)", text: "What is greedy algorithm strategy? State its core properties.", marks: "[03]" },
        { label: "(b)", text: "Construct optimal Huffman Coding tree for given character frequencies and compute weighted path length.", marks: "[04]" },
        { label: "(c)", text: "Explain Dijkstra's Single Source Shortest Path algorithm with step-by-step trace.", marks: "[07]" },
      ],
      orOption: { label: "(c)", text: "Explain Kruskal's algorithm for finding Minimum Spanning Tree with complexity analysis.", marks: "[07]" },
    },
    {
      qNum: "Q.3",
      parts: [
        { label: "(a)", text: "Differentiate between Dynamic Programming and Divide & Conquer.", marks: "[03]" },
        { label: "(b)", text: "Solve 0/1 Knapsack Problem using Dynamic Programming approach for given item weights and values.", marks: "[04]" },
        { label: "(c)", text: "Find Longest Common Subsequence (LCS) for sequences X = 'ABCBDAB' and Y = 'BDCABA'.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.4",
      parts: [
        { label: "(a)", text: "Explain State Space Tree representation in Backtracking.", marks: "[03]" },
        { label: "(b)", text: "Solve 4-Queens problem using Backtracking method showing state space search.", marks: "[04]" },
        { label: "(c)", text: "Explain Branch and Bound technique and solve Travelling Salesperson Problem (TSP).", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.5",
      parts: [
        { label: "(a)", text: "Define P, NP, NP-Complete, and NP-Hard complexity classes with Venn diagram.", marks: "[03]" },
        { label: "(b)", text: "Explain Cook's Theorem and its role in polynomial time reducibility.", marks: "[04]" },
        { label: "(c)", text: "Write short notes on: (1) Rabin-Karp String Matching (2) Amortized Analysis.", marks: "[07]" },
      ],
    },
  ],

  // Machine Learning (ML)
  "3170724": [
    {
      qNum: "Q.1",
      parts: [
        { label: "(a)", text: "Define Machine Learning. Differentiate between Supervised, Unsupervised, and Reinforcement Learning.", marks: "[03]" },
        { label: "(b)", text: "Explain Bias-Variance tradeoff with error vs model complexity curves.", marks: "[04]" },
        { label: "(c)", text: "Explain Linear Regression with cost function formulation and Gradient Descent optimization algorithm.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.2",
      parts: [
        { label: "(a)", text: "Explain Logistic Regression and Sigmoid activation function for binary classification.", marks: "[03]" },
        { label: "(b)", text: "Explain Decision Tree learning and calculate Information Gain and Gini Impurity for splitting.", marks: "[04]" },
        { label: "(c)", text: "Explain Support Vector Machines (SVM), Maximum Margin Hyperplane, and Kernel Trick (RBF, Polynomial).", marks: "[07]" },
      ],
      orOption: { label: "(c)", text: "Explain Naive Bayes Classifier and apply Bayes Theorem to classify given text document as Spam or Ham.", marks: "[07]" },
    },
    {
      qNum: "Q.3",
      parts: [
        { label: "(a)", text: "Explain K-Nearest Neighbors (KNN) algorithm and choice of distance metrics (Euclidean, Manhattan).", marks: "[03]" },
        { label: "(b)", text: "Explain K-Means Clustering algorithm with step-by-step centroid updates and Elbow method for optimal K.", marks: "[04]" },
        { label: "(c)", text: "Explain Principal Component Analysis (PCA) for dimensionality reduction with covariance matrix derivation.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.4",
      parts: [
        { label: "(a)", text: "Explain Ensemble Learning: Differentiate between Bagging and Boosting.", marks: "[03]" },
        { label: "(b)", text: "Explain Random Forest algorithm and out-of-bag (OOB) error estimation.", marks: "[04]" },
        { label: "(c)", text: "Explain Multi-Layer Perceptron (MLP) and Backpropagation weight update algorithm with chain rule.", marks: "[07]" },
      ],
    },
    {
      qNum: "Q.5",
      parts: [
        { label: "(a)", text: "Explain evaluation metrics: Confusion Matrix, Precision, Recall, F1-Score, and ROC-AUC Curve.", marks: "[03]" },
        { label: "(b)", text: "Explain Cross-Validation techniques: K-Fold Cross Validation and Stratified K-Fold.", marks: "[04]" },
        { label: "(c)", text: "Write short notes on: (1) Overfitting Prevention Techniques (L1/L2 Regularization, Dropout) (2) Gradient Boosting & XGBoost.", marks: "[07]" },
      ],
    },
  ],
};

/**
 * Returns dynamic, authentic GTU examination questions tailored to any subject
 */
export function getGTUSubjectQuestions(
  subjectCode: string,
  subjectName: string,
  course: string = "BE",
  semester: number = 5
): PaperQuestion[] {
  // If exact subject match exists
  if (SUBJECT_QUESTIONS_MAP[subjectCode]) {
    return SUBJECT_QUESTIONS_MAP[subjectCode];
  }

  // Generate customized authentic 5-unit GTU questions based on subject name
  const name = subjectName || "Engineering Course Subject";
  return [
    {
      qNum: "Q.1",
      parts: [
        { label: "(a)", text: `Explain the fundamental concepts and principles of ${name} with engineering applications.`, marks: "[03]" },
        { label: "(b)", text: `Discuss the architectural framework and standard methodologies used in ${name}.`, marks: "[04]" },
        { label: "(c)", text: `Explain key theoretical models and mathematical formulations underlying ${name} with suitable diagrams.`, marks: "[07]" },
      ],
    },
    {
      qNum: "Q.2",
      parts: [
        { label: "(a)", text: `State the essential design guidelines and performance criteria in ${name}.`, marks: "[03]" },
        { label: "(b)", text: `Compare and contrast the primary approaches and algorithms utilized in modern ${name}.`, marks: "[04]" },
        { label: "(c)", text: `Develop a comprehensive solution for a standard engineering design problem in ${name} with step-by-step calculations.`, marks: "[07]" },
      ],
      orOption: { label: "(c)", text: `Explain the alternative optimization techniques and diagnostic workflows in ${name} with case studies.`, marks: "[07]" },
    },
    {
      qNum: "Q.3",
      parts: [
        { label: "(a)", text: `Describe the operational constraints and boundary conditions encountered in ${name}.`, marks: "[03]" },
        { label: "(b)", text: `Explain implementation procedures, protocols, and standard toolsets relevant to ${name}.`, marks: "[04]" },
        { label: "(c)", text: `Analyze the critical failure modes, safety protocols, and testing strategies in ${name}.`, marks: "[07]" },
      ],
      orOption: { label: "(c)", text: `Discuss recent industrial trends, emerging standards, and regulatory frameworks governing ${name}.`, marks: "[07]" },
    },
    {
      qNum: "Q.4",
      parts: [
        { label: "(a)", text: `What are the critical evaluation metrics and quality indicators in ${name}?`, marks: "[03]" },
        { label: "(b)", text: `Explain integration strategies and interfacing requirements with external subsystem components in ${name}.`, marks: "[04]" },
        { label: "(c)", text: `Formulate an end-to-end experimental setup and simulation workflow for verifying ${name} objectives.`, marks: "[07]" },
      ],
    },
    {
      qNum: "Q.5",
      parts: [
        { label: "(a)", text: `Summarize key troubleshooting techniques and diagnostics applied in ${name}.`, marks: "[03]" },
        { label: "(b)", text: `Discuss scalability, security, and sustainability considerations in modern ${name}.`, marks: "[04]" },
        { label: "(c)", text: `Write detailed technical notes on any TWO advanced topics in ${name}: (1) Industry 4.0 Integration (2) Real-time Monitoring (3) Cost-Benefit Analysis.`, marks: "[07]" },
      ],
    },
  ];
}
