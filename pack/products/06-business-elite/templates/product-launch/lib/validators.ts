export interface LeadPayload {
  name: string;
  email: string;
  company?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(input: unknown): LeadPayload {
  if (!input || typeof input !== 'object') throw new Error('Invalid JSON body');
  const { name, email, company } = input as Record<string, unknown>;
  if (typeof name !== 'string' || name.trim().length < 2) throw new Error('Name must be at least 2 characters');
  if (typeof email !== 'string' || !EMAIL_RE.test(email)) throw new Error('Valid email required');
  return { name: name.trim(), email: email.trim().toLowerCase(), company: typeof company === 'string' ? company.trim() : undefined };
}
