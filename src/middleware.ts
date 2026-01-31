import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/embro/dash/login",
    },
});

export const config = {
    matcher: ["/embro/dash/:path*"],
};
