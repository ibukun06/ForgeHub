# Database Workflow & Type Synchronization

ForgeHub relies on strict TypeScript type definitions generated directly from your Supabase PostgreSQL schema. Because Supabase Row-Level Security (RLS) and routing rely on precise data shapes, **Database Drift** (where the database schema and TypeScript interfaces go out of sync) is a critical risk.

## Handling Schema Changes

When you need to modify the database schema (e.g. adding a new table or column):

1. **Write the Migration**
   Add your standard `.sql` migration file in `supabase/migrations/`. 
   *Example: `0006_new_feature.sql`*

2. **Apply the Migration Locally (or to Remote)**
   Run `supabase migration up` (or apply it to your remote instance).

3. **Regenerate TypeScript Types**
   We have added the Supabase CLI as a `devDependency` to standardise this process across all environments.

   Run the following from the root directory to generate local types:
   ```bash
   npm run db:types
   ```
   
   Or, if your environment is linked to a remote Supabase project, pull the types directly from the live database:
   ```bash
   npm run db:types:linked
   ```

4. **Verify Type Consistency**
   Run the TypeScript compiler to ensure the new schema doesn't break existing frontend or API logic:
   ```bash
   npx tsc --noEmit
   ```
   *Note: Fix any resulting type errors in the source code before committing the updated `types.ts`.*

## Important Note on Custom Relationships

The `Relationships` array inside the generated `types.ts` defines how foreign keys map to tables (used extensively by Supabase's `select()` statements with embedded resources). If your migration adds a new join but it isn't properly detected by the generator, you may need to ensure your foreign key constraints are explicitly declared in the SQL. Do not manually edit the generated `types.ts` unless absolutely necessary, as it will be overwritten on the next generation.
