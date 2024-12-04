/**
 * structure for the Project
 */
export interface Project {
  id: number;
  title: string;
  technologies: string[];
  description: string;
  liveLink: string;
  gitHubLink: string;
  imagePath: string;
}
