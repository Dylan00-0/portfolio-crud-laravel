// Reusable: label + input (children) + the validation error shown right beside the field
export default function FormField({ label, name, error, hint, children }) {
    return (
        <div>
            <label htmlFor={name} className="block mb-1 font-medium">{label}</label>
            {children}
            {hint && !error && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{hint}</p>}
            {error && <p id={`${name}-error`} role="alert" className="mt-1 text-sm text-red-700 dark:text-red-400">{error}</p>}
        </div>
    );
}
