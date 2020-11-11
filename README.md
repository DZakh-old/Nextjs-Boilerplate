# Nextjs Boilerplate

## First launch

```bash
npm ci
```

## Development

```bash
npm run dev
```

To use `https` for development server you need to generate certificates.

```bash
npm run generate-certificates
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

### Hooks

There is only one type of a hook you can create. Nothing tricky. Although I'll keep a small recommendation about hooks here.

> You've probably heard about "[Rules of hooks](https://reactjs.org/docs/hooks-rules.html)". These are great and must have to follow. **But** every rule has an exception, in particular the "exhaustive dependencies". It's exeption are `useEffect` and `useLayoutEffect`. Sometimes you want to call a function specifically on a value change and you don't really care about other dependencies. In this case it's ok to add the `eslint-disable-next-line` comment and keep coding. This is the only case where you can ignore the rule, if you do it for some other reason, you'll more likely break some thing.

### Utils

Files with utility functions. You can have only one per file or group them together if they related in a way.

> Don't create an index.js file in which you'll reexport all your utility functions. It's not implicit and prone to have dependency cycles.
