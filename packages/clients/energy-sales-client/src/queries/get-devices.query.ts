import { gql } from '@/__generated__';

export const GET_DEVICES = gql(`
  query GetDevices {
    devices {
      edges {
        node {
          id
          name
          releaseDate
          cost {
            amount
            currency
          }
          dimensions {
            length
            width
            unit
          }
          energyMeasurement {
            value
            unit
          }
          deviceType
        }
      }
    }
  }
`);
