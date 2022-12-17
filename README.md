# HomeAway

## Description

HomeAway is a Airbn-like application that was created with a range of powerful technologies including NextJS, NextAuth, TailwindCSS, Prisma, and Supabase. It boasts a variety of features that make it easy for users to login or signup with their Google account or using magic links. You can save your favorite houses and even list your own property on the platform. Each house has its own dedicated page that is generated at build time using dynamic routing, thanks to NextJS' getStaticPaths and getStaticProps functions.

Prisma serves as a bridge between the application and our cloud-based PostgreSQL server, while Supabase helps us host images in a static bucket and provide the database for the application. Overall, the webapp is designed to provide a seamless and intuitive experience for users.

I have dedicated a significant amount of time to improving the SEO, boosting performance, and making the design responsive. As a result, I was able to achieve a score of 100 on Lighthouse for the website.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Now you can start the development server:

```bash
npm run dev
```

You can create a production build with:

```bash
npm run build
```

To start the production build execute:

```bash
npm start
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
