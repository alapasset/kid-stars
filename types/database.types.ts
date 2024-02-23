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
      family: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      family_member: {
        Row: {
          code: string | null
          family: string
          id: string
          pseudo: string
          user: string | null
        }
        Insert: {
          code?: string | null
          family: string
          id?: string
          pseudo: string
          user?: string | null
        }
        Update: {
          code?: string | null
          family?: string
          id?: string
          pseudo?: string
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: `public_family_user_family_fkey`
            columns: [`family`]
            isOneToOne: false
            referencedRelation: `family`
            referencedColumns: [`id`]
          },
          {
            foreignKeyName: `public_family_user_user_fkey`
            columns: [`user`]
            isOneToOne: false
            referencedRelation: `users`
            referencedColumns: [`id`]
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
    | keyof (Database[`public`][`Tables`] & Database[`public`][`Views`])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions[`schema`]][`Tables`] &
        Database[PublicTableNameOrOptions[`schema`]][`Views`])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions[`schema`]][`Tables`] &
      Database[PublicTableNameOrOptions[`schema`]][`Views`])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database[`public`][`Tables`] &
      Database[`public`][`Views`])
  ? (Database[`public`][`Tables`] &
      Database[`public`][`Views`])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database[`public`][`Tables`]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions[`schema`]][`Tables`]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions[`schema`]][`Tables`][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database[`public`][`Tables`]
  ? Database[`public`][`Tables`][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database[`public`][`Tables`]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions[`schema`]][`Tables`]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions[`schema`]][`Tables`][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database[`public`][`Tables`]
  ? Database[`public`][`Tables`][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database[`public`][`Enums`]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions[`schema`]][`Enums`]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions[`schema`]][`Enums`][EnumName]
  : PublicEnumNameOrOptions extends keyof Database[`public`][`Enums`]
  ? Database[`public`][`Enums`][PublicEnumNameOrOptions]
  : never
