export interface LendPageProps {
  params: {
    slug?: [string?, number?, string?, number?];
  };
}

export type LendLayoutProps = {
  children: React.ReactNode;
  fundingForm: React.ReactNode;
  counterDetailForm: React.ReactNode;
  counterForm: React.ReactNode;
  countersList: React.ReactNode;
  loanDetail: React.ReactNode;
  loansList: React.ReactNode;
  offerDetail: React.ReactNode;
  offerForm: React.ReactNode;
  offersList: React.ReactNode;
  paymentDetail: React.ReactNode;
  paymentsList: React.ReactNode;
} & LendPageProps;