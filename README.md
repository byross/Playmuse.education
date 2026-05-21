# PlayMuse Education

Official website starter for PlayMuse Education.

## Stack

- Next.js 16
- React 19
- Cloudflare Workers
- OpenNext Cloudflare adapter

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

```bash
npm run deploy
```

The production Worker is configured in `wrangler.jsonc` as `playmuse-education` and routed to `playmuse.education/*`.
