import { createClient } from '@supabase/supabase-js';

const VALID_STATUSES = ['auto', 'available', 'unavailable'];

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password, status } = req.body;

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ error: `Invalid status: ${status}` });
  }

  const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { data: existing, error: fetchErr } = await supabase
    .from('site_status')
    .select('id')
    .limit(1)
    .maybeSingle();
  if (fetchErr) return res.status(500).json({ error: fetchErr.message });

  const { error } = existing
    ? await supabase.from('site_status').update({ status }).eq('id', existing.id)
    : await supabase.from('site_status').insert([{ status }]);
  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ success: true });
}
