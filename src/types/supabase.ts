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

export type ContactStatus = 'new' | 'read' | 'responded' | 'archived'

export type LeadStatus = 'new' | 'contacted' | 'negotiating' | 'converted' | 'lost'

export type NoteEntityType = 'contact' | 'lead' | 'user' | 'sponsorship'

export type PartnerTier = 'premium' | 'basic'

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
          partner_tier: PartnerTier | null
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
          partner_tier?: PartnerTier | null
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
          partner_tier?: PartnerTier | null
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
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          status: ContactStatus
          admin_notes: string | null
          created_at: string
          responded_at: string | null
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject: string
          message: string
          status?: ContactStatus
          admin_notes?: string | null
          created_at?: string
          responded_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string
          message?: string
          status?: ContactStatus
          admin_notes?: string | null
          created_at?: string
          responded_at?: string | null
        }
        Relationships: []
      }
      advertiser_leads: {
        Row: {
          id: string
          business_name: string
          contact_name: string
          email: string
          phone: string | null
          website: string | null
          tier_interest: SponsorshipTier | null
          message: string | null
          source: string
          status: LeadStatus
          admin_notes: string | null
          created_at: string
          contacted_at: string | null
          converted_at: string | null
        }
        Insert: {
          id?: string
          business_name: string
          contact_name: string
          email: string
          phone?: string | null
          website?: string | null
          tier_interest?: SponsorshipTier | null
          message?: string | null
          source?: string
          status?: LeadStatus
          admin_notes?: string | null
          created_at?: string
          contacted_at?: string | null
          converted_at?: string | null
        }
        Update: {
          id?: string
          business_name?: string
          contact_name?: string
          email?: string
          phone?: string | null
          website?: string | null
          tier_interest?: SponsorshipTier | null
          message?: string | null
          source?: string
          status?: LeadStatus
          admin_notes?: string | null
          created_at?: string
          contacted_at?: string | null
          converted_at?: string | null
        }
        Relationships: []
      }
      admin_notes: {
        Row: {
          id: string
          entity_type: NoteEntityType
          entity_id: string
          admin_id: string
          note: string
          created_at: string
        }
        Insert: {
          id?: string
          entity_type: NoteEntityType
          entity_id: string
          admin_id: string
          note: string
          created_at?: string
        }
        Update: {
          id?: string
          entity_type?: NoteEntityType
          entity_id?: string
          admin_id?: string
          note?: string
          created_at?: string
        }
        Relationships: []
      }
      analytics_zone_events: {
        Row: {
          id: string
          anon_id: string
          zone_id: string
          zone_type: string
          event_type: 'entry' | 'exit'
          occurred_at: string
          app_version: string | null
          created_at: string
        }
        Insert: {
          id?: string
          anon_id: string
          zone_id: string
          zone_type: string
          event_type: 'entry' | 'exit'
          occurred_at?: string
          app_version?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          anon_id?: string
          zone_id?: string
          zone_type?: string
          event_type?: 'entry' | 'exit'
          occurred_at?: string
          app_version?: string | null
          created_at?: string
        }
        Relationships: []
      }
      analytics_place_visits: {
        Row: {
          id: string
          anon_id: string
          place_id: string
          visit_type: 'checkin' | 'detail_view'
          dwell_seconds: number | null
          business_type: string | null
          occurred_at: string
          app_version: string | null
          created_at: string
        }
        Insert: {
          id?: string
          anon_id: string
          place_id: string
          visit_type: 'checkin' | 'detail_view'
          dwell_seconds?: number | null
          business_type?: string | null
          occurred_at?: string
          app_version?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          anon_id?: string
          place_id?: string
          visit_type?: 'checkin' | 'detail_view'
          dwell_seconds?: number | null
          business_type?: string | null
          occurred_at?: string
          app_version?: string | null
          created_at?: string
        }
        Relationships: []
      }
      analytics_sessions: {
        Row: {
          id: string
          anon_id: string
          session_start: string
          session_end: string | null
          duration_seconds: number | null
          app_version: string | null
          created_at: string
        }
        Insert: {
          id?: string
          anon_id: string
          session_start?: string
          session_end?: string | null
          duration_seconds?: number | null
          app_version?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          anon_id?: string
          session_start?: string
          session_end?: string | null
          duration_seconds?: number | null
          app_version?: string | null
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
      partner_places: {
        Row: {
          id: string
          partner_id: string
          place_id: string
          created_at: string
        }
        Insert: {
          id?: string
          partner_id: string
          place_id: string
          created_at?: string
        }
        Update: {
          id?: string
          partner_id?: string
          place_id?: string
          created_at?: string
        }
        Relationships: []
      }
      places_directory: {
        Row: {
          place_id: string
          place_name: string
          category: string | null
          address: string | null
          latitude: number | null
          longitude: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          place_id: string
          place_name: string
          category?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          place_id?: string
          place_name?: string
          category?: string | null
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          created_at?: string
          updated_at?: string
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
      recent_admin_activity: {
        Args: { lim?: number }
        Returns: {
          id: string
          activity_type: string
          title: string
          status: string
          created_at: string
        }[]
      }
      analytics_zone_traffic: {
        Args: { p_start: string; p_end: string; p_grain?: string }
        Returns: {
          zone_id: string
          zone_type: string
          bucket: string
          entry_count: number
          unique_visitors: number
        }[]
      }
      analytics_place_traffic: {
        Args: { p_start: string; p_end: string; p_type_filter?: string }
        Returns: {
          place_id: string
          business_type: string | null
          visit_count: number
          unique_visitors: number
          avg_dwell_seconds: number | null
        }[]
      }
      analytics_peak_hours: {
        Args: { p_zone_filter?: string; p_days?: number }
        Returns: {
          day_of_week: number
          hour_of_day: number
          entry_count: number
          unique_visitors: number
        }[]
      }
      is_partner: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      analytics_place_traffic_partner: {
        Args: { p_date_from: string; p_date_to: string }
        Returns: {
          place_id: string
          place_name: string | null
          category: string | null
          business_type: string | null
          visit_count: number
          unique_visitors: number
          avg_dwell_seconds: number | null
        }[]
      }
      analytics_place_summary: {
        Args: { p_place_id: string; p_date_from: string; p_date_to: string }
        Returns: {
          place_id: string
          place_name: string
          category: string
          current_period_visits: number
          prior_period_visits: number
          current_unique: number
          prior_unique: number
          avg_dwell_seconds: number | null
        }[]
      }
      analytics_place_daily_visits: {
        Args: { p_place_id: string; p_date_from: string; p_date_to: string }
        Returns: {
          visit_date: string
          visit_count: number
          unique_visitors: number
        }[]
      }
      analytics_place_peak_hours: {
        Args: { p_place_id: string; p_date_from: string; p_date_to: string }
        Returns: {
          day_of_week: number
          hour_of_day: number
          visit_count: number
        }[]
      }
      analytics_place_also_visited: {
        Args: { p_place_id: string; p_date_from: string; p_date_to: string; p_limit?: number }
        Returns: {
          place_id: string
          place_name: string
          co_visit_count: number
        }[]
      }
      analytics_dau_mau: {
        Args: { p_days?: number }
        Returns: {
          report_date: string
          daily_active_users: number
          session_count: number
          avg_session_seconds: number | null
          monthly_active_users: number
        }[]
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
