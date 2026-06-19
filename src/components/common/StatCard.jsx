export default function StatCard({ icon: Icon, label, value, color = 'orange' }) {
  const styles = {
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
    green:  'bg-green-50  border-green-200  text-green-600',
    blue:   'bg-blue-50   border-blue-200   text-blue-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    red:    'bg-red-50    border-red-200    text-red-600',
  }
  return (
    <div className={`rounded-2xl border-2 p-5 ${styles[color]}`}>
      {Icon && <Icon className="w-7 h-7 mb-3" />}
      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="text-2xl sm:text-3xl font-extrabold mt-1">{value}</p>
    </div>
  )
}