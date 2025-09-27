export interface IStripeAccount {
  accountId: string;
  isStripeReady: boolean;
  payoutsEnabled: boolean;
  transfersActive: boolean;
  detailsSubmitted: boolean;
  disabledReason: string | null;
  missingFields: string[];
  upcomingFields: string[];
  onboardingLink: string | null;
}
