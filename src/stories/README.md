# Storybook Stories Documentation

This directory contains interactive stories for the NOWPayments Components library.

## Structure

```
src/stories/
├── Introduction.mdx              # Main introduction page
├── README.md                     # This file
├── DepositModal/
│   ├── DepositModal.stories.tsx  # All DepositModal variations
│   └── mocks.ts                  # Deposit-specific mock data
└── WithdrawModal/
    ├── WithdrawModal.stories.tsx # All WithdrawModal variations
    └── mocks.ts                  # Withdraw-specific mock data
```

## Story Categories

### 1. Introduction
- **Path**: `NOWPayments Components/Introduction`
- **Purpose**: Welcome page with overview, features, and quick setup guide
- **Content**: Architecture explanation, key features, and navigation to other stories

### 2. DepositModal Stories
- **Path**: `NOWPayments/DepositModal/*`
- **Coverage**: All states and configurations of the deposit flow
- **Stories**:
  - `Default` - Standard deposit flow with mock data
  - `WithEmailInput` - Email input field enabled
  - `WithAsyncEmail` - Async email provider demonstration
  - `LoadingCurrencies` - Currency loading state
  - `ErrorState` - Error handling and retry flows
  - `LimitedCurrencies` - Limited currency options
  - `Closed` - Modal closed state for testing
  - `Mobile` - Mobile viewport testing

### 3. WithdrawModal Stories
- **Path**: `NOWPayments/WithdrawModal/*`
- **Coverage**: All withdrawal scenarios and edge cases
- **Stories**:
  - `Default` - Standard withdrawal with substantial balance
  - `LowBalance` - Low balance edge case
  - `HighBalance` - High balance scenario
  - `ZeroBalance` - No balance available
  - `MinimalBalance` - Just above minimum withdrawal
  - `SlowConversion` - Slow USDT conversion API
  - `ConversionError` - Conversion error handling
  - `Closed` - Modal closed state
  - `Mobile` - Mobile viewport testing
  - `PrefilledTron` - Tron network pre-selected
  - `PrefilledPolygon` - Polygon network pre-selected
  - `LargeAmount` - Large withdrawal amounts

## Mock Data Strategy

### Component-Specific Mocks
- **DepositModal**: `DepositModal/mocks.ts` - Currency data, deposit responses, email providers
- **WithdrawModal**: `WithdrawModal/mocks.ts` - Withdraw responses, balance converters, network data
- **Isolation**: Each component has its own focused mock data
- **Reusability**: Shared patterns with component-specific customizations

### Currency Data (DepositModal)
- **Currencies**: Bitcoin, Ethereum, USDT (TRC20/ERC20), Litecoin, Cardano, Polkadot, Ripple
- **Features**: Complete currency objects with logos, validation regex, network info
- **Email Testing**: Static strings and async function providers

### Withdrawal Data (WithdrawModal)
- **Networks**: Tron (TRC20) and Polygon (Matic) configurations
- **Converters**: Various balance-to-USDT conversion scenarios
- **Testing Helpers**: Slow converters, error converters, custom rates

### Store Management
- **Setup**: Automated store initialization in story decorators
- **State**: Currencies, enabled status, loading states, error conditions
- **Isolation**: Each story gets clean state

## Interactive Features

### Controls (Args)
- **Modal States**: Open/closed, loading, error states
- **Balance**: Adjustable user balance amounts
- **Email**: Static string or async function providers
- **Actions**: All callbacks logged to Actions panel

### Actions Logging
- **onSubmit**: Form submission with data payload
- **onSuccess**: Success callbacks with backend responses
- **onError**: Error handling demonstrations
- **onClose**: Modal close events

### Viewports
- **Desktop**: Default responsive behavior
- **Mobile**: Touch-optimized interactions
- **Tablet**: Medium screen adaptations

## Development Workflow

### Adding New Stories
1. Create story in appropriate directory
2. Import and use mock data from `mockData.ts`
3. Add decorator for store setup if needed
4. Document story purpose and test scenarios
5. Add interactive controls for key props

### Testing Stories
1. Start Storybook: `npm run storybook`
2. Navigate to http://localhost:6006
3. Test all interactive controls
4. Verify responsive behavior
5. Check console for errors

### Mock Data Updates
- **DepositModal**: `src/stories/DepositModal/mocks.ts`
- **WithdrawModal**: `src/stories/WithdrawModal/mocks.ts`
- **Scope**: Component-specific, focused on relevant test scenarios
- **Updates**: Modify specific component mocks without affecting others

## Best Practices

### Story Design
- **Single Responsibility**: Each story tests one specific scenario
- **Realistic Data**: Use plausible amounts, addresses, and currencies
- **Error Cases**: Include error states and edge cases
- **Mobile First**: Test responsive behavior

### Documentation
- **Descriptions**: Clear explanation of what each story demonstrates
- **Context**: Explain when/why to use specific configurations
- **Examples**: Provide code examples in story descriptions

### Performance
- **Lazy Loading**: Stories load components only when needed
- **Clean State**: Each story starts with fresh state
- **Mock APIs**: Fast, predictable responses for smooth development

## Theming Testing

Stories automatically inherit CSS variables from the Storybook theme. To test custom themes:

1. Modify CSS variables in browser dev tools
2. Use theme toggle addon (if available)
3. Test in different color schemes
4. Verify accessibility and contrast

## Troubleshooting

### Common Issues
- **Store State**: Ensure decorators properly initialize store
- **Mock Data**: Verify mock responses match expected interfaces
- **Loading States**: Check async function timing in stories
- **Responsive**: Test stories in different viewport sizes

### Debug Tips
- **Actions Panel**: Check callback parameters and timing
- **Console**: Monitor for TypeScript errors or warnings
- **Network Tab**: Verify no real API calls are made
- **React DevTools**: Inspect component props and state

## Integration with Main App

Stories demonstrate how to integrate components in real applications:

- **Setup**: API key configuration and store initialization
- **Callbacks**: Backend integration patterns
- **Error Handling**: Graceful error recovery
- **Theming**: CSS variable customization
- **Responsive**: Mobile-first design principles