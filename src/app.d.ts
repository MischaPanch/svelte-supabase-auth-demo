import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { PrismaClient } from '@prisma/client';

declare global {
	type ForumRole = 'admin' | 'user';

	interface ForumUser extends User {
		forumRole?: ForumRole;
	}

	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession: () => Promise<{ session: Session | null; user: ForumUser | null }>;
			db: PrismaClient;
			session: Session | null;
			user: ForumUser | null;
		}
		interface PageData {
			session: Session | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
