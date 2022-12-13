declare global {
  var prisma: PrismaClient
  var supabase: SupabaseClient<any, 'public', any>
}

export {}
