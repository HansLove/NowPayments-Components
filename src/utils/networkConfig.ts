import { USDTNetwork } from '@/types'
import type { NetworkConfig } from '@/types'

// @ts-expect-error File exists
import TronLogo from '@/assets/tron-trx-logo.png'
// @ts-expect-error File exists
import PolygonLogo from '@/assets/polygon-matic-logo.png'
// @ts-expect-error File exists
import BscLogo from '@/assets/binance-usd-busd-logo.png'
// @ts-expect-error File exists
import ArbitrumLogo from '@/assets/arbitrum-arb-logo.png'
// @ts-expect-error File exists
import SolanaLogo from '@/assets/solana-sol-logo.png'
// @ts-expect-error File exists
import NearLogo from '@/assets/near-protocol-near-logo.png'
// @ts-expect-error File exists
import OptimismLogo from '@/assets/optimism-ethereum-op-logo.png'
// @ts-expect-error File exists
import PolkadotLogo from '@/assets/polkadot-new-dot-logo.png'

/**
 * Network configuration mapping for all supported USDT networks
 */
export const NETWORK_CONFIGS: Record<USDTNetwork, NetworkConfig> = {
  [USDTNetwork.USDTTRC20]: {
    code: 'USDTTRC20',
    name: 'Tron',
    displayName: 'Tron Network',
    logoPath: TronLogo,
  },
  [USDTNetwork.USDTMATIC]: {
    code: 'USDTMATIC',
    name: 'Polygon',
    displayName: 'Polygon Network',
    logoPath: PolygonLogo,
  },
  [USDTNetwork.USDTBSC]: {
    code: 'USDTBSC',
    name: 'BSC',
    displayName: 'Binance Smart Chain',
    logoPath: BscLogo,
  },
  [USDTNetwork.USDTARB]: {
    code: 'USDTARB',
    name: 'Arbitrum',
    displayName: 'Arbitrum Network',
    logoPath: ArbitrumLogo,
  },
  [USDTNetwork.USDTSOL]: {
    code: 'USDTSOL',
    name: 'Solana',
    displayName: 'Solana Network',
    logoPath: SolanaLogo,
  },
  [USDTNetwork.USDTNEAR]: {
    code: 'USDTNEAR',
    name: 'Near',
    displayName: 'Near Network',
    logoPath: NearLogo,
  },
  [USDTNetwork.USDTOP]: {
    code: 'USDTOP',
    name: 'Optimism',
    displayName: 'Optimism Network',
    logoPath: OptimismLogo,
  },
  [USDTNetwork.USDTDOT]: {
    code: 'USDTDOT',
    name: 'Polkadot',
    displayName: 'Polkadot Network',
    logoPath: PolkadotLogo,
  },
}

/**
 * Get network configuration by network code
 * @param networkCode - USDT network code (e.g., 'USDTTRC20')
 * @returns Network configuration or undefined if not found
 */
export function getNetworkConfig(networkCode: string): NetworkConfig | undefined {
  return NETWORK_CONFIGS[networkCode as USDTNetwork]
}

/**
 * Get network configurations for an array of networks
 * @param networks - Array of USDT networks
 * @returns Array of network configurations
 */
export function getNetworkConfigs(networks: USDTNetwork[]): NetworkConfig[] {
  return networks.map(network => NETWORK_CONFIGS[network])
}

/**
 * Default supported networks for backward compatibility
 */
export const DEFAULT_NETWORKS: USDTNetwork[] = [
  USDTNetwork.USDTTRC20,
  USDTNetwork.USDTMATIC,
]
