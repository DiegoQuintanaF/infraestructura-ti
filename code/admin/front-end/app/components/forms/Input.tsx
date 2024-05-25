type InputProps = {
  label: string
  type: string
  name: string
  value?: string
  hasError?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  label,
  type,
  name,
  value,
  hasError,
  onChange
}: InputProps) => {
  return (
    <label className="w-full" htmlFor={name}>
      <span>{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border border-gray-300 p-2 ${hasError ? 'border-red-500' : ''}`}
      />
    </label>
  )
}
