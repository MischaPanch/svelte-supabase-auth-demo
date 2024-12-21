export async function load({ depends, locals: { session, supabase, db }, cookies }) {
	depends('supabase:auth');
	depends('app:author');

	if (!session) {
		const { data, error } = await supabase.auth.signInAnonymously();

		if (error) {
			console.log(`error logging in anonymously: ${error}`);
		}

		session = data.session;
	}

	const author = await db.author.findFirst({
		where: {
			userId: session?.user.id
		}
	});

	console.log(`author: ${author}`);

	if (session && author) {
		session.user.user_metadata.name = author?.name;
	}

	return {
		session,
		author,
		cookies: cookies.getAll()
	};
}
