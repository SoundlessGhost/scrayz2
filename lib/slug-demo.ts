interface SlugCard {
  id: string;
  title: string;
  overview?: string;
  desc?: string;
}

const cardsByCategory: SlugCard[] = [
  {
    id: "linkedIn-profile-scraper",
    title: "LinkedIn Profile Scraper",
    overview:
      "Extract public LinkedIn profiles with names, titles, skills, and connections.",
  },
  {
    id: "linkedIn-company-scraper",
    title: "LinkedIn Company Scraper",
    desc: "Collect company details including industry, size, location, and overview.",
  },
  {
    id: "linkedIn-post-scraper",
    title: "LinkedIn Post Scraper",
    desc: "Scrape Post directories with roles, departments, and contact info.",
  },
  {
    id: "linkedIn-custom-scraper",
    title: "LinkedIn Custom Scraper",
    desc: "Export job listings from Sales Navigator with roles, skills, and locations.",
  },
  {
    id: "linkedIn-job-scraper",
    title: "LinkedIn Job Scraper",
    desc: "Extract public LinkedIn profiles with names, titles, skills, and connections.",
  },
  {
    id: "linkedIn-comment-scraper",
    title: "LinkedIn Comment Scraper",
    desc: "Collect company details including industry, size, location, and overview.",
  },
  {
    id: "linkedIn-Reaction-Count-Scraper",
    title: "LinkedIn Reaction Count Scraper",
    desc: "Scrape Post directories with roles, departments, and contact info.",
  },
];
