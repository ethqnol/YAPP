<script lang="ts">
    import type DatabaseUser from "../lib/user_database";
    export let students: DatabaseUser[] = [];

    let loading = true;
    let error = "";

    // Function to handle deleting a student
    const deleteStudent = (primary_id: string) => {
        students = students.filter(
            (student) => student.primary_id !== primary_id,
        );
    };
</script>

<div class="container">
    <table>
        <thead>
            <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Streak</th>
                <th>Awards</th>
                <th>Project Completion</th>
                <th>Last Login</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each students as student}
                <tr>
                    <td
                        ><img
                            src={student.user.google_photo}
                            alt="Student Profile"
                            class="google-photo"
                        /></td
                    >
                    <td>{student.user.display_name}</td>
                    <td>{student.user.email}</td>
                    <td>{student.user.streak}</td>
                    <td>{student.user.awards.join(", ")}</td>
                    <td>{student.user.project_completion}%</td>
                    <td>{new Date(Number(student.user.last_login))}</td>
                    <td
                        ><button
                            class="delete-button"
                            on:click={() => deleteStudent(student.primary_id)}
                            >Delete</button
                        ></td
                    >
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .container {
        margin: 2rem auto;
        max-width: 900px;
        padding: 2rem;
        background-color: var(--color-surface-300);
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
        background-color: var(--color-surface-mixed-300);
        border-radius: 8px;
        overflow: hidden;
    }

    th,
    td {
        padding: 0.75rem;
        text-align: left;
        border-bottom: 1px solid var(--color-surface-400);
    }

    th {
        background-color: var(--color-primary-500);
        color: white;
    }

    .delete-button {
        background-color: red;
        border: none;
        color: white;
        padding: 0.5rem;
        cursor: pointer;
        border-radius: 4px;
    }

    .delete-button:hover {
        background-color: lightred;
        transform: scale(1.02);
    }

    .google-photo {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>
