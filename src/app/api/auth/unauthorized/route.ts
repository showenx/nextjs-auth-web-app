export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: 'Unauthorized' }), {
    status: 401
  })
}