import { createClient } from '@supabase/supabase-js';
import { isRateLimited, recordFailedAttempt, clearAttempts } from './_rateLimit';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (isRateLimited(req)) {
    return res.status(429).json({ error: 'Too many failed attempts. Try again later.' });
  }

  const { action, password, data } = req.body;

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    recordFailedAttempt(req);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  clearAttempts(req);

  const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  try {
    let result: any;

    switch (action) {
      case 'list': {
        const { data: rows, error } = await supabase.from('testimonials').select('*').order('display_order');
        if (error) throw error;
        result = rows;
        break;
      }

      case 'create': {
        const { error } = await supabase.from('testimonials').insert([data]);
        if (error) throw error;
        result = { success: true };
        break;
      }

      case 'update': {
        const { id, ...fields } = data;
        const { error } = await supabase.from('testimonials').update(fields).eq('id', id);
        if (error) throw error;
        result = { success: true };
        break;
      }

      case 'delete': {
        const { error } = await supabase.from('testimonials').delete().eq('id', data.id);
        if (error) throw error;
        result = { success: true };
        break;
      }

      case 'toggle_visibility': {
        const { error } = await supabase.from('testimonials').update({ is_visible: data.is_visible }).eq('id', data.id);
        if (error) throw error;
        result = { success: true };
        break;
      }

      case 'reorder': {
        for (const item of data) {
          const { error } = await supabase.from('testimonials').update({ display_order: item.display_order }).eq('id', item.id);
          if (error) throw error;
        }
        result = { success: true };
        break;
      }

      case 'duplicate': {
        const { data: original, error: fetchErr } = await supabase.from('testimonials').select('*').eq('id', data.id).single();
        if (fetchErr) throw fetchErr;

        const { id: _id, created_at: _ca, updated_at: _ua, ...rest } = original;
        const { error } = await supabase
          .from('testimonials')
          .insert([{ ...rest, name: `${rest.name} (Copy)`, display_order: rest.display_order + 1 }]);
        if (error) throw error;
        result = { success: true };
        break;
      }

      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }

    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
