import { gql } from '@/__generated__';

export const GET_TRANSFORMER_DEVICES = gql(`
  query GetTransformerDevices {
    devices(deviceType: TRANSFORMER) {
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
        cursor
      }
    }
  }
`);
