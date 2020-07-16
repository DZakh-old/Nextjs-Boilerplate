import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function getEnvVariable(name: string): string | undefined {
  if (publicRuntimeConfig && publicRuntimeConfig[name] != null) {
    return publicRuntimeConfig[name];
  }

  return undefined;
}

export { getEnvVariable };
