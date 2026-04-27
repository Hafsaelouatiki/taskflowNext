import AddProjectForm from './AddProjectForm';
import { renameProject, deleteProject } from '../actions/projects';

interface Project {
  id: string;
  name: string;
  color: string;
}

export default async function DashboardPage() {
  const res = await fetch('http://localhost:3000/api/projects', {
    cache: 'no-store',
  });

  const projects: Project[] = await res.json();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      <AddProjectForm />

      <p>{projects.length} projets</p>

      <ul>
        {projects.map((p) => (
          <li
            key={p.id}
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: p.color,
                display: 'inline-block',
              }}
            />

            <a href={`/projects/${p.id}`}>{p.name}</a>

            <form action={renameProject} style={{ display: 'flex', gap: 4 }}>
              <input type="hidden" name="id" value={p.id} />
              <input
                name="newName"
                placeholder="Nouveau nom"
                required
                style={{ padding: 4 }}
              />
              <button type="submit">Renommer</button>
            </form>

            <form action={deleteProject}>
              <input type="hidden" name="id" value={p.id} />
              <button type="submit">Supprimer</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}