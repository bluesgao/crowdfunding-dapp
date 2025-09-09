# NFT 市场 DApp

一个现代化的 NFT 市场去中心化应用，使用 React、TypeScript、Ant Design 和 Web3 技术构建。

## 功能特性

### 🎨 NFT 展示
- 精美的 NFT 卡片展示
- 响应式网格布局
- 悬停动画效果
- 属性标签显示

### 🔍 搜索和过滤
- 实时搜索 NFT 名称和描述
- 按价格排序（从低到高/从高到低）
- 按状态过滤（全部/出售中/我的 NFT）
- 按最新时间排序

### 💰 交易功能
- 购买 NFT
- 铸造新 NFT
- 价格显示（ETH）
- 交易状态管理

### 🎯 详情页面
- 完整的 NFT 详情展示
- 属性信息展示
- 分享功能
- 收藏功能

### 🔗 钱包集成
- MetaMask 钱包连接
- WalletConnect 支持
- 用户状态管理
- 交易确认

## 技术栈

- **前端框架**: React 19 + TypeScript
- **UI 组件库**: Ant Design
- **样式**: Tailwind CSS
- **Web3 集成**: Wagmi + Viem
- **钱包连接**: Ant Design Web3
- **构建工具**: Vite
- **状态管理**: React Hooks

## 项目结构

```
src/
├── components/          # React 组件
│   ├── NFTCard.tsx     # NFT 卡片组件
│   ├── NFTDetailModal.tsx # NFT 详情模态框
│   ├── MintNFTModal.tsx   # 铸造 NFT 模态框
│   └── NFTMarketplace.tsx # 主市场组件
├── types/              # TypeScript 类型定义
│   └── nft.ts         # NFT 相关类型
├── utils/              # 工具函数
│   └── nftContract.ts  # NFT 合约接口
├── providers.tsx       # Web3 提供者配置
├── App.tsx            # 主应用组件
└── main.tsx           # 应用入口
```

## 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 构建生产版本
```bash
npm run build
```

## 使用说明

### 连接钱包
1. 点击右上角的"连接钱包"按钮
2. 选择 MetaMask 或 WalletConnect
3. 完成钱包连接

### 浏览 NFT
- 在主页浏览所有可用的 NFT
- 使用搜索框搜索特定的 NFT
- 使用过滤器按价格或状态筛选
- 点击 NFT 卡片查看详情

### 购买 NFT
1. 找到想要购买的 NFT
2. 点击"购买"按钮
3. 确认交易
4. 等待交易完成

### 铸造 NFT
1. 确保钱包已连接
2. 点击"铸造 NFT"按钮
3. 填写 NFT 信息：
   - 名称
   - 描述
   - 上传图片
   - 添加属性（可选）
4. 确认铸造

## 配置说明

### 钱包连接配置
在 `src/providers.tsx` 中配置：
- 支持的区块链网络
- RPC 端点
- 钱包连接器

### NFT 合约配置
在 `src/utils/nftContract.ts` 中配置：
- 合约地址
- 合约 ABI
- 网络配置

## 开发说明

### 添加新的 NFT 合约
1. 在 `src/utils/nftContract.ts` 中添加合约接口
2. 更新类型定义
3. 实现相应的合约方法

### 自定义样式
- 主要样式在 `src/index.css` 中
- 使用 Tailwind CSS 类名
- 支持响应式设计

### 添加新功能
1. 创建新的组件文件
2. 更新类型定义
3. 集成到主应用中

## 注意事项

- 这是一个演示项目，使用模拟数据
- 在生产环境中需要部署真实的智能合约
- 需要配置真实的 WalletConnect 项目 ID
- 建议在测试网络上进行测试

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**注意**: 这是一个演示项目，仅用于学习和展示目的。在生产环境中使用前，请确保进行充分的安全审计和测试。