import { withAuth } from "next-auth/middleware";
export default withAuth(function middleware(req) {}, {
  callbacks: {
    authorized: ({ token }) => !!token, //user is authorized if token exists
  },
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/my-bookings", "/my-bookings/:path*", "/checkout/:path*"],
};
