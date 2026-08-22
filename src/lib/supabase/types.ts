export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_generation_logs: {
        Row: {
          id: string
          requested_at: string
          section_id: string | null
          succeeded: boolean | null
          type: Database["public"]["Enums"]["ai_request_type"]
          user_id: string
        }
        Insert: {
          id?: string
          requested_at?: string
          section_id?: string | null
          succeeded?: boolean | null
          type: Database["public"]["Enums"]["ai_request_type"]
          user_id: string
        }
        Update: {
          id?: string
          requested_at?: string
          section_id?: string | null
          succeeded?: boolean | null
          type?: Database["public"]["Enums"]["ai_request_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_generation_logs_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_generation_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          resolved: boolean
          resolved_by: string | null
          section_id: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          resolved?: boolean
          resolved_by?: string | null
          section_id: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          resolved?: boolean
          resolved_by?: string | null
          section_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      decisions: {
        Row: {
          alternatives: string | null
          created_at: string
          decision: string
          id: string
          logged_by: string
          project_id: string
          rationale: string
          section_id: string | null
        }
        Insert: {
          alternatives?: string | null
          created_at?: string
          decision: string
          id?: string
          logged_by: string
          project_id: string
          rationale: string
          section_id?: string | null
        }
        Update: {
          alternatives?: string | null
          created_at?: string
          decision?: string
          id?: string
          logged_by?: string
          project_id?: string
          rationale?: string
          section_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "decisions_logged_by_fkey"
            columns: ["logged_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decisions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decisions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          document_type: Database["public"]["Enums"]["document_type"]
          id: string
          project_id: string
          title: string | null
        }
        Insert: {
          created_at?: string
          document_type: Database["public"]["Enums"]["document_type"]
          id?: string
          project_id: string
          title?: string | null
        }
        Update: {
          created_at?: string
          document_type?: Database["public"]["Enums"]["document_type"]
          id?: string
          project_id?: string
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          created_by: string
          email: string
          expires_at: string
          id: string
          project_id: string
          role: Database["public"]["Enums"]["invite_role"]
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          created_by: string
          email: string
          expires_at?: string
          id?: string
          project_id: string
          role: Database["public"]["Enums"]["invite_role"]
          token?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          created_by?: string
          email?: string
          expires_at?: string
          id?: string
          project_id?: string
          role?: Database["public"]["Enums"]["invite_role"]
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invites_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          project_id: string | null
          read_at: string | null
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id?: string | null
          read_at?: string | null
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string | null
          read_at?: string | null
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_files: {
        Row: {
          created_at: string
          created_by: string
          file_path: string
          file_type: string | null
          id: string
          name: string
          project_id: string
          size_bytes: number | null
        }
        Insert: {
          created_at?: string
          created_by: string
          file_path: string
          file_type?: string | null
          id?: string
          name: string
          project_id: string
          size_bytes?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string
          file_path?: string
          file_type?: string | null
          id?: string
          name?: string
          project_id?: string
          size_bytes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_files_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_members: {
        Row: {
          id: string
          joined_at: string
          project_id: string
          role: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          project_id: string
          role: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          project_id?: string
          role?: Database["public"]["Enums"]["member_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_settings: {
        Row: {
          created_at: string
          features: Json
          files: Json
          project_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          features?: Json
          files?: Json
          project_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          features?: Json
          files?: Json
          project_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_settings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          project_type: Database["public"]["Enums"]["project_type"]
          slug: string
          updated_at: string
          visibility: Database["public"]["Enums"]["project_visibility"]
          workspace_id: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          project_type: Database["public"]["Enums"]["project_type"]
          slug: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["project_visibility"]
          workspace_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          project_type?: Database["public"]["Enums"]["project_type"]
          slug?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["project_visibility"]
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      publish_snapshots: {
        Row: {
          content_snapshot: Json
          id: string
          included_section_ids: string[]
          project_id: string
          public_slug: string
          published_at: string
          published_by: string
        }
        Insert: {
          content_snapshot: Json
          id?: string
          included_section_ids?: string[]
          project_id: string
          public_slug: string
          published_at?: string
          published_by: string
        }
        Update: {
          content_snapshot?: Json
          id?: string
          included_section_ids?: string[]
          project_id?: string
          public_slug?: string
          published_at?: string
          published_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "publish_snapshots_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publish_snapshots_published_by_fkey"
            columns: ["published_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      section_revisions: {
        Row: {
          content_snapshot: string | null
          created_at: string
          edited_by: string | null
          id: string
          section_id: string
          source: Database["public"]["Enums"]["revision_source"]
        }
        Insert: {
          content_snapshot?: string | null
          created_at?: string
          edited_by?: string | null
          id?: string
          section_id: string
          source: Database["public"]["Enums"]["revision_source"]
        }
        Update: {
          content_snapshot?: string | null
          created_at?: string
          edited_by?: string | null
          id?: string
          section_id?: string
          source?: Database["public"]["Enums"]["revision_source"]
        }
        Relationships: [
          {
            foreignKeyName: "section_revisions_edited_by_fkey"
            columns: ["edited_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "section_revisions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          content: string | null
          document_id: string
          id: string
          last_edited_by: string | null
          order: number
          prompt: string | null
          status: Database["public"]["Enums"]["section_status"]
          updated_at: string
        }
        Insert: {
          content?: string | null
          document_id: string
          id?: string
          last_edited_by?: string | null
          order?: number
          prompt?: string | null
          status?: Database["public"]["Enums"]["section_status"]
          updated_at?: string
        }
        Update: {
          content?: string | null
          document_id?: string
          id?: string
          last_edited_by?: string | null
          order?: number
          prompt?: string | null
          status?: Database["public"]["Enums"]["section_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sections_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sections_last_edited_by_fkey"
            columns: ["last_edited_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          accessibility: Json
          account: Json
          appearance: Json
          collaboration: Json
          created_at: string
          files: Json
          integrations: Json
          notifications: Json
          privacy: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          accessibility?: Json
          account?: Json
          appearance?: Json
          collaboration?: Json
          created_at?: string
          files?: Json
          integrations?: Json
          notifications?: Json
          privacy?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          accessibility?: Json
          account?: Json
          appearance?: Json
          collaboration?: Json
          created_at?: string
          files?: Json
          integrations?: Json
          notifications?: Json
          privacy?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          discipline: string | null
          email: string
          email_verified_at: string | null
          expertise: string[] | null
          id: string
          institution: string | null
          location: string | null
          name: string | null
          skills: string[]
          social_links: Json | null
          title: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          discipline?: string | null
          email: string
          email_verified_at?: string | null
          expertise?: string[] | null
          id: string
          institution?: string | null
          location?: string | null
          name?: string | null
          skills?: string[]
          social_links?: Json | null
          title?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          discipline?: string | null
          email?: string
          email_verified_at?: string | null
          expertise?: string[] | null
          id?: string
          institution?: string | null
          location?: string | null
          name?: string | null
          skills?: string[]
          social_links?: Json | null
          title?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      workspace_members: {
        Row: {
          id: string
          joined_at: string
          role: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_settings: {
        Row: {
          created_at: string
          general: Json
          security: Json
          updated_at: string
          workspace_id: string
        }
        Insert: {
          created_at?: string
          general?: Json
          security?: Json
          updated_at?: string
          workspace_id: string
        }
        Update: {
          created_at?: string
          general?: Json
          security?: Json
          updated_at?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_settings_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          created_by: string
          id: string
          name: string
          slug: string
          updated_at: string
          workspace_type: Database["public"]["Enums"]["workspace_type"]
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          name: string
          slug: string
          updated_at?: string
          workspace_type?: Database["public"]["Enums"]["workspace_type"]
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          slug?: string
          updated_at?: string
          workspace_type?: Database["public"]["Enums"]["workspace_type"]
        }
        Relationships: [
          {
            foreignKeyName: "workspaces_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_invite: {
        Args: { p_token: string }
        Returns: {
          id: string
          joined_at: string
          project_id: string
          role: Database["public"]["Enums"]["member_role"]
          user_id: string
        }
        SetofOptions: {
          from: "*"
          to: "project_members"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      check_ai_rate_limit: {
        Args: { p_limit?: number; p_user_id: string; p_window?: string }
        Returns: boolean
      }
      is_project_member: { Args: { p_project_id: string }; Returns: boolean }
      is_workspace_member: {
        Args: { p_workspace_id: string }
        Returns: boolean
      }
      member_role_on: {
        Args: { p_project_id: string }
        Returns: Database["public"]["Enums"]["member_role"]
      }
      published_project_team: {
        Args: { p_project_id: string }
        Returns: {
          name: string
          role: Database["public"]["Enums"]["member_role"]
          user_id: string
        }[]
      }
    }
    Enums: {
      ai_request_type: "section_draft" | "mentor_chat"
      document_type:
        | "problem_statement"
        | "requirements"
        | "architecture"
        | "testing_plan"
        | "decisions_log"
        | "custom"
      invite_role: "contributor" | "advisor"
      member_role: "team_lead" | "contributor" | "advisor"
      notification_type:
        | "comment_received"
        | "section_assigned"
        | "section_stale"
      project_type:
        | "hardware"
        | "software"
        | "research"
        | "multidisciplinary"
        | "other"
      project_visibility: "private" | "published"
      revision_source: "human" | "ai_draft"
      section_status: "not_started" | "in_progress" | "ai_draft" | "team_reviewed"
      workspace_role: "owner" | "admin" | "member" | "guest"
      workspace_type: "personal" | "team" | "organization" | "education"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ai_request_type: ["section_draft", "mentor_chat"],
      document_type: [
        "problem_statement",
        "requirements",
        "architecture",
        "testing_plan",
        "decisions_log",
        "custom",
      ],
      invite_role: ["contributor", "advisor"],
      member_role: ["team_lead", "contributor", "advisor"],
      notification_type: [
        "comment_received",
        "section_assigned",
        "section_stale",
      ],
      project_type: [
        "hardware",
        "software",
        "research",
        "multidisciplinary",
        "other",
      ],
      project_visibility: ["private", "published"],
      revision_source: ["human", "ai_draft"],
      section_status: ["not_started", "in_progress", "ai_draft", "team_reviewed"],
      workspace_role: ["owner", "admin", "member", "guest"],
      workspace_type: ["personal", "team", "organization", "education"],
    },
  },
} as const

// Utility types to maintain compatibility with existing codebase
export type InviteRole = Database['public']['Enums']['invite_role']
export type MemberRole = Database['public']['Enums']['member_role']
export type ProjectType = Database['public']['Enums']['project_type']
export type ProjectVisibility = Database['public']['Enums']['project_visibility']
export type SectionStatus = Database['public']['Enums']['section_status']
export type NotificationType = Database['public']['Enums']['notification_type']
