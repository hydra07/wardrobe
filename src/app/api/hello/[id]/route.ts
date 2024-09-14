// import { NextRequest, NextResponse } from 'next/server';
// const res = NextResponse;
// const req = NextRequest;

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   // Lấy query parameters
//   const searchParams = request.nextUrl.searchParams;
//   const query = Object.fromEntries(searchParams.entries());

//   // Ví dụ: lấy một query parameter cụ thể
//   const name = searchParams.get('name');
//   const age = searchParams.get('age');

//   return NextResponse.json({
//     id: params.id,
//     query: query,
//     name: name,
//     age: age
//   });
// }
