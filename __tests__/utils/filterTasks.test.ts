import { filterTasksByStatus } from '../../src/utils/filterTasks';
import { Task } from '../../src/types';

const mockTasks: Task[] = [
  { id: '1', title: 'Comprar leche', status: 'pending' },
  { id: '2', title: 'Estudiar React Native', status: 'completed' },
  { id: '3', title: 'Hacer ejercicio', status: 'pending' },
  { id: '4', title: 'Leer documentación de Jest', status: 'completed' },
];

// ─── Pruebas originales del código base ───────────────────────────────────────
describe('filterTasksByStatus', () => {
  it('devuelve solo las tareas con el estado indicado', () => {
    const result = filterTasksByStatus(mockTasks, 'completed');
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Estudiar React Native');
  });

  it('devuelve un arreglo vacío cuando no hay coincidencias', () => {
    const result = filterTasksByStatus(mockTasks, 'archived');
    expect(result).toEqual([]);
  });

  it('devuelve todas las tareas cuando el estado es "all"', () => {
    const result = filterTasksByStatus(mockTasks, 'all');
    expect(result).toHaveLength(4);
  });

  it('lanza un error cuando el estado es inválido', () => {
    // @ts-expect-error probando entrada inválida en runtime
    expect(() => filterTasksByStatus(mockTasks, 'invalido')).toThrow();
  });
});

// ─── Pruebas nuevas agregadas por Linney Florez ───────────────────────────────
describe('filterTasksByStatus - Casos adicionales', () => {
  const extendedTasks: Task[] = [
    { id: 't1', title: 'Aprender Jest', status: 'completed' },
    { id: 't2', title: 'Escribir pruebas', status: 'pending' },
    { id: 't3', title: 'Refactorizar código', status: 'pending' },
    { id: 't4', title: 'Subir a GitHub', status: 'archived' },
  ];

  it('debe retornar únicamente las tareas "pending" y verificar sus IDs', () => {
    const result = filterTasksByStatus(extendedTasks, 'pending');
    expect(result).toHaveLength(2);
    expect(result.map(t => t.id)).toEqual(['t2', 't3']);
  });

  it('debe retornar un arreglo vacío cuando la lista de entrada está vacía', () => {
    const result = filterTasksByStatus([], 'completed');
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(0);
  });

  it('debe lanzar un error con el mensaje exacto cuando el estado no existe', () => {
    expect(() => filterTasksByStatus(extendedTasks, 'in-progress' as any))
      .toThrow('Estado inválido: in-progress');
  });

  it('debe retornar todas las tareas sin importar su estado cuando se usa "all"', () => {
    const result = filterTasksByStatus(extendedTasks, 'all');
    expect(result).toEqual(extendedTasks);
  });
});
