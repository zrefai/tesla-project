# Getting Started

## Environment variables

Copy the contents `.env.sample` to `.env`

If any variables from `.env.sample` do not have valid values, request variable values from author

## Disable NEXT.js telemetry

First, disable next telemetry:

```bash
npx next telemetry disable
```

We do this because there is a command in next telemetry that does not agree with npm workspaces. Running without disabling telemetry will not cause functional issues, but a `npm error code ENOWORKSPACES` will print in the console when running the client from root.

## Building the client

To build the client, we can use:

```bash
npm run build
```

## Running the client

```bash
npm run dev
```

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.
