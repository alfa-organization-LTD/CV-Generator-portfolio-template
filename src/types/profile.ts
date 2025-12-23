export interface Theme {
  colors: {
    background: string;
    surface: string;
    primary: string;
    primary_soft: string;
    accent: string;
    text: string;
    text_muted: string;
    border: string;
  };
  mode: "light" | "dark";
}

export interface Hero {
  firstName: string;
  lastName: string;
  hero_image_url: string;
  hero_image_cover: boolean;
  bio: string;
  phone_number: string;
  email: string;
  cv_link: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  link: string;
}

export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
}

export interface Project {
  title: string;
  cover: string;
  description: string;
  link: string;
  code: string;
  type: "react" | "vue" | "js" | "other";
}

export interface Profile {
  user_id: string;
  site_name: string;
  theme: Theme;
  logo_url: string;
  logo_inverted: boolean;
  Hero: Hero;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  services: Service[];
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  milestone: {
    customers_served: number;
    projects_completed: number;
    experience_years: number;
  }[];
  projects: Project[];
  published_at: string;
}
