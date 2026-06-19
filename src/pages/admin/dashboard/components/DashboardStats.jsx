import { FileText, TrendingUp, Package, CheckCircle } from 'lucide-react'

export default function DashboardStats({ dashboard, items }) {
  const stats = [
    {
      icon: FileText,
      label: 'Bills Today',
      value: dashboard.totalBills,
      color: 'orange',
    },
    {
      icon: TrendingUp,
      label: 'Sales Today',
      value: `Rs.${Number(dashboard.totalSales || 0).toLocaleString('en-IN')}`,
      color: 'green',
    },
    {
      icon: Package,
      label: 'Total Products',
      value: items.length,
      color: 'blue',
    },
    {
      icon: CheckCircle,
      label: 'Available',
      value: items.filter(p => p.available).length,
      color: 'purple',
    },
  ]

  const styles = {
    orange: 'bg-orange-50 border-orange-200',
    green:  'bg-green-50  border-green-200',
    blue:   'bg-blue-50   border-blue-200',
    purple: 'bg-purple-50 border-purple-200',
  }

  const iconStyles = {
    orange: 'text-orange-500',
    green:  'text-green-500',
    blue:   'text-blue-500',
    purple: 'text-purple-500',
  }

  const valueStyles = {
    orange: 'text-orange-600',
    green:  'text-green-600',
    blue:   'text-blue-600',
    purple: 'text-purple-600',
  }

  return (
    <div className="grid grid-cols-2 gap-3 mb-5">
      {stats.map((s) => {
        const Icon = s.icon
        return (
          <div key={s.label}
            className={`rounded-xl border-2 p-3 sm:p-4 ${styles[s.color]}`}>
            <Icon className={`w-5 h-5 mb-2 ${iconStyles[s.color]}`} />
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-gray-500 leading-tight">
              {s.label}
            </p>
            <p className={`text-xl sm:text-2xl font-extrabold mt-1 ${valueStyles[s.color]}`}>
              {s.value}
            </p>
          </div>
        )
      })}
    </div>
  )
}