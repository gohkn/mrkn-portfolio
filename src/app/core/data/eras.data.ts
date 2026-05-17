import { Era } from '../models/era.model';

export const ERAS: readonly Era[] = [
  {
    date: '2014 – 2018',
    iconColor: 'cyan',
    iconKey: 'code',
    title: 'Software Engineer · Foundations',
    description:
      'Where I learned to ship features end-to-end. .NET Framework on the back, jQuery and AngularJS on the front, SQL Server underneath. The decade-old codebases that taught me how production really behaves — and why discipline matters more than cleverness.',
    tags: ['C# / .NET Framework', 'SQL Server', 'jQuery', 'AngularJS', 'IIS', 'Windows Server'],
    footerItems: ['Enterprise Web Apps', 'Internal Tools', 'Reporting Systems', 'L2 Support'],
  },
  {
    date: '2018 – 2022',
    iconColor: 'green',
    iconKey: 'monitor',
    title: 'Full-Stack Developer · Transit & Operations',
    description:
      'Public-sector transit work. React.js with Node.js services backing it, alongside continued .NET work. CI/CD became a daily concern — TFS turned into Azure DevOps, manual deploys turned into YAML pipelines. Built operational dashboards and internal tools used across the network.',
    tags: [
      'React.js',
      'Node.js',
      '.NET Core',
      'TypeScript',
      'SQL Server',
      'Azure DevOps',
      'REST APIs',
    ],
    footerItems: [
      'Operational Dashboards',
      'Internal Platforms',
      'Pipeline Automation',
      'SPA Architecture',
    ],
  },
  {
    date: '2022 – Now',
    iconColor: 'orange',
    iconKey: 'cloud',
    title: 'Senior Engineer · Investment Banking',
    description:
      'Current chapter. Building and maintaining trading-floor-grade applications: Angular on the frontend, .NET Core services, SQL Server. Control-M for the overnight batch layer that downstream reporting depends on. Workloads moving onto Kubernetes; pipelines split across Azure DevOps and GitLab CI. The work where uptime, audit trails, and code review discipline really count.',
    tags: [
      'Angular',
      '.NET Core',
      'C#',
      'SQL Server',
      'Kubernetes',
      'Docker',
      'Control-M',
      'Azure DevOps',
      'GitLab CI',
      'SonarQube',
    ],
    footerItems: [
      'Banking-Grade Apps',
      'Batch Orchestration',
      'Cloud Migration',
      'L3 Engineering',
      'Regulatory Awareness',
    ],
  },
  {
    date: 'Side Projects',
    iconColor: 'purple',
    iconKey: 'chart',
    title: 'Personal Builds',
    description:
      "Where I learn the things that don't fit at work. A Python stock screener for Bursa Malaysia with multi-factor value scoring, auto-portfolio builder, and CSV export. A reusable Angular testing skill packaged for SonarQube-compatible coverage in TFS pipelines. Built for me, useful enough to share.",
    tags: [
      'Python',
      'Pandas',
      'Yahoo Finance API',
      'Karma / Jasmine',
      'SonarQube',
      'PowerShell',
    ],
    footerItems: ['Bursa Stock Screener', 'Angular Test Skill', 'Investing Tools'],
  },
] as const;
