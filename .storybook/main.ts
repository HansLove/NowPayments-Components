import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  core: {
    disableWhatsNewNotifications: true,
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite')

    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': new URL('../src', import.meta.url).pathname,
          '@/components': new URL('../src/components', import.meta.url).pathname,
          '@/hooks': new URL('../src/hooks', import.meta.url).pathname,
          '@/types': new URL('../src/types', import.meta.url).pathname,
          '@/utils': new URL('../src/utils', import.meta.url).pathname,
          '@/stores': new URL('../src/stores', import.meta.url).pathname,
          '@/styles': new URL('../src/styles', import.meta.url).pathname,
        },
      },
    })
  },
}

export default config