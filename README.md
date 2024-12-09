# MEDUSA

Built using the starter project --> https://github.com/lambda-curry/medusa2-starter, with a customized storefront.

## Known Limitations

### Store Name
The storefront uses a fallback store name ("Tales of Murder") when the store API is unavailable. This behavior is inherited from the starter template and ensures consistent branding even when the API fails. The fallback is handled in `apps/storefront/app/root.tsx`.

While the store name can be configured in the Medusa admin panel, the storefront will use this fallback name if:
- The store API is unreachable
- The store API returns an error
- The store data is not in the expected format

This is a known limitation of the current implementation and does not affect core functionality like product display, cart operations, or navigation.

## Development Setup

### Prerequisites
- Node.js >= 20
- Docker
- Yarn

### Running the Services

The backend and storefront need to be run in separate terminals:
