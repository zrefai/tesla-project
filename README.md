# Tesla Full Stack Project

Author: Zaki Refai

# Getting started

## Environment variables

We need to add our environment variable files to the subgraph and client packages. For each README listed below, only follow the `Environment variables` section:

- [Subgraph README](./packages/services/energy-sales-subgraph/README.md)
- [Client README](./packages/clients/energy-sales-client/README.md)

Values for specific environment variables should be in the submission email.

## Installing dependencies

Next step is to build from the root of this project. Run the command below:

```bash
npm install
```

## Running project

The final step is to run the project. Run the command below:

```bash
npm run build:dev
```

The client and subgraph servers should start in parallel under `http://localhost:8000` and `http://localhost:4001/` respectively.

If no changes have been made to the project after the last time you ran the build command, you can run:

```bash
npm run dev
```
