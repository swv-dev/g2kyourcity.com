export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ModerationStatus = 'pending_review' | 'approved' | 'rejected'

export type UserRole = 'pending' | 'explorer' | 'trusted_org' | 'admin'

export type DiscountType = 'percentage' | 'fixed' | 'bogo' | 'free_item'

export type SponsorshipTier = 'basic' | 'premium' | 'elite'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string | null
          role: UserRole
          org_name: string | null
          bio: string | null
          phone: string | null
          website: string | null
          applied_at: string | null
          approved_at: string | null
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          role?: UserRole
          org_name?: string | null
          bio?: string | null
          phone?: string | null
          website?: string | null
          applied_at?: string | null
          approved_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          role?: UserRole
          org_name?: string | null
          bio?: string | null
          phone?: string | null
          website?: string | null
          applied_at?: string | null
          approved_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          location: string | null
          address: string | null
          start_date: string
          end_date: string | null
          category_ids: string[] | null
          price: Json | null
          organizer: string | null
          image_url: string | null
          moderation_status: ModerationStatus
          moderation_note: string | null
          submitted_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          location?: string | null
          address?: string | null
          start_date: string
          end_date?: string | null
          category_ids?: string[] | null
          price?: Json | null
          organizer?: string | null
          image_url?: string | null
          moderation_status?: ModerationStatus
          moderation_note?: string | null
          submitted_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          location?: string | null
          address?: string | null
          start_date?: string
          end_date?: string | null
          category_ids?: string[] | null
          price?: Json | null
          organizer?: string | null
          image_url?: string | null
          moderation_status?: ModerationStatus
          moderation_note?: string | null
          submitted_by?: string | null
          created_at?: string
        }
        Relationships: []
      }
      place_submissions: {
        Row: {
          id: string
          name: string
          description: string | null
          address: string | null
          category_ids: string[] | null
          phone: string | null
          website: string | null
          business_type: string | null
          price_level: number | null
          image_url: string | null
          moderation_status: ModerationStatus
          moderation_note: string | null
          submitted_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          address?: string | null
          category_ids?: string[] | null
          phone?: string | null
          website?: string | null
          business_type?: string | null
          price_level?: number | null
          image_url?: string | null
          moderation_status?: ModerationStatus
          moderation_note?: string | null
          submitted_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          address?: string | null
          category_ids?: string[] | null
          phone?: string | null
          website?: string | null
          business_type?: string | null
          price_level?: number | null
          image_url?: string | null
          moderation_status?: ModerationStatus
          moderation_note?: string | null
          submitted_by?: string | null
          created_at?: string
        }
        Relationships: []
      }
      place_sponsorships: {
        Row: {
          id: string
          place_id: string
          tier: SponsorshipTier
          is_active: boolean
          starts_at: string | null
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          place_id: string
          tier?: SponsorshipTier
          is_active?: boolean
          starts_at?: string | null
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          place_id?: string
          tier?: SponsorshipTier
          is_active?: boolean
          starts_at?: string | null
          expires_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      place_deals: {
        Row: {
          id: string
          place_id: string
          title: string
          description: string | null
          discount_type: DiscountType
          discount_value: number
          coupon_code: string | null
          terms: string | null
          is_active: boolean
          starts_at: string | null
          expires_at: string | null
          max_redemptions: number | null
          redemption_count: number
          created_at: string
        }
        Insert: {
          id?: string
          place_id: string
          title: string
          description?: string | null
          discount_type: DiscountType
          discount_value: number
          coupon_code?: string | null
          terms?: string | null
          is_active?: boolean
          starts_at?: string | null
          expires_at?: string | null
          max_redemptions?: number | null
          redemption_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          place_id?: string
          title?: string
          description?: string | null
          discount_type?: DiscountType
          discount_value?: number
          coupon_code?: string | null
          terms?: string | null
          is_active?: boolean
          starts_at?: string | null
          expires_at?: string | null
          max_redemptions?: number | null
          redemption_count?: number
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
