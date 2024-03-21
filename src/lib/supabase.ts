import { Database } from "@/types/supabase";

export type User = Database["public"]["Tables"]["users"]["Row"];

export type Payment = Database["public"]["Tables"]["payments"]["Row"];
export type PaymentInsert = Database["public"]["Tables"]["payments"]["Insert"];
export type PaymentUpdate = Database["public"]["Tables"]["payments"]["Update"];

export type Offer = Database["public"]["Tables"]["offers"]["Row"];
export type OfferInsert = Database["public"]["Tables"]["offers"]["Insert"];
export type OfferUpdate = Database["public"]["Tables"]["offers"]["Update"];

export type CounterOffer = Database["public"]["Tables"]["counteroffers"]["Row"];
export type CounterOfferInsert = Database["public"]["Tables"]["counteroffers"]["Insert"];
export type CounterOfferUpdate = Database["public"]["Tables"]["counteroffers"]["Update"];

export type Loan = Database["public"]["Tables"]["loans"]["Row"];
export type LoanInsert = Database["public"]["Tables"]["loans"]["Insert"];
export type LoanUpdate = Database["public"]["Tables"]["loans"]["Update"];

export type UserProfile = Database["public"]["Tables"]["userprofiles"]["Row"];
export type UserProfileInsert = Database["public"]["Tables"]["userprofiles"]["Insert"];
export type UserProfileUpdate = Database["public"]["Tables"]["userprofiles"]["Update"];

export type Notification = Database["public"]["Tables"]["notifications"]["Row"];
export type NotificationInsert = Database["public"]["Tables"]["notifications"]["Insert"];
export type NotificationUpdate = Database["public"]["Tables"]["notifications"]["Update"];

// Join Types
export type CounterOfferJoined = CounterOffer & { offer: Pick<Offer, 'user_id'> | null};