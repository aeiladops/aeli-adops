import { createClient } from '@supabase/supabase-js';

export type LeadStatus =
  | 'New'
  | 'Reviewing'
  | 'Contacted'
  | 'Audit In Progress'
  | 'Audit Sent'
  | 'Follow-up'
  | 'Converted'
  | 'Closed';

export type LeadPriority = 'Low' | 'Medium' | 'High';

export type FormSource = 'Free Publisher Audit' | 'Contact Form' | 'Service Request';

export interface InternalNote {
  id: string;
  text: string;
  created_at: string;
  author: string;
}

export interface FollowUpInfo {
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  note?: string;
}

export interface FollowUpRecord {
  id: string;
  lead_id: string;
  lead_name: string;
  lead_company?: string;
  date: string;
  time?: string;
  note?: string;
  completed: boolean;
  created_at: string;
}

export type AuditStatus = 'Requested' | 'Reviewing' | 'Report Preparing' | 'Report Ready' | 'Sent' | 'Completed';

export interface AuditRequestRecord {
  id: string;
  lead_id: string;
  publisher_name: string;
  company?: string;
  website: string;
  monthly_pageviews: string;
  ad_platform: string;
  submitted_date: string;
  audit_status: AuditStatus;
  assigned_to?: string;
  follow_up_date?: string;
}

export interface LeadRecord {
  id: string; // Format: AELI-2026-0001
  date_created: string;
  full_name: string;
  company?: string;
  website: string;
  email: string;
  phone?: string;
  form_source: FormSource;
  service_requested?: string;
  monthly_pageviews?: string;
  website_category?: string;
  current_ad_platform?: string;
  audience_geography?: string;
  preferred_contact_method?: string;
  requirements?: string;
  additional_info?: string;
  status: LeadStatus;
  priority: LeadPriority;
  next_follow_up?: FollowUpInfo;
  notes: InternalNote[];
  converted_client_id?: string;
  updated_at: string;
}

export type ClientStatus = 'Active' | 'On Hold' | 'Completed' | 'Inactive';

export interface ClientRecord {
  id: string; // Format: AELI-CLI-2026-0001
  company: string;
  website: string;
  primary_contact: string;
  email: string;
  phone: string;
  services: string[];
  start_date: string;
  status: ClientStatus;
  notes: InternalNote[];
  original_lead_id?: string;
  created_at: string;
  updated_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nwnworfeizkgkqegugwo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Global In-Memory Store for real live execution & Supabase sync
const initialLeads: LeadRecord[] = [];
const initialClients: ClientRecord[] = [];
const initialAudits: AuditRequestRecord[] = [];

let globalLeadsStore: LeadRecord[] = [...initialLeads];
let globalClientsStore: ClientRecord[] = [...initialClients];
let globalAuditsStore: AuditRequestRecord[] = [...initialAudits];

let leadCounter = 1;
let clientCounter = 1;

export function generateNextLeadId(): string {
  const year = new Date().getFullYear();
  // Find highest existing counter
  const maxExisting = globalLeadsStore.reduce((max, lead) => {
    const match = lead.id.match(/AELI-\d{4}-(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return num > max ? num : max;
    }
    return max;
  }, 0);

  const nextNum = Math.max(leadCounter, maxExisting + 1);
  leadCounter = nextNum + 1;
  return `AELI-${year}-${String(nextNum).padStart(4, '0')}`;
}

export function generateNextClientId(): string {
  const year = new Date().getFullYear();
  const maxExisting = globalClientsStore.reduce((max, cli) => {
    const match = cli.id.match(/AELI-CLI-\d{4}-(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return num > max ? num : max;
    }
    return max;
  }, 0);

  const nextNum = Math.max(clientCounter, maxExisting + 1);
  clientCounter = nextNum + 1;
  return `AELI-CLI-${year}-${String(nextNum).padStart(4, '0')}`;
}

/* ── LEADS METHODS ── */
export async function fetchLeadsFromStore(): Promise<LeadRecord[]> {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('date_created', { ascending: false });

    if (!error && data && data.length > 0) {
      return data as LeadRecord[];
    }
  } catch {
    // Supabase table not created or network issue; use local store
  }
  return globalLeadsStore;
}

export async function fetchLeadByIdFromStore(id: string): Promise<LeadRecord | null> {
  const leads = await fetchLeadsFromStore();
  return leads.find((l) => l.id === id) || null;
}

export async function createLeadInStore(newLeadData: Partial<LeadRecord>): Promise<LeadRecord> {
  const leadId = newLeadData.id || generateNextLeadId();
  const now = new Date().toISOString();

  const newLead: LeadRecord = {
    id: leadId,
    date_created: now,
    full_name: newLeadData.full_name || 'Anonymous Publisher',
    company: newLeadData.company || '',
    website: newLeadData.website || '',
    email: newLeadData.email || '',
    phone: newLeadData.phone || '',
    form_source: newLeadData.form_source || 'Contact Form',
    service_requested: newLeadData.service_requested || 'General Inquiry',
    monthly_pageviews: newLeadData.monthly_pageviews || 'Not Specified',
    website_category: newLeadData.website_category || 'General',
    current_ad_platform: newLeadData.current_ad_platform || 'Not Specified',
    audience_geography: newLeadData.audience_geography || 'Not Specified',
    preferred_contact_method: newLeadData.preferred_contact_method || 'Email',
    requirements: newLeadData.requirements || '',
    additional_info: newLeadData.additional_info || '',
    status: newLeadData.status || 'New',
    priority: newLeadData.priority || 'Medium',
    next_follow_up: newLeadData.next_follow_up,
    notes: newLeadData.notes || [
      {
        id: `note-${Date.now()}`,
        text: `Lead automatically created from ${newLeadData.form_source || 'Website Form'}.`,
        created_at: now,
        author: 'System',
      },
    ],
    updated_at: now,
  };

  try {
    const { data, error } = await supabase.from('leads').insert([newLead]).select();
    if (!error && data && data.length > 0) {
      globalLeadsStore.unshift(data[0] as LeadRecord);
    }
  } catch {
    // Fallback store update
  }

  const existingIdx = globalLeadsStore.findIndex((l) => l.id === leadId);
  if (existingIdx !== -1) {
    globalLeadsStore[existingIdx] = newLead;
  } else {
    globalLeadsStore.unshift(newLead);
  }

  // If this is a Free Publisher Audit, auto-create audit record
  if (newLead.form_source === 'Free Publisher Audit') {
    await createAuditRequestInStore({
      lead_id: newLead.id,
      publisher_name: newLead.full_name,
      company: newLead.company,
      website: newLead.website,
      monthly_pageviews: newLead.monthly_pageviews || 'Not Specified',
      ad_platform: newLead.current_ad_platform || 'Not Specified',
      submitted_date: now,
      audit_status: 'Requested',
    });
  }

  return newLead;
}

export async function updateLeadInStore(id: string, updates: Partial<LeadRecord>): Promise<LeadRecord | null> {
  const now = new Date().toISOString();
  try {
    const { data, error } = await supabase
      .from('leads')
      .update({ ...updates, updated_at: now })
      .eq('id', id)
      .select();

    if (!error && data && data.length > 0) {
      const updated = data[0] as LeadRecord;
      const idx = globalLeadsStore.findIndex((l) => l.id === id);
      if (idx !== -1) globalLeadsStore[idx] = updated;
      return updated;
    }
  } catch {
    // Fallback store update
  }

  const idx = globalLeadsStore.findIndex((l) => l.id === id);
  if (idx === -1) return null;

  globalLeadsStore[idx] = {
    ...globalLeadsStore[idx],
    ...updates,
    updated_at: now,
  };
  return globalLeadsStore[idx];
}

export async function addNoteToLeadInStore(id: string, noteText: string, author: string = 'Admin'): Promise<LeadRecord | null> {
  const lead = await fetchLeadByIdFromStore(id);
  if (!lead) return null;

  const newNote: InternalNote = {
    id: `note-${Date.now()}`,
    text: noteText,
    created_at: new Date().toISOString(),
    author,
  };

  const updatedNotes = [newNote, ...(lead.notes || [])];
  return updateLeadInStore(id, { notes: updatedNotes });
}

export async function convertLeadToClientInStore(leadId: string): Promise<{ lead: LeadRecord; client: ClientRecord } | null> {
  const lead = await fetchLeadByIdFromStore(leadId);
  if (!lead) return null;

  const clientId = generateNextClientId();
  const now = new Date().toISOString();

  const newClient: ClientRecord = {
    id: clientId,
    company: lead.company || lead.full_name,
    website: lead.website,
    primary_contact: lead.full_name,
    email: lead.email,
    phone: lead.phone || '',
    services: lead.service_requested ? [lead.service_requested] : ['Monetisation Services'],
    start_date: now.split('T')[0],
    status: 'Active',
    original_lead_id: lead.id,
    notes: [
      {
        id: `cnote-${Date.now()}`,
        text: `Converted from Lead ${lead.id}. Requirements: ${lead.requirements || 'N/A'}`,
        created_at: now,
        author: 'Admin',
      },
    ],
    created_at: now,
    updated_at: now,
  };

  await createClientInStore(newClient);
  const updatedLead = await updateLeadInStore(leadId, {
    status: 'Converted',
    converted_client_id: clientId,
  });

  return { lead: updatedLead || lead, client: newClient };
}

/* ── CLIENTS METHODS ── */
export async function fetchClientsFromStore(): Promise<ClientRecord[]> {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data as ClientRecord[];
    }
  } catch {
    // Fallback
  }
  return globalClientsStore;
}

