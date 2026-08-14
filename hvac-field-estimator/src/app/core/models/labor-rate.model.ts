export type JobType =
  | 'diagnostic'
  | 'repair'
  | 'install'
  | 'maintenance'
  | 'ductwork';

export interface LaborRate {
  jobType: JobType;
  level: string;
  hourlyRate: number;
  estimatedHours: {
    min: number;
    max: number;
  };
}
