import { useState } from 'react';

// FRONT-END ONLY DEMO: validated in the browser, does NOT send email or store data.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
    const [values, setValues] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('');

    const validate = () => {
        const e = {};
        if (!values.name.trim()) e.name = 'Enter your name.';
        if (!values.email.trim()) e.email = 'Enter your email.';
        else if (!emailPattern.test(values.email.trim())) e.email = 'Enter a valid email, like name@example.com.';
        if (!values.subject.trim()) e.subject = 'Enter a subject.';
        if (!values.message.trim()) e.message = 'Enter a message.';
        return e;
    };

    const submit = (ev) => {
        ev.preventDefault();
        setStatus('');
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length === 0) {
            setStatus('Thanks! Your message passed validation. (Demo only: nothing was sent.)');
            setValues(EMPTY);
        }
    };

    const field = (id, label, props = {}, Tag = 'input') => (
        <div>
            <label htmlFor={id} className="block mb-1 font-medium">{label}</label>
            <Tag id={id} name={id} value={values[id]} onChange={(e) => setValues({ ...values, [id]: e.target.value })}
                aria-invalid={errors[id] ? 'true' : 'false'} aria-describedby={`${id}-error`} className="field" {...props} />
            <p id={`${id}-error`} className="mt-1 text-sm text-red-700 dark:text-red-400" role="alert">{errors[id]}</p>
        </div>
    );

    return (
        <form onSubmit={submit} noValidate className="space-y-4">
            {field('name', 'Name', { type: 'text', autoComplete: 'name' })}
            {field('email', 'Email', { type: 'email', autoComplete: 'email' })}
            {field('subject', 'Subject', { type: 'text' })}
            {field('message', 'Message', { rows: 5 }, 'textarea')}
            <button type="submit" className="rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-900 text-white px-6 py-3 font-semibold">Send message</button>
            <p className="font-medium text-emerald-700 dark:text-emerald-400" role="status">{status}</p>
        </form>
    );
}
