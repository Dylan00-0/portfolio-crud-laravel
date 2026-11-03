import { Head } from '@inertiajs/react';
import ManageLayout from '@/Components/ManageLayout';
import ProjectForm from '@/Components/ProjectForm';

export default function Create() {
    return (
        <ManageLayout title="Add project">
            <Head title="Add Project" />
            <ProjectForm />
        </ManageLayout>
    );
}
