export interface MarketPageProps {
  params: {
    slug?: [string?, number?, string?];
  };
}

export type MarketLayoutProps = {
  children: React.ReactNode;
  counterForm: React.ReactNode;
  defaultsBidForm: React.ReactNode;
  defaultsDetail: React.ReactNode;
  defaultsList: React.ReactNode;
  offerDetail: React.ReactNode;
  offersList: React.ReactNode;
} & MarketPageProps;