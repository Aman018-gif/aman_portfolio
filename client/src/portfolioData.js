export const HERO_NAME = 'Aman Kaushal'
export const HERO_ROLE = 'Full-Stack Developer | AI/ML Enthusiast | GATE 2026 AIR 7798'
export const HERO_SUBTITLE = 'I create scalable full-stack applications and leverage AI/ML to design efficient solutions for complex, real-world problems.'

export const SECTION_KEYS = ['about', 'projects', 'skills', 'timeline', 'contact']

export const ABOUT_PARAGRAPHS = [
  "I’m a Computer Science undergraduate focused on building scalable software and data-driven applications. I work across full-stack development and machine learning, with hands-on experience in developing real-world projects involving APIs, system design, and data analysis.",

  "I secured AIR 7798 in GATE 2026, reflecting strong fundamentals in algorithms, operating systems, and core CS concepts. Alongside development, I actively explore the stock market to strengthen my analytical thinking and decision-making skills.",

  "I’m currently seeking software engineering opportunities where I can contribute to building efficient, real-world systems and continue growing as a developer."
];
export const SKILLS_DATA = [
  {
    label: 'Full-Stack Development',
    items: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 88 },
      { name: 'REST APIs', level: 90 },
      { name: 'MongoDB', level: 88 },
    ],
  },
  {
    label: 'Machine Learning & Computer Vision',
    items: [
      { name: 'Machine Learning', level: 85 },
      { name: 'Deep Learning', level: 80 },
      { name: 'Computer Vision', level: 85 },
      { name: 'OpenCV', level: 82 },
      { name: 'MediaPipe', level: 80 },
      { name: 'NumPy', level: 85 },
    ],
  },
  {
    label: 'Core CS & Systems',
    items: [
      { name: 'Data Structures & Algorithms', level: 90 },
      { name: 'System Design', level: 85 },
      { name: 'Database Design', level: 82 },
      { name: 'MySQL', level: 80 },
    ],
  },
  {
    label: 'Tools & Platforms',
    items: [
      { name: 'Python', level: 90 },
      { name: 'Raspberry Pi', level: 82 },
      { name: 'Git & GitHub', level: 88 },
      { name: 'Figma', level: 75 },
    ],
  },
];

export const TIMELINE_ITEMS = [
  {
    title: 'B.Tech in Computer Science',
    time: '2023 - Present',
    description: 'Pursuing Computer Science with strong focus on Data Structures, Algorithms, and system-level problem solving.',
  },
  {
    title: 'Teaching Assistant – DAA & DSA',
    time: 'Aug 2025 - Present',
    description: 'Mentoring 2nd-year students, conducting coding contests, and guiding problem-solving sessions in Data Structures and Algorithms.',
  },
  {
    title: 'Deep Learning Intern – LNMIIT',
    time: 'Jun 2025 - Aug 2025',
    description: 'Worked on deep learning model development and Raspberry Pi-based deployment as part of the LUSIP internship program.',
  },
  {
    title: 'Teaching Assistant – C Programming',
    time: 'Jan 2025 - May 2025',
    description: 'Assisted first-year students in C programming, supporting 100+ students in labs and foundational programming concepts.',
  },
  {
    title: 'GATE 2026 Qualified (AIR 7798)',
    time: '2026',
    description: 'Secured AIR 7798 with a score of 496, demonstrating strong fundamentals in core computer science subjects.',
  },
];

export const PROJECTS_FALLBACK = [
  {
    name: 'CodeCampus – College Coding Platform',
    description: 'A full-stack coding platform for colleges featuring contests, daily challenges, streak tracking, and performance analytics to improve coding consistency and competitive programming skills.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/Aman018-gif/coding_platform_jklu',
    // demo: 'https://yourdeployment.com',
  },
  {
    name: 'Real-Time ASL Recognition on Raspberry Pi',
    description: 'Developed a real-time American Sign Language recognition system using MediaPipe and Random Forest, achieving ~94% accuracy and deployed on Raspberry Pi for low-cost edge inference.',
    tech: ['Python', 'MediaPipe', 'OpenCV', 'Scikit-learn', 'Raspberry Pi'],
    github: 'https://github.com/Aman018-gif/asl-recognition',
    // demo: 'https://yourdeployment.com',
  },
  {
    name: 'CityLink Analyzer – Route Optimization & Network Analysis',
    description: 'Built a graph-based travel optimization system integrating Dijkstra, Floyd-Warshall, TSP, and MST with real-time traffic data (GraphHopper API), enabling analysis and visualization of 330+ city routes.',
    tech: ['Python', 'NetworkX', 'Tkinter', 'Matplotlib', 'Folium', 'GraphHopper API'],
    github: 'https://github.com/Aman018-gif/CityLinkAnalyzer',
    // demo: 'https://yourdeployment.com',
  },
{
  name: 'Eigenfaces – Facial Image Reconstruction Web App',
  description: 'Developed a deployable web application using SVD (Eigenfaces) for real-time facial image reconstruction with interactive visualization of singular values, energy curves, and compression metrics.',
  tech: ['Python', 'Flask', 'NumPy', 'Pillow', 'JavaScript', 'Chart.js'],
  github: 'https://github.com/Aman018-gif/svd-eigenfaces-image-reconstruction',
  demo: 'https://svd-eigenfaces-image-reconstruction.onrender.com/',
},
]

