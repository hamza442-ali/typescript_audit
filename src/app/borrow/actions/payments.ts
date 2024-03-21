'use server'

interface Payment {
  loan_id: number
  payment_amount: number
  payment_currency: string
  user_id: number
}

export async function makePayment(data: Payment) {
  const result = await Promise.resolve(data)
  return {
    error: null,
    result
  }
}