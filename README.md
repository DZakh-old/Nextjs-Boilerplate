# Nextjs Boilerplate

```bash
npm ci
npm run dev
```

## File generation

```bash
npm run generate
```

### Components

You can create a component of folowing types:

- connected

> These components are strongly connected to your app. Have some certain layout, hardcoded constants, use app store or some other ingaged in your busyness logic.

- ui

> These components shouldn't contain any app specific code. So if you directly use your store here, you do something wrong. Ideally there shouldn't be any imports from your app, and even util functions should be passed via props or be contained in the component itself.
