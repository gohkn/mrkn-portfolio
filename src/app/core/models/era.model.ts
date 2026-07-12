/**
 * Era / capability shared type definitions.
 * `IconKey` is a closed string union so templates can't introduce invalid icons.
 */

export type EraIconColor = 'cyan' | 'green' | 'orange' | 'purple' | 'pink';

export type IconKey =
  | 'code'
  | 'grid'
  | 'cloud'
  | 'chart'
  | 'monitor'
  | 'database'
  | 'settings'
  | 'shield';

export interface Era {
  readonly date: string;
  readonly iconColor: EraIconColor;
  readonly iconKey: IconKey;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly footerItems: readonly string[];
}

export interface Capability {
  readonly label: string;
  readonly iconColor: EraIconColor;
  readonly iconKey: IconKey;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
}

export interface Certification {
  readonly name: string;
  readonly issuer: string;
  readonly date: string;
  readonly iconColor: EraIconColor;
  readonly iconKey: IconKey;
  readonly credentialUrl: string;
}

export interface ContactLink {
  readonly position: string;
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface StatItem {
  readonly value: string;
  readonly suffix?: string;
  readonly label: string;
}
