export interface BorrowPageProps {
  params: {
    slug?: [string?, number?, string?, number?];
  };
}

export type BorrowLayoutProps = {
  children: React.ReactNode;
  collateralForm: React.ReactNode;
  counterDetailForm: React.ReactNode;
  counterForm: React.ReactNode;
  countersList: React.ReactNode;
  loanDetail: React.ReactNode;
  loansList: React.ReactNode;
  offerDetail: React.ReactNode;
  offerForm: React.ReactNode;
  offersList: React.ReactNode;
  paymentDetail: React.ReactNode;
  paymentForm: React.ReactNode;
  paymentsList: React.ReactNode;
} & BorrowPageProps;