/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Existing Auth Endpoints
      {
        source: "/api/register",
        destination: "http://interview.tulupay.com/auth/register",
      },
      {
        source: "/api/verify-otp",
        destination: "http://interview.tulupay.com/auth/verify-otp",
      },
      {
        source: "/api/login",
        destination: "http://interview.tulupay.com/auth/login",
      },
      {
        source: "/api/forgot-password",
        destination: "http://interview.tulupay.com/auth/forgot-password",
      },
      {
        source: "/api/reset-password/:token*",
        destination: "http://interview.tulupay.com/auth/reset-password/:token*",
      },
      // Missing Auth Endpoints
      {
        source: "/api/resend-otp",
        destination: "http://interview.tulupay.com/auth/resend-otp",
      },
      {
        source: "/api/update-profile",
        destination: "http://interview.tulupay.com/auth/profile",
      },
      {
        source: "/api/update-picture",
        destination: "http://interview.tulupay.com/auth/profile-picture",
      },
      // Blog Endpoints
      {
        source: "/api/blog/create",
        destination: "http://interview.tulupay.com/blog/create",
      },
      {
        source: "/api/blog/blogs",
        destination: "http://interview.tulupay.com/blog/blogs",
      },
      {
        source: "/api/blog/comment/:blogId",
        destination: "http://interview.tulupay.com/blog/comment/:blogId",
      },
      {
        source: "/api/blog/:blogId",
        destination: "http://interview.tulupay.com/blog/:blogId",
      },
      {
        source: "/api/blog/:blogId/delete",
        destination: "http://interview.tulupay.com/blog/:blogId",
      },
      {
        source: "/api/blog/edit/:blogId",
        destination: "http://interview.tulupay.com/blog/edit/:blogId",
      },
      {
        source: "/api/blog/:blogId/like",
        destination: "http://interview.tulupay.com/blog/:blogId/like",
      },

      {
        source: "/api/profile",
        destination: "http://interview.tulupay.com/auth/profile",
      },
      {
        source: "/api/update-profile",
        destination: "http://interview.tulupay.com/auth/profile",
      },
      {
        source: "/api/update-picture",
        destination: "http://interview.tulupay.com/auth/profile-picture",
      },
    ];
  },
};

module.exports = nextConfig;