export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: 'all good' }), {
    status: 200
  })
}