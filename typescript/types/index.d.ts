type PortfolioType = {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  skillLevel: number;
  createdAt: string;
  updatedAt: string;
};

type PortfoliosType = {
  message: string;
  portfolios: PortfolioType[];
  portfolio: PortfolioType[];
};
