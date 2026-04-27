import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color: string;
}

const CustomerStatsCard = ({ title, value, icon: Icon, trend, color }: StatsCardProps) => (
  <div className="parakh-card p-6">
    <div className={`parakh-card-gradient h-1 ${color}`} />
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        {trend && (
          <p className="text-xs text-pink-600 mt-1 font-semibold">
            {trend}
          </p>
        )}
      </div>
      <div className={`h-12 w-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </div>
);

export default CustomerStatsCard;
