import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding CareerOS relational database...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // 1. Create Profiles across all 7 roles
  const studentProfile = await prisma.profile.upsert({
    where: { email: 'divya@careeros.demo' },
    update: {},
    create: {
      id: 'usr-student-1',
      email: 'divya@careeros.demo',
      passwordHash,
      role: 'student',
      fullName: 'Divya',
      location: 'Bengaluru, India',
      studentProfile: {
        create: {
          id: 'sp-1',
          college: 'Vellore Institute of Technology',
          degree: 'B.Tech in Computer Science',
          graduationYear: 2026,
          targetRole: 'Junior Frontend Developer',
          targetIndustry: 'Fintech & SaaS',
          currentReadiness: 69,
          currentLevel: 8,
          xp: 1650,
          weeklyAvailabilityHours: 15,
          workModePreference: 'Hybrid',
        },
      },
    },
  });

  const mentorProfile = await prisma.profile.upsert({
    where: { email: 'sneha.roy@careeros.demo' },
    update: {},
    create: {
      id: 'usr-mentor-1',
      email: 'sneha.roy@careeros.demo',
      passwordHash,
      role: 'mentor',
      fullName: 'Sneha Roy',
      location: 'Hyderabad, India',
      mentorProfile: {
        create: {
          id: 'mentor-1',
          jobTitle: 'Senior Frontend Architect',
          organization: 'Microsoft India',
          industry: 'Big Tech',
          yearsExperience: 8,
          bio: 'Mentoring campus engineering talent on React performance and placement readiness.',
          availabilitySchedule: '2 slots/week',
          isVerified: true,
        },
      },
    },
  });

  const recruiterProfile = await prisma.profile.upsert({
    where: { email: 'recruiter@technova.demo' },
    update: {},
    create: {
      id: 'usr-recruiter-1',
      email: 'recruiter@technova.demo',
      passwordHash,
      role: 'recruiter',
      fullName: 'Vikram Seth',
      location: 'Bengaluru, India',
    },
  });

  const adminProfile = await prisma.profile.upsert({
    where: { email: 'admin@careeros.demo' },
    update: {},
    create: {
      id: 'usr-admin-1',
      email: 'admin@careeros.demo',
      passwordHash,
      role: 'platform_admin',
      fullName: 'Platform Administrator',
      location: 'New Delhi, India',
    },
  });

  console.log('✓ Created 4 primary role accounts (Student, Mentor, Recruiter, Admin)');

  // 2. Seed Skills
  const coreSkills = [
    { id: 'python', name: 'Python', category: 'PROGRAMMING', description: 'Core Python, OOP and scripting' },
    { id: 'javascript', name: 'JavaScript / TypeScript', category: 'PROGRAMMING', description: 'Async JS, closures and types' },
    { id: 'react', name: 'React.js', category: 'FRAMEWORK', description: 'Components, hooks, state, memoization' },
    { id: 'dsa_trees', name: 'Trees & Graphs', category: 'DSA', description: 'Tree traversals, BST, BFS/DFS' },
    { id: 'sql_dbms', name: 'SQL & Database Design', category: 'CORE_CS', description: 'Joins, indexing, normalization' },
    { id: 'testing_qa', name: 'Testing & Vitest', category: 'ENGINEERING', description: 'Unit testing, mocking, test-driven dev' },
    { id: 'communication', name: 'Technical Communication', category: 'SOFT_SKILLS', description: 'Architecture trade-offs, demos' },
  ];

  for (const s of coreSkills) {
    await prisma.skill.upsert({
      where: { id: s.id },
      update: {},
      create: s,
    });
  }
  console.log('✓ Seeded core technical skills');

  // 3. Seed Companies & Micro-Internships
  const comp = await prisma.company.upsert({
    where: { id: 'comp-technova' },
    update: {},
    create: {
      id: 'comp-technova',
      name: 'CareerBridge Labs',
      logo: 'CB',
      industry: 'EdTech & Analytics',
      tier: 'Tier 1',
      description: 'Building next-generation campus placement automation and student readiness analytics.',
      isVerified: true,
      microInternships: {
        create: {
          id: 'micro-1',
          title: 'Student Placement Analytics Dashboard',
          targetRole: 'Junior Frontend Developer',
          stipendAmount: '₹3,500',
          durationDays: 10,
          estimatedHours: '6–8 hrs total',
          businessProblem: 'Colleges lack real-time visibility into department-wise placement readiness and skill gaps.',
          deliverablesJson: JSON.stringify([
            'Clean CSV dataset and map placement metrics',
            'Build 3 interactive filterable chart components',
            'Implement dark purple CareerOS theme styling',
            'Write 10 automated Vitest unit tests',
            'Record 2-min Loom walkthrough video',
          ]),
          requiredSkillsJson: JSON.stringify(['React', 'TypeScript', 'Recharts', 'SQL']),
          isPaid: true,
          isDemo: true,
          supervisorName: 'Arjun Mehta',
          supervisorRole: 'Lead Frontend Engineer',
        },
      },
    },
  });

  console.log('✓ Seeded companies and sample micro-internship');

  // 4. Seed Access Resources
  const resources = [
    { id: 'res-1', name: 'Power BI Pro Student License', provider: 'Microsoft Learn', category: 'Software License', description: 'Full access for building portfolio dashboards', valueDescription: 'Free for 12 months (₹8,000 value)', isActivated: true },
    { id: 'res-2', name: 'WorkHub Co-Working Space (20 Hours)', provider: 'WorkHub India', category: 'High-Speed Wi-Fi', description: 'High-speed internet co-working access across 12 Indian cities', valueDescription: '20 free hours/month', isActivated: true },
    { id: 'res-3', name: 'AWS Cloud Credits ($50)', provider: 'AWS Educate', category: 'Cloud Credits', description: 'Host full-stack projects and PostgreSQL databases', valueDescription: '$50 AWS promotional credits', isActivated: false },
  ];

  for (const r of resources) {
    await prisma.accessResource.upsert({
      where: { id: r.id },
      update: {},
      create: r,
    });
  }

  console.log('✓ Seeded access network resources');
  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
