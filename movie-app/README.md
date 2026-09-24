# Movie App

Next.js movie browser powered by [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from the example file and add your TMDB API key:

```bash
cp .env.example .env.local
```

Get a free key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this project to GitHub.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Add the environment variable:

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_TMDB_API_KEY` | your TMDB API key |

4. Deploy. Framework preset should stay **Next.js**; build command is `npm run build`.
