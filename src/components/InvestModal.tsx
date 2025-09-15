import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Project } from '../types/project'
import { formatAmount } from '../utils/helper'

interface InvestModalProps {
  project: Project | null
  visible: boolean
  onClose: () => void
  onInvest: (project: Project, amount: string) => Promise<void>
}

export default function InvestModal({ project, visible, onClose, onInvest }: InvestModalProps) {
  const { t } = useTranslation()
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  if (!project || !visible) return null

  const minAmount = project.minAmount
  const maxAmount = project.maxAmount
  const currentAmount = project.currentAmount
  const goalAmount = project.targetAmount
  const remainingAmount = goalAmount - currentAmount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const investAmount = parseFloat(amount)
    
    if (investAmount < minAmount) {
      alert(t('investment.errors.minAmount', { amount: formatAmount(project.minAmount.toString()) }))
      return
    }
    
    if (investAmount > maxAmount) {
      alert(t('investment.errors.maxAmount', { amount: formatAmount(project.maxAmount.toString()) }))
      return
    }
    
    if (investAmount > remainingAmount) {
      alert(t('investment.errors.exceedsRemaining', { amount: formatAmount(remainingAmount.toString()) }))
      return
    }

    setLoading(true)
    try {
      await onInvest(project, amount)
      alert(t('investment.investmentSuccessful'))
      setAmount('')
      onClose()
    } catch {
      alert(t('investment.investmentFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setAmount('')
    onClose()
  }

  const quickAmounts = [
    { label: t('investment.quickSelect.min'), value: minAmount.toString() },
    { label: '0.01 ETH', value: '0.01' },
    { label: '0.05 ETH', value: '0.05' },
    { label: '0.1 ETH', value: '0.1' },
    { label: t('investment.quickSelect.max'), value: Math.min(maxAmount, remainingAmount).toString() }
  ]

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          onClick={handleClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-gray-900/95 backdrop-blur-md rounded-2xl text-left overflow-hidden shadow-2xl border border-gray-700/50 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-900/95 backdrop-blur-md p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">{t('investment.title')}</h2>
                <p className="text-gray-400 text-sm mt-1">{project.title}</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700/50 transition-colors text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Project Info */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">{t('project.goal')}</div>
                  <div className="font-semibold text-white">{formatAmount(project.targetAmount.toString())}</div>
                </div>
                <div>
                  <div className="text-gray-400">{t('project.raised')}</div>
                  <div className="font-semibold text-white">{formatAmount(project.currentAmount.toString())}</div>
                </div>
                <div>
                  <div className="text-gray-400">{t('investment.range')}</div>
                  <div className="font-semibold text-white">
                    {formatAmount(project.minAmount.toString())} - {formatAmount(project.maxAmount.toString())}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">{t('investment.remaining')}</div>
                  <div className="font-semibold text-white">{formatAmount(remainingAmount.toString())}</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  {t('investment.amount')} (ETH) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min={minAmount}
                  max={Math.min(maxAmount, remainingAmount)}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400"
                  placeholder={`${formatAmount(project.minAmount.toString())} - ${formatAmount(Math.min(maxAmount, remainingAmount).toString())}`}
                  required
                />
                <div className="mt-2 text-xs text-gray-400">
                  {t('investment.range')}: {formatAmount(project.minAmount.toString())} - {formatAmount(Math.min(maxAmount, remainingAmount).toString())}
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  {t('investment.quickSelect.title')}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {quickAmounts.map((quick, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setAmount(quick.value)}
                      className="px-3 py-2 text-sm bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg hover:bg-gray-700/50 text-gray-300 hover:text-white transition-colors"
                    >
                      {quick.label}
                    </button>
                  ))}
                </div>
              </div>


              {/* Risk Warning */}
              <div className="bg-yellow-900/20 backdrop-blur-sm border border-yellow-600/30 rounded-lg p-4">
                <div className="text-sm text-yellow-300">
                  <strong>{t('investment.riskWarning')}：</strong>{t('investment.riskText')}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 border border-gray-600/50 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={loading || !amount}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? t('investment.processing') : t('investment.confirmInvestment')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
