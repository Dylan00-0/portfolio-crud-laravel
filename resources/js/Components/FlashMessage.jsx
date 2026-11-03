import { usePage } from '@inertiajs/react';

// Shows the success message sent by the controller: ->with('success', '...')
export default function FlashMessage() {
    const { flash } = usePage().props;
    if (!flash?.success) return null;
    return (
        <div role="status" className="mb-6 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 font-medium text-emerald-800 dark:border-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            {flash.success}
        </div>
    );
}
