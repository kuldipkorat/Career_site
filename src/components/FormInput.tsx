interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
  accept?: string;
  min?: number;
  error?: string;
}

export function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  multiline = false,
  rows = 4,
  options,
  accept,
  min,
  error,
}: FormInputProps) {
  const baseClassName = error
    ? 'w-full px-4 py-2.5 border-2 border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-red-50'
    : 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={baseClassName}
        />
      ) : options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={baseClassName}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          accept={accept}
          min={min}
          className={baseClassName}
        />
      )}

    </div>
  );
}
