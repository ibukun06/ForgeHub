/**
 * Hand-written to match supabase/migrations/0001_init.sql.
 *
 * Once this project is linked to a real Supabase project, regenerate with:
 *   npx supabase gen types typescript --project-id <ref> > src/lib/supabase/types.ts
 * and this file becomes disposable.
 *
 * Note: `Relationships` is only filled in for joins actually used so far
 * (project_members → projects/users). Add entries here as new embedded
 * selects are introduced, or regenerate against the live project.
 */

export type ProjectType = "hardware" | "software" | "research" | "multidisciplinary" | "other";
export type ProjectVisibility = "private" | "published";
export type MemberRole = "team_lead" | "contributor" | "advisor";
export type InviteRole = "contributor" | "advisor";
export type DocumentType =
  | "problem_statement"
  | "requirements"
  | "architecture"
  | "testing_plan"
  | "decisions_log"
  | "custom";
export type SectionStatus = "not_started" | "ai_draft" | "team_reviewed";
export type RevisionSource = "human" | "ai_draft";
export type NotificationType = "comment_received" | "section_assigned" | "section_stale";
export type AiRequestType = "section_draft" | "mentor_chat";

type Relationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          institution: string | null;
          bio: string | null;
          skills: string[];
          email_verified_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["users"]["Row"]> & { id: string; email: string };
        Update: Partial<Database["public"]["Tables"]["users"]["Row"]>;
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          project_type: ProjectType;
          created_by: string;
          visibility: ProjectVisibility;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["projects"]["Row"]> & {
          name: string;
          project_type: ProjectType;
          created_by: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      project_members: {
        Row: {
          id: string;
          project_id: string;
          user_id: string;
          role: MemberRole;
          joined_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["project_members"]["Row"]> & {
          project_id: string;
          user_id: string;
          role: MemberRole;
        };
        Update: Partial<Database["public"]["Tables"]["project_members"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "project_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      invites: {
        Row: {
          id: string;
          project_id: string;
          email: string;
          role: InviteRole;
          token: string;
          expires_at: string;
          accepted_at: string | null;
          created_by: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["invites"]["Row"]> & {
          project_id: string;
          email: string;
          role: InviteRole;
          created_by: string;
        };
        Update: Partial<Database["public"]["Tables"]["invites"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "invites_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      documents: {
        Row: {
          id: string;
          project_id: string;
          document_type: DocumentType;
          title: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["documents"]["Row"]> & {
          project_id: string;
          document_type: DocumentType;
        };
        Update: Partial<Database["public"]["Tables"]["documents"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "documents_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      sections: {
        Row: {
          id: string;
          document_id: string;
          prompt: string | null;
          content: string | null;
          status: SectionStatus;
          order: number;
          last_edited_by: string | null;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["sections"]["Row"]> & { document_id: string };
        Update: Partial<Database["public"]["Tables"]["sections"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "sections_document_id_fkey";
            columns: ["document_id"];
            isOneToOne: false;
            referencedRelation: "documents";
            referencedColumns: ["id"];
          },
        ];
      };
      section_revisions: {
        Row: {
          id: string;
          section_id: string;
          content_snapshot: string | null;
          edited_by: string | null;
          source: RevisionSource;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["section_revisions"]["Row"]> & {
          section_id: string;
          source: RevisionSource;
        };
        Update: Partial<Database["public"]["Tables"]["section_revisions"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "section_revisions_section_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "sections";
            referencedColumns: ["id"];
          },
        ];
      };
      decisions: {
        Row: {
          id: string;
          project_id: string;
          section_id: string | null;
          decision: string;
          alternatives: string | null;
          rationale: string;
          logged_by: string;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["decisions"]["Row"]> & {
          project_id: string;
          decision: string;
          rationale: string;
          logged_by: string;
        };
        Update: Partial<Database["public"]["Tables"]["decisions"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "decisions_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      comments: {
        Row: {
          id: string;
          section_id: string;
          author_id: string;
          content: string;
          resolved: boolean;
          resolved_by: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["comments"]["Row"]> & {
          section_id: string;
          author_id: string;
          content: string;
        };
        Update: Partial<Database["public"]["Tables"]["comments"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "comments_section_id_fkey";
            columns: ["section_id"];
            isOneToOne: false;
            referencedRelation: "sections";
            referencedColumns: ["id"];
          },
        ];
      };
      publish_snapshots: {
        Row: {
          id: string;
          project_id: string;
          public_slug: string;
          included_section_ids: string[];
          content_snapshot: Record<string, unknown>;
          published_by: string;
          published_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["publish_snapshots"]["Row"]> & {
          project_id: string;
          public_slug: string;
          content_snapshot: Record<string, unknown>;
          published_by: string;
        };
        Update: Partial<Database["public"]["Tables"]["publish_snapshots"]["Row"]>;
        Relationships: [
          {
            foreignKeyName: "publish_snapshots_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          project_id: string | null;
          type: NotificationType;
          read_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["notifications"]["Row"]> & {
          user_id: string;
          type: NotificationType;
        };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Row"]>;
        Relationships: [];
      };
      ai_generation_logs: {
        Row: {
          id: string;
          user_id: string;
          section_id: string | null;
          type: AiRequestType;
          requested_at: string;
          succeeded: boolean | null;
        };
        Insert: Partial<Database["public"]["Tables"]["ai_generation_logs"]["Row"]> & {
          user_id: string;
          type: AiRequestType;
        };
        Update: Partial<Database["public"]["Tables"]["ai_generation_logs"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      accept_invite: {
        Args: { p_token: string };
        Returns: Database["public"]["Tables"]["project_members"]["Row"];
      };
      check_ai_rate_limit: {
        Args: { p_user_id: string; p_limit?: number; p_window?: string };
        Returns: boolean;
      };
      is_project_member: {
        Args: { p_project_id: string };
        Returns: boolean;
      };
      member_role_on: {
        Args: { p_project_id: string };
        Returns: MemberRole;
      };
    };
  };
}

export type { Relationship };
