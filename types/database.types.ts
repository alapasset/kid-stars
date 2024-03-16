export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity: {
        Row: {
          created_at: string
          description: string
          family: string | null
          id: string
          name: string
          points: number
        }
        Insert: {
          created_at?: string
          description: string
          family?: string | null
          id?: string
          name: string
          points: number
        }
        Update: {
          created_at?: string
          description?: string
          family?: string | null
          id?: string
          name?: string
          points?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_activity_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          }
        ]
      }
      family: {
        Row: {
          creator: string
          id: string
          name: string
        }
        Insert: {
          creator: string
          id?: string
          name: string
        }
        Update: {
          creator?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_family_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      family_member: {
        Row: {
          code: string | null
          family: string
          id: string
          pseudo: string
          role: string
          user: string | null
        }
        Insert: {
          code?: string | null
          family: string
          id?: string
          pseudo: string
          role: string
          user?: string | null
        }
        Update: {
          code?: string | null
          family?: string
          id?: string
          pseudo?: string
          role?: string
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_family_member_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_family_user_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          }
        ]
      }
      point: {
        Row: {
          activity: string | null
          child: string
          created_at: string
          id: string
          points: number
          task: string | null
          tutor: string
        }
        Insert: {
          activity?: string | null
          child?: string
          created_at?: string
          id?: string
          points: number
          task?: string | null
          tutor?: string
        }
        Update: {
          activity?: string | null
          child?: string
          created_at?: string
          id?: string
          points?: number
          task?: string | null
          tutor?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_point_activity_fkey"
            columns: ["activity"]
            isOneToOne: false
            referencedRelation: "activity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_point_child_fkey"
            columns: ["child"]
            isOneToOne: false
            referencedRelation: "family_member"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_point_task_fkey"
            columns: ["task"]
            isOneToOne: false
            referencedRelation: "task"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_point_tutor_fkey"
            columns: ["tutor"]
            isOneToOne: false
            referencedRelation: "family_member"
            referencedColumns: ["id"]
          }
        ]
      }
      task: {
        Row: {
          child: string | null
          created_at: string
          description: string | null
          family: string
          id: string
          name: string
          points: number
          status: string | null
          tutor: string
        }
        Insert: {
          child?: string | null
          created_at?: string
          description?: string | null
          family: string
          id?: string
          name: string
          points: number
          status?: string | null
          tutor: string
        }
        Update: {
          child?: string | null
          created_at?: string
          description?: string | null
          family?: string
          id?: string
          name?: string
          points?: number
          status?: string | null
          tutor?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_task_child_fkey"
            columns: ["child"]
            isOneToOne: false
            referencedRelation: "family_member"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_task_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_task_tutor_fkey"
            columns: ["tutor"]
            isOneToOne: false
            referencedRelation: "family_member"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
