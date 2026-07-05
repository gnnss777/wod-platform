import { createId } from "@paralleldrive/cuid2";
import { supabaseAdmin } from "./supabase-admin";

function applyFilters(query: any, where: Record<string, any>) {
  for (const [k, v] of Object.entries(where)) {
    if (v !== undefined) query = query.eq(k, v);
  }
  return query;
}

function applyOrder(query: any, orderBy: any) {
  const arr = Array.isArray(orderBy) ? orderBy : [orderBy];
  for (const o of arr) {
    const [[field, dir]] = Object.entries(o);
    query = query.order(field, { ascending: dir === "asc" });
  }
  return query;
}

export const db = {
  async find<T>(table: string, where: Record<string, any>, select = "*", opts?: { orderBy?: any; take?: number }): Promise<T[]> {
    let q = applyFilters(supabaseAdmin.from(table).select(select), where);
    if (opts?.orderBy) q = applyOrder(q, opts.orderBy);
    if (opts?.take) q = q.limit(opts.take);
    const { data } = await q;
    return (data || []) as T[];
  },

  async get<T>(table: string, where: Record<string, any>, select = "*"): Promise<T | null> {
    const { data } = await applyFilters(supabaseAdmin.from(table).select(select), where).maybeSingle();
    return data as T | null;
  },

  async create<T>(table: string, data: any): Promise<T> {
    const now = new Date().toISOString();
    const { data: r, error } = await supabaseAdmin.from(table).insert({ id: createId(), ...data, createdAt: now, updatedAt: now }).select().single();
    if (error) throw error;
    return r as T;
  },

  async update<T>(table: string, where: Record<string, any>, data: any): Promise<T | null> {
    const { data: r, error } = await applyFilters(supabaseAdmin.from(table).update({ ...data, updatedAt: new Date().toISOString() }).select(), where).maybeSingle();
    if (error) throw error;
    return r as T | null;
  },

  async remove<T>(table: string, id: string): Promise<T | null> {
    const { data, error } = await supabaseAdmin.from(table).delete().eq("id", id).select().maybeSingle();
    if (error) throw error;
    return data as T | null;
  },

  async count(table: string, where: Record<string, any> = {}): Promise<number> {
    const { count, error } = await applyFilters(supabaseAdmin.from(table).select("*", { count: "exact", head: true }), where);
    if (error) throw error;
    return count || 0;
  },

  async batchCounts(table: string, field: string, values: string[]): Promise<Record<string, number>> {
    if (!values.length) return {};
    const { data } = await supabaseAdmin.from(table).select(field).in(field, values);
    const map: Record<string, number> = {};
    for (const row of data || []) {
      const v = (row as any)[field];
      map[v] = (map[v] || 0) + 1;
    }
    return map;
  },
};