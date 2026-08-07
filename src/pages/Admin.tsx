import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Eye, EyeOff, Plus, Pencil, Trash2, Star, MessageSquareQuote, ArrowUp, ArrowDown, Copy, Sparkles } from 'lucide-react';

interface TestimonialRow {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  platform: string;
  platform_url: string | null;
  avatar_url: string | null;
  is_visible: boolean;
  display_order: number;
}

const emptyForm = {
  name: '', role: '', company: '', text: '', rating: 5,
  platform: 'manual', platform_url: '', avatar_url: '', is_visible: true, display_order: 0
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState(''); // stored for edge function calls
  const [showPassword, setShowPassword] = useState(false);

  // Testimonials state
  const [testimonials, setTestimonials] = useState<TestimonialRow[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [tLoading, setTLoading] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);

  // Edge function helper
  const callManage = async (action: string, data?: any) => {
    const { data: result, error } = await supabase.functions.invoke('manage-testimonials', {
      body: { action, password: adminPassword, data }
    });
    if (error) throw new Error(error.message || 'Edge function error');
    if (result?.error) throw new Error(result.error);
    return result;
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTestimonials();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate password against edge function
    try {
      const { data, error } = await supabase.functions.invoke('manage-testimonials', {
        body: { action: 'list', password }
      });
      if (error || data?.error) {
        toast.error('Invalid password');
        return;
      }
      setAdminPassword(password);
      setIsAuthenticated(true);
      toast.success('Welcome to the admin panel');
    } catch {
      toast.error('Invalid password');
    }
  };

  // --- Testimonials via edge function ---
  const fetchTestimonials = async () => {
    try {
      const rows = await callManage('list');
      if (Array.isArray(rows)) setTestimonials(rows);
    } catch (err: any) {
      toast.error('Failed to load testimonials');
    }
  };

  const openAdd = () => { setEditingId(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (t: TestimonialRow) => {
    setEditingId(t.id);
    setForm({ name: t.name, role: t.role, company: t.company, text: t.text, rating: t.rating, platform: t.platform, platform_url: t.platform_url || '', avatar_url: t.avatar_url || '', is_visible: t.is_visible, display_order: t.display_order });
    setShowForm(true);
  };

  const saveTestimonial = async () => {
    if (!form.name || !form.text) { toast.error('Name and review text are required'); return; }
    setTLoading(true);
    try {
      const payload = { ...form, platform_url: form.platform_url || null, avatar_url: form.avatar_url || null };
      if (editingId) {
        await callManage('update', { id: editingId, ...payload });
        toast.success('Testimonial updated');
      } else {
        await callManage('create', payload);
        toast.success('Testimonial added');
      }
      setShowForm(false);
      fetchTestimonials();
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    }
    setTLoading(false);
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await callManage('delete', { id });
      toast.success('Deleted');
      fetchTestimonials();
    } catch { toast.error('Failed to delete'); }
  };

  const toggleVisibility = async (t: TestimonialRow) => {
    try {
      await callManage('toggle_visibility', { id: t.id, is_visible: !t.is_visible });
      fetchTestimonials();
    } catch { toast.error('Failed to toggle visibility'); }
  };

  const duplicateTestimonial = async (id: string) => {
    try {
      await callManage('duplicate', { id });
      toast.success('Duplicated');
      fetchTestimonials();
    } catch { toast.error('Failed to duplicate'); }
  };

  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= testimonials.length) return;

    const a = testimonials[index];
    const b = testimonials[swapIndex];
    try {
      await callManage('reorder', [
        { id: a.id, display_order: b.display_order },
        { id: b.id, display_order: a.display_order },
      ]);
      fetchTestimonials();
    } catch { toast.error('Failed to reorder'); }
  };

  const visibleCount = testimonials.filter(t => t.is_visible).length;
  const hiddenCount = testimonials.length - visibleCount;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter the admin password to access the panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-muted-foreground">Manage your site settings and content</p>
        </div>

        {/* Testimonials Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareQuote className="w-5 h-5 text-primary" />
                Testimonials
              </CardTitle>
              <CardDescription>
                Manage client reviews • {visibleCount} visible, {hiddenCount} hidden
              </CardDescription>
            </div>
            <Button size="sm" onClick={openAdd} className="gap-1">
              <Plus className="w-4 h-4" /> Add
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-muted-foreground">
              💡 Paste reviews from Upwork, OnlineJobs.ph, or LinkedIn. Set the platform and link to the original review for credibility.
            </p>

            {/* Form */}
            {showForm && (
              <div className="border border-primary/20 rounded-lg p-4 space-y-4 bg-muted/30">
                <h3 className="font-semibold text-sm">{editingId ? 'Edit' : 'Add'} Testimonial</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">Name</Label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Client name" /></div>
                  <div><Label className="text-xs">Company</Label><Input value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="Company" /></div>
                  <div><Label className="text-xs">Role</Label><Input value={form.role} onChange={e => setForm({...form, role: e.target.value})} placeholder="Job title" /></div>
                  <div>
                    <Label className="text-xs">Platform</Label>
                    <Select value={form.platform} onValueChange={v => setForm({...form, platform: v})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upwork">Upwork</SelectItem>
                        <SelectItem value="onlinejobsph">OnlineJobs.ph</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div><Label className="text-xs">Review Text</Label><Textarea value={form.text} onChange={e => setForm({...form, text: e.target.value})} placeholder="Paste the client review here..." rows={3} /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label className="text-xs">Rating (1-5)</Label>
                    <div className="flex gap-1 mt-1">
                      {[1,2,3,4,5].map(r => (
                        <button key={r} onClick={() => setForm({...form, rating: r})} className="p-0.5">
                          <Star className={`w-5 h-5 ${r <= form.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div><Label className="text-xs">Display Order</Label><Input type="number" value={form.display_order} onChange={e => setForm({...form, display_order: parseInt(e.target.value) || 0})} /></div>
                  <div className="flex items-end gap-2 pb-1">
                    <Switch checked={form.is_visible} onCheckedChange={v => setForm({...form, is_visible: v})} />
                    <Label className="text-xs">{form.is_visible ? 'Visible' : 'Hidden'}</Label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">Platform URL (optional)</Label><Input value={form.platform_url} onChange={e => setForm({...form, platform_url: e.target.value})} placeholder="https://..." /></div>
                  <div><Label className="text-xs">Avatar URL (optional)</Label><Input value={form.avatar_url} onChange={e => setForm({...form, avatar_url: e.target.value})} placeholder="https://..." /></div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={saveTestimonial} disabled={tLoading}>{editingId ? 'Update' : 'Add'}</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </div>
            )}

            {/* List */}
            <div className="space-y-2">
              {testimonials.map((t, index) => (
                <div key={t.id} className="space-y-2">
                  <div className={`flex items-center gap-2 p-3 rounded-lg border ${t.is_visible ? 'border-border bg-card/50' : 'border-border/50 bg-muted/20 opacity-60'}`}>
                    {/* Reorder arrows */}
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => moveOrder(index, 'up')}
                        disabled={index === 0}
                        className="p-0.5 text-muted-foreground hover:text-primary disabled:opacity-20 transition-colors"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => moveOrder(index, 'down')}
                        disabled={index === testimonials.length - 1}
                        className="p-0.5 text-muted-foreground hover:text-primary disabled:opacity-20 transition-colors"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs text-muted-foreground w-5 text-center">{t.display_order}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{t.name} <span className="text-muted-foreground font-normal">• {t.company}</span></p>
                      <p className="text-xs text-muted-foreground truncate">{t.text.slice(0, 80)}...</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      t.platform === 'upwork' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                      t.platform === 'linkedin' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' :
                      t.platform === 'onlinejobsph' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                      'bg-muted text-muted-foreground border-border'
                    }`}>
                      {t.platform}
                    </span>
                    <div className="flex gap-0.5">
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toggleVisibility(t)} title={t.is_visible ? 'Hide' : 'Show'}>
                        {t.is_visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setPreviewId(previewId === t.id ? null : t.id)} title="Preview">
                        <Sparkles className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => duplicateTestimonial(t.id)} title="Duplicate">
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(t)} title="Edit">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => deleteTestimonial(t.id)} title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Inline preview card */}
                  {previewId === t.id && (
                    <div className="ml-8 p-4 rounded-xl border border-primary/15 bg-card/60 backdrop-blur-md max-w-[400px]">
                      <p className="text-sm leading-relaxed text-foreground/85 mb-3">"{t.text}"</p>
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-xs font-medium text-primary">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role} • {t.company}</p>
                    </div>
                  )}
                </div>
              ))}
              {testimonials.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No testimonials yet. Add your first one!</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Sign Out</Button>
      </div>
    </div>
  );
};

export default Admin;
