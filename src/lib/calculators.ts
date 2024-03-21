/**
 * Calculate total amount owed based on principal, simple interest rate, and time in days.
 * @param principal - The initial amount of the loan.
 * @param annualRate - The annual interest rate as a percentage (e.g. 5 for 5%).
 * @param days - The time period in days.
 * @return The total amount owed.
 * 
 * // Example usage:
 * * const principal: number = 1000; // $1000 loan
 * const annualRate: number = 5;   // 5% annual interest rate
 * const days: number = 30;        // 30 days
 * 
 * const totalOwed: number = calculateTotalOwed(principal, annualRate, days);
 * console.log(`Total amount owed: $${totalOwed.toFixed(2)}`);
 */
export function calculateTotalOwed(principal: number, annualRate: number, days: number): number {
  const interest: number = principal * (annualRate / 100) * (days / 365);
  return principal + interest;
}
