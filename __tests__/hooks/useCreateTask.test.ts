import { renderHook, act } from '@testing-library/react-native';
import { useCreateTask } from '../../src/hooks/useCreateTask';
import * as taskService from '../../src/services/taskService';

// Hacemos mock del módulo taskService
jest.mock('../../src/services/taskService');

// Justificación de mocking:
// Se decide aislar la dependencia 'taskService' utilizando jest.mock() para evitar 
// que las pruebas del hook realicen llamadas reales a la red o dependan de la 
// implementación del servicio. Esto permite simular escenarios de éxito y error 
// de forma determinista y probar exclusivamente la lógica de estado del hook.

describe('useCreateTask', () => {
  const mockCreateTask = taskService.createTask as jest.Mock;

  beforeEach(() => {
    // Limpiamos los mocks antes de cada prueba
    mockCreateTask.mockClear();
  });

  it('inicia con estado "idle" y lista de tareas vacía', async () => {
    const { result } = await renderHook(() => useCreateTask());
    expect(result.current.status).toBe('idle');
    expect(result.current.tasks).toEqual([]);
  });

  it('cambia el estado a "success" y agrega la tarea al enviar exitosamente', async () => {
    // Configuramos el mock para resolver exitosamente
    const newTask = { id: '123', title: 'Nueva tarea', status: 'pending' as const };
    mockCreateTask.mockResolvedValueOnce(newTask);

    const { result } = await renderHook(() => useCreateTask());

    // Simulamos la acción asíncrona
    await act(async () => {
      await result.current.submit('Nueva tarea');
    });

    // Verificamos que se llamó al servicio con el título correcto
    expect(mockCreateTask).toHaveBeenCalledWith('Nueva tarea');
    
    // Verificamos el estado final y la lista de tareas
    expect(result.current.status).toBe('success');
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0]).toEqual(newTask);
  });

  it('cambia el estado a "error" si falla la creación', async () => {
    // Configuramos el mock para rechazar con un error
    mockCreateTask.mockRejectedValueOnce(new Error('Error de red'));

    const { result } = await renderHook(() => useCreateTask());

    // Simulamos la acción asíncrona
    await act(async () => {
      await result.current.submit('Tarea fallida');
    });

    // Verificamos el estado de error y que la lista siga vacía
    expect(result.current.status).toBe('error');
    expect(result.current.tasks).toHaveLength(0);
  });

  it('elimina una tarea existente por su id', async () => {
    // Primero agregamos una tarea exitosamente
    const newTask = { id: '123', title: 'Nueva tarea', status: 'pending' as const };
    mockCreateTask.mockResolvedValueOnce(newTask);

    const { result } = await renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit('Nueva tarea');
    });

    expect(result.current.tasks).toHaveLength(1);

    // Luego la eliminamos
    await act(async () => {
      result.current.removeTask('123');
    });

    // Verificamos que la lista vuelva a estar vacía
    expect(result.current.tasks).toHaveLength(0);
  });
});
