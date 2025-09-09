// providers.tsx
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const config = getDefaultConfig({
  appName: '众筹平台',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // 请替换为您的实际项目 ID
  chains: [sepolia, mainnet],
  ssr: false,
})

export function Providers({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient()
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={qc}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}