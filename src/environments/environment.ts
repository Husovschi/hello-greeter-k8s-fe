export const environment = {
  production: false,
  backendUrl: 'http://husovschi-cloud.duckdns.org:8000',
  envVarKeys: [
    { key: 'MY_NODE_NAME', value: '<MY_NODE_NAME>' },
    { key: 'MY_POD_NAME', value: '<MY_POD_NAME>' },
    { key: 'MY_POD_NAMESPACE', value: '<MY_POD_NAMESPACE>' },
    { key: 'MY_POD_IP', value: '<MY_POD_IP>' },
    { key: 'MY_POD_SERVICE_ACCOUNT', value: '<MY_POD_SERVICE_ACCOUNT>' }
  ]
};
  