import type { Preview } from '@storybook/react-vite'
import React from 'react'

// Import component styles
import '../src/styles/index.css'

// Import NOWPayments Provider for global context
import { NowPaymentsProvider } from '../src/providers/NowPaymentsProvider'

const preview: Preview = {
  parameters: {
    // Controls configuration
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true, // Expand controls panel by default
    },
    // Actions configuration
    actions: { argTypesRegex: '^on[A-Z].*' },
    // Docs configuration
    docs: {
      toc: true, // Table of contents in docs
      autodocs: 'tag',
    },
    // Layout configuration
    layout: 'centered',
    // Accessibility addon configuration
    a11y: {
      config: {
        rules: [
          // Disable color contrast rule for stories that intentionally use low contrast
          {
            id: 'color-contrast',
            reviewOnFail: true,
          },
        ],
      },
    },
    // Viewport configuration
    viewport: {
      viewports: {
        mobile1: {
          name: 'Small mobile',
          styles: { width: '320px', height: '568px' },
          type: 'mobile',
        },
        mobile2: {
          name: 'Large mobile',
          styles: { width: '414px', height: '896px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1200px', height: '800px' },
          type: 'desktop',
        },
      },
    },
    // Story sorting
    options: {
      storySort: {
        order: [
          'NOWPayments',
          [
            'Introduction',
            'Components',
            ['Shared Components', '*', 'Modals', '*'],
            'Examples',
            '*',
          ],
        ],
      },
    },
  },
  // Global decorators
  decorators: [
    (Story: any) => {
      const apiKey = import.meta.env.VITE_STORYBOOK_NOWPAYMENTS_API_KEY

      if (!apiKey) {
        console.error('VITE_STORYBOOK_NOWPAYMENTS_API_KEY is required for Storybook. Please add it to your .env file.')
        throw new Error('Missing NOWPayments API key for Storybook')
      }

      return React.createElement(
        NowPaymentsProvider,
        { apiKey: apiKey || '', children: React.createElement(Story) },
        React.createElement(
          'div',
          { style: { fontFamily: 'system-ui, sans-serif' } },
          React.createElement(Story)
        )
      )
    },
  ],
};

export default preview;