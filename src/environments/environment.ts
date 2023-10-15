import { NgxLoggerLevel } from 'ngx-logger';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  logLevel: NgxLoggerLevel.TRACE,
  serverLogLevel: NgxLoggerLevel.OFF,

  AZURE_OPENAI_ENDPOINT: "https://chatgpt230918.openai.azure.com/",
  AZURE_OPENAI_API_KEY: "f7c8490854b34c88b38fd533bff8e4f4",
  AZURE_OPENAI_DEPLOYMENT_NAME: "chatgpt01",

  AZURE_ENTRA_CLIENT_ID: 'ae614edd-8dd5-4ed1-b174-93e5dd6b8190',
  AZURE_ENTRA_CLIENT_SECTRET: 'e9b9b6c5-5e4a-4b0e-8a1d-3b9b1a4c9a3e',
  AZURE_OPENAI_API_AUTHORITY: 'https://login.microsoftonline.com/595d8e84-96b4-41b1-b112-e9e7c2688e53',
  AZURE_OPENAI_API_REDIRECT_URI: 'http://localhost:4200',

  COSMOSDB_ENDPOINT: 'https://aiex-members.documents.azure.com:443/',
  COSMOSDB_KEY: 'ScJ7H1bNU2jo6gjkvvLUHjHGwTLc2wuwxCMS59GyK83ECAuk0Pe7y3egng7NemRnfye85CD3sSwkACDb96GpDg==',
  COSMOSDB_ID: 'members',
  COSMOSDB_CONTAINER_ID: 'membersdata',
};
