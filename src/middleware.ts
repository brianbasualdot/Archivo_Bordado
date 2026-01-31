import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/embro/dash/login",
    },
});

export const config = {
    // Esto protege todo en dash EXCEPTO la página de login
    matcher: ["/embro/dash/((?!login).*)"],
};
