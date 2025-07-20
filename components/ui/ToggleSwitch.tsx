// components/ui/ToggleSwitch.tsx

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  name?: string;
  id?: string;
  className?: string;
}

export default function ToggleSwitch({
  checked,
  onChange,
  name,
  id,
  className = "",
}: ToggleSwitchProps) {
  return (
    <label className={`relative inline-block w-12 h-6 ${className}`}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      {/* Track */}
      <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-black transition-colors duration-300"></div>
      {/* Knob */}
      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
    </label>
  );
}