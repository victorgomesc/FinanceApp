interface Props {
  title: string;
  value: number;
  color: string;
}

export function DashboardCard({ title, value, color }: Props) {
  return (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col">
      <span className="text-gray-500 text-sm">{title}</span>
      <span className={`text-3xl font-bold mt-2 ${color}`}>
        R$ {value.toFixed(2)}
      </span>
    </div>
  );
}
