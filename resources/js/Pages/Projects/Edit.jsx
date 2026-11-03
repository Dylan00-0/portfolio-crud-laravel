import { Head } from '@inertiajs/react';
import ManageLayout from '@/Components/ManageLayout';
import ProjectForm from '@/Components/ProjectForm';

export default function Edit({ project }) {
    return (
        <ManageLayout title={`Edit: ${project.title}`}>
            <Head title="Edit Project" />
            <ProjectForm project={project} />
        </ManageLayout>
    );
}
