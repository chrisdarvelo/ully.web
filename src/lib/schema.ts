import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

export const organizations = sqliteTable('organizations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(), // cafe, roaster, distributor, farm, importer
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
  timezone: text('timezone').default('America/New_York'),
  createdAt: integer('created_at').notNull(),
})

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('owner'), // owner, manager, member
  createdAt: integer('created_at').notNull(),
})

export const equipment = sqliteTable('equipment', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id).notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(), // espresso_machine, grinder, brewer, roaster, other
  brand: text('brand'),
  model: text('model'),
  serial: text('serial'),
  status: text('status').notNull().default('active'), // active, maintenance, retired
  purchaseDate: integer('purchase_date'),
  lastService: integer('last_service'),
  notes: text('notes'),
  createdAt: integer('created_at').notNull(),
})

export const serviceRecords = sqliteTable('service_records', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id).notNull(),
  equipmentId: text('equipment_id').references(() => equipment.id).notNull(),
  date: integer('date').notNull(),
  type: text('type').notNull(), // routine, repair, calibration, cleaning
  description: text('description'),
  technician: text('technician'),
  cost: real('cost'),
  createdAt: integer('created_at').notNull(),
})

export const teamMembers = sqliteTable('team_members', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id).notNull(),
  name: text('name').notNull(),
  role: text('role').notNull(), // head_barista, barista, manager, roaster, etc.
  email: text('email'),
  phone: text('phone'),
  hourlyRate: real('hourly_rate'),
  startDate: integer('start_date'),
  status: text('status').notNull().default('active'), // active, inactive
  notes: text('notes'),
  createdAt: integer('created_at').notNull(),
})

export const schedules = sqliteTable('schedules', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id).notNull(),
  memberId: text('member_id').references(() => teamMembers.id).notNull(),
  date: integer('date').notNull(), // Unix timestamp of the day (midnight)
  shiftStart: text('shift_start').notNull(), // '06:00'
  shiftEnd: text('shift_end').notNull(), // '14:00'
  position: text('position'),
  notes: text('notes'),
  createdAt: integer('created_at').notNull(),
})

export const inventory = sqliteTable('inventory', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id).notNull(),
  name: text('name').notNull(),
  category: text('category').notNull(), // coffee, milk, cups, syrups, maintenance, other
  quantity: real('quantity').notNull().default(0),
  unit: text('unit').notNull(), // kg, lbs, liters, units, bags
  parLevel: real('par_level'), // minimum stock level before reorder
  costPerUnit: real('cost_per_unit'),
  supplier: text('supplier'),
  sku: text('sku'),
  updatedAt: integer('updated_at').notNull(),
  createdAt: integer('created_at').notNull(),
})

export const revenueRecords = sqliteTable('revenue_records', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id).notNull(),
  date: integer('date').notNull(),
  amount: real('amount').notNull(),
  category: text('category').notNull(), // drinks, food, retail, wholesale, events, other
  description: text('description'),
  paymentMethod: text('payment_method'), // cash, card, mobile
  createdAt: integer('created_at').notNull(),
})

export const expenseRecords = sqliteTable('expense_records', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id).notNull(),
  date: integer('date').notNull(),
  amount: real('amount').notNull(),
  category: text('category').notNull(), // supplies, labor, rent, equipment, utilities, marketing, other
  vendor: text('vendor'),
  description: text('description'),
  createdAt: integer('created_at').notNull(),
})

export const invites = sqliteTable('invites', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id).notNull(),
  code: text('code').notNull().unique(),
  role: text('role').notNull().default('member'), // member, manager
  createdBy: text('created_by').references(() => users.id).notNull(),
  usedBy: text('used_by').references(() => users.id),
  usedAt: integer('used_at'),
  expiresAt: integer('expires_at').notNull(),
  createdAt: integer('created_at').notNull(),
})

export const trainingLogs = sqliteTable('training_logs', {
  id: text('id').primaryKey(),
  orgId: text('org_id').references(() => organizations.id).notNull(),
  memberId: text('member_id').references(() => teamMembers.id).notNull(),
  memberName: text('member_name').notNull(),
  date: integer('date').notNull(),
  topic: text('topic').notNull(), // espresso_technique, latte_art, cupping, equipment, customer_service, other
  description: text('description'),
  score: integer('score'), // 1–5
  trainer: text('trainer'),
  notes: text('notes'),
  createdAt: integer('created_at').notNull(),
})

export type Organization = typeof organizations.$inferSelect
export type User = typeof users.$inferSelect
export type Equipment = typeof equipment.$inferSelect
export type ServiceRecord = typeof serviceRecords.$inferSelect
export type TeamMember = typeof teamMembers.$inferSelect
export type Schedule = typeof schedules.$inferSelect
export type Inventory = typeof inventory.$inferSelect
export type RevenueRecord = typeof revenueRecords.$inferSelect
export type ExpenseRecord = typeof expenseRecords.$inferSelect
export type Invite = typeof invites.$inferSelect
export type TrainingLog = typeof trainingLogs.$inferSelect
