# tempislabs.com

The Tempis Play marketing site (Next.js). Owned by marketing.

- Brand tokens: `app/globals.css` (every colour is a Tempis Play theme ramp step).
- Site facts (support email, URLs, side-game list): `app/site.ts`.
- Sign-ups (`/beta`, `/clubs`) post to `app/api/signup/route.ts`, which emails the team inbox through Resend. Set `RESEND_API_KEY`, `SIGNUP_TO_EMAIL` and `SIGNUP_FROM_EMAIL` in the hosting environment.
- Privacy policy lives in Play: `/privacy` redirects to https://play.tempislabs.com/privacy.

```bash
npm install
npm run dev
```