export async function createClientInStore(newClient: Partial<ClientRecord>): Promise<ClientRecord> {
  const clientId = newClient.id || generateNextClientId();
  const now = new Date().toISOString();

  const client: ClientRecord = {
    id: clientId,
    company: newClient.company || 'Unknown Company',
    website: newClient.website || '',
    primary_contact: newClient.primary_contact || 'Main Contact',
    email: newClient.email || '',
    phone: newClient.phone || '',
    services: newClient.services || ['Monetisation Services'],
    start_date: newClient.start_date || now.split('T')[0],
    status: newClient.status || 'Active',
    original_lead_id: newClient.original_lead_id,
    notes: newClient.notes || [],
    created_at: now,
    updated_at: now,
  };

  try {
    const { data, error } = await supabase.from('clients').insert([client]).select();
    if (!error && data && data.length > 0) {
      globalClientsStore.unshift(data[0] as ClientRecord);
    }
  } catch {
    // Fallback
  }

  const existingIdx = globalClientsStore.findIndex((c) => c.id === clientId);
  if (existingIdx !== -1) {
    globalClientsStore[existingIdx] = client;
  } else {
    globalClientsStore.unshift(client);
  }

  return client;
}

export async function updateClientInStore(id: string, updates: Partial<ClientRecord>): Promise<ClientRecord | null> {
  const now = new Date().toISOString();
  try {
    const { data, error } = await supabase
      .from('clients')
      .update({ ...updates, updated_at: now })
      .eq('id', id)
      .select();

    if (!error && data && data.length > 0) {
      const updated = data[0] as ClientRecord;
      const idx = globalClientsStore.findIndex((c) => c.id === id);
      if (idx !== -1) globalClientsStore[idx] = updated;
      return updated;
    }
  } catch {
    // Fallback
  }

  const idx = globalClientsStore.findIndex((c) => c.id === id);
  if (idx === -1) return null;

  globalClientsStore[idx] = {
    ...globalClientsStore[idx],
    ...updates,
    updated_at: now,
  };
  return globalClientsStore[idx];
}

/* ── AUDIT REQUESTS METHODS ── */
export async function fetchAuditRequestsFromStore(): Promise<AuditRequestRecord[]> {
  return globalAuditsStore;
}

export async function createAuditRequestInStore(audit: Partial<AuditRequestRecord>): Promise<AuditRequestRecord> {
  const newAudit: AuditRequestRecord = {
    id: audit.id || `AUDIT-${Date.now()}`,
    lead_id: audit.lead_id || '',
    publisher_name: audit.publisher_name || 'Publisher',
    company: audit.company || '',
    website: audit.website || '',
    monthly_pageviews: audit.monthly_pageviews || 'Not Specified',
    ad_platform: audit.ad_platform || 'Not Specified',
    submitted_date: audit.submitted_date || new Date().toISOString(),
    audit_status: audit.audit_status || 'Requested',
    assigned_to: audit.assigned_to || 'Vijay',
    follow_up_date: audit.follow_up_date,
  };

  globalAuditsStore.unshift(newAudit);
  return newAudit;
}

export async function updateAuditRequestInStore(id: string, updates: Partial<AuditRequestRecord>): Promise<AuditRequestRecord | null> {
  const idx = globalAuditsStore.findIndex((a) => a.id === id || a.lead_id === id);
  if (idx === -1) return null;

  globalAuditsStore[idx] = {
    ...globalAuditsStore[idx],
    ...updates,
  };
  return globalAuditsStore[idx];
}

/* ── FOLLOW-UPS METHODS ── */
export async function fetchFollowUpsFromStore(): Promise<FollowUpRecord[]> {
  const leads = await fetchLeadsFromStore();
  const followUps: FollowUpRecord[] = [];

  leads.forEach((l) => {
    if (l.next_follow_up?.date) {
      followUps.push({
        id: `fu-${l.id}`,
        lead_id: l.id,
        lead_name: l.full_name,
        lead_company: l.company,
        date: l.next_follow_up.date,
        time: l.next_follow_up.time,
        note: l.next_follow_up.note,
        completed: l.status === 'Converted' || l.status === 'Closed',
        created_at: l.date_created,
      });
    }
  });

  return followUps;
}
