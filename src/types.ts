export interface SiteInfo {
  name: string;
  tagline: string;
  description: string;
  logo: string;
  aboutUs: {
    history: string;
    vision: string;
    certifications: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    kakao: string;
  };
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface SiteData {
  siteInfo: SiteInfo;
  portfolio: PortfolioItem[];
  services: ServiceItem[];
}
