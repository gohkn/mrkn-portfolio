import { Capability } from '../models/era.model';

export const CAPABILITIES: readonly Capability[] = [
  {
    label: 'FRONTEND',
    iconColor: 'cyan',
    iconKey: 'monitor',
    title: 'User Interfaces',
    description:
      'Angular as the daily driver in my current role — components built to be tested, themed, and accessible. React.js from previous transit work, still familiar for lighter SPAs. TypeScript everywhere, with Karma + Jasmine for coverage that satisfies SonarQube gates.',
    tags: ['Angular', 'TypeScript', 'React.js', 'HTML / SCSS', 'Karma / Jasmine', 'RxJS'],
  },
  {
    label: 'BACKEND & APIs',
    iconColor: 'green',
    iconKey: 'database',
    title: 'Services & Data',
    description:
      '.NET Core for new services, .NET Framework for the legacy that still pays the bills. SQL Server with stored procedures, query tuning, and proper data modelling. REST APIs documented in OpenAPI. Node.js when the stack calls for it.',
    tags: [
      '.NET Core',
      '.NET Framework',
      'C#',
      'Node.js',
      'SQL Server',
      'REST / OpenAPI',
      'xUnit / NUnit',
    ],
  },
  {
    label: 'CLOUD & INFRA',
    iconColor: 'orange',
    iconKey: 'cloud',
    title: 'Where it Runs',
    description:
      'Kubernetes for containers, Docker for everything containerised, Windows Server and IIS for the on-prem half. Workloads on Azure (primary) and GCP. Comfortable across cloud-native and traditional bare-metal banking infrastructure.',
    tags: ['Kubernetes', 'Docker', 'Microsoft Azure', 'Google Cloud', 'Windows Server', 'IIS'],
  },
  {
    label: 'DELIVERY & OPS',
    iconColor: 'purple',
    iconKey: 'settings',
    title: 'Pipelines & Production',
    description:
      "Azure DevOps and GitLab CI for delivery, SonarQube for coverage gates, Control-M for the overnight batch layer at the bank. PowerShell and shell for the glue, and the habit of writing the runbook before it's needed.",
    tags: [
      'Azure DevOps / TFS',
      'GitLab CI',
      'SonarQube',
      'Control-M',
      'PowerShell',
      'Shell / Bash',
    ],
  },
  {
    label: 'PRACTICE',
    iconColor: 'pink',
    iconKey: 'shield',
    title: 'Architecture & Security',
    description:
      'Microservices when they fit, event-driven where async helps, OAuth/JWT for the parts that need a real identity story. OWASP-aware code review baked into the workflow. Comfortable with the audit trails, change controls, and segregation of duties that banking demands.',
    tags: [
      'Microservices',
      'Event-Driven',
      'OAuth 2.0 / OIDC',
      'JWT',
      'OWASP Top 10',
      'Agile / Scrum',
    ],
  },
] as const;
