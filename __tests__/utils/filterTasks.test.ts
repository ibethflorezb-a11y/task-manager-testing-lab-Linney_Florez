import { filterTasksByStatus } from '../../src/utils/filterTasks';
import { Task } from '../../src/types';

describe('Utilidad: filterTasksByStatus (Pruebas Nuevas)', () => {
  const sampleTasks: Task[] = [
    { id: 't1', title: 'Aprender Jest', status: 'completed' },
    { id: 't2', title: 'Escribir pruebas', status: 'pending' },
    { id: 't3', title: 'Refactorizar código', status: 'pending' },
    { id: 't4', title: 'Subir a GitHub', status: 'archived' },
  ];

  it('debe retornar únicamente las tareas que coincidan con el estado "pending"', () => {
    const pendingTasks = filterTasksByStatus(sampleTasks, 'pending');
    expect(pendingTasks).toHaveLength(2);
    expect(pendingTasks.every(task => task.status === 'pending')).toBe(true);
    expect(pendingTasks.map(t => t.id)).toEqual(['t2', 't3']);
  });

  it('debe retornar un arreglo vacío si no existen tareas con el estado solicitado', () => {
    // Creamos un arreglo que no tiene tareas archivadas
    const activeTasks: Task[] = [
      { id: 'a1', title: 'Activa 1', status: 'pending' },
      { id: 'a2', title: 'Activa 2', status: 'completed' }
    ];
    const archivedTasks = filterTasksByStatus(activeTasks, 'archived');
    expect(archivedTasks).toBeInstanceOf(Array);
    expect(archivedTasks).toHaveLength(0);
  });

  it('debe retornar el mismo arreglo original (sin filtrar) cuando se solicita el estado "all"', () => {
    const allTasks = filterTasksByStatus(sampleTasks, 'all');
    expect(allTasks).toHaveLength(4);
    expect(allTasks).toEqual(sampleTasks);
  });

  it('debe lanzar una excepción (Error) si se proporciona un estado que no existe en el tipo FilterStatus', () => {
    const invalidStatus = 'in-progress' as any;
    expect(() => filterTasksByStatus(sampleTasks, invalidStatus)).toThrow('Estado inválido: in-progress');
  });

  it('debe manejar correctamente un arreglo de tareas vacío', () => {
    const emptyTasks: Task[] = [];
    const result = filterTasksByStatus(emptyTasks, 'completed');
    expect(result).toEqual([]);
  });
});
