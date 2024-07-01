# Tesla Full Stack Project

## Intro

This is a full stack application built with the following technologies:

- Front-end:
  - React
  - Typescript
  - Next.js
- Back-end:
  - GraphQL
  - Node.js

I built this within a monorepo so that packages can reference other packages from within the repository. Npm workspaces is used to manage the repository. Packages include:

- `energy-sales-client`: The front-end of the application. The client handles helping a user build their assembly and manage a proposed site layout.
- `utils`: A package containing some utilities shared between packages
- `energy-sales-subgraph`: The back-end of the application. The subgraph service handles retrieving data for the devices the service wants to sell.

## energy-sales-subgraph

Built with Node.js runtime and GraphQL. Current functionality includes:

- Fetching data for devices.
- Fetching data for different device types.
- Paginated responses

The subgraph connects to a MongoDB database that I stood up for this project. All data about the devices is fetched from this database. A user is able to query for all devices or different device types in the database.

I added the ability for the service to return paginated responses in the case that more data should be added to the devices collection. This helps ensure that the application can grow properly overtime as new kinds of data or features are added.

I opted to use Federation GQL directives in the case that we wanted to add this subgraph to a Federated Supergraph.

## energy-sales-client

Built with React, Typescript, and Next.js. Current functionality includes:

- Displaying available devices from the devices collection
- Adding devices to the user's current assembly
- Previewing a site layout for the user's current assembly
- Previewing total devices, dimensions, energy output, and cost of the user's current assembly
- For every 4 battery type devices that are added to the user's current assembly, a transformer is automatically added. The user is not able to remove the transformer unless they reduce the number of battery type devices in their current assembly.

The client connects to the subgraph to retrieve data about the devices. Typings for the client are generated from the subgraph when the application is built. With this, we can follow DRY principles and have GraphQL codegen automatically generate our typings to write type safe code for our GQL queries in our client.

Since this is a single page application, I opted to build the UI in `Home`. I also made the decision to use `context` to help with the management of data across several components. This allows the components to avoid prop drilling, decouple components from other components, and helps ensures reusability. Components also become more simplified since we abstract the hard logic away from them.

When a device is added to the assembly from the `DeviceCard` component, the `context` is updated. Components like the `TotalAssemblyCard` and `SiteLayoutCard` consume these updated changes and present the data that they are responsible for. Overall, this is how all the components are able to perform their functions as outlined in the requirements.

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
