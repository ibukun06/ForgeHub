/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) acc[match[1]] = match[2].trim();
  return acc;
}, {});

const { createClient } = require('@supabase/supabase-js');
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
sb.from('projects').select('id, name, created_by, workspace_id').then(res => {
  console.log("Projects:", res.data);
  sb.from('project_members').select('*').then(mem => {
    console.log("Members:", mem.data);
    process.exit(0);
  });
});
