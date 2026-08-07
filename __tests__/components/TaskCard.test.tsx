import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskCard } from '../../src/components/TaskCard';

const mockTask = {
  id: '1',
  title: 'Estudiar React Native con Testing Library',
  status: 'pending' as const,
};
const mockOnDelete = jest.fn();

// ─── Pruebas originales del código base ───────────────────────────────────────
describe('TaskCard', () => {
  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it('muestra el título de la tarea', async () => {
    await render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    expect(screen.getByText('Estudiar React Native con Testing Library')).toBeTruthy();
  });

  it('muestra el estado "Pendiente" para tareas pendientes', async () => {
    await render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    expect(screen.getByText('○ Pendiente')).toBeTruthy();
  });

  it('muestra el estado "Completada" para tareas completadas', async () => {
    const completedTask = { ...mockTask, status: 'completed' as const };
    await render(<TaskCard task={completedTask} onDelete={mockOnDelete} />);
    expect(screen.getByText('✓ Completada')).toBeTruthy();
  });

  it('llama a onDelete con el id correcto al presionar "Eliminar"', async () => {
    await render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    await fireEvent.press(screen.getByText('Eliminar'));
    expect(mockOnDelete).toHaveBeenCalledWith('1');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});

// ─── Pruebas nuevas agregadas por Linney Florez ───────────────────────────────
describe('TaskCard - Casos adicionales', () => {
  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it('debe invocar onDelete con el ID correcto cuando hay múltiples tareas', async () => {
    const task = { id: 'xyz-99', title: 'Tarea con ID único', status: 'pending' as const };
    await render(<TaskCard task={task} onDelete={mockOnDelete} />);
    await fireEvent.press(screen.getByText('Eliminar'));
    expect(mockOnDelete).toHaveBeenCalledWith('xyz-99');
  });

  it('no debe invocar onDelete si el botón no fue presionado', async () => {
    await render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('debe mostrar el botón de eliminar con el label de accesibilidad correcto', async () => {
    const task = { id: '2', title: 'Tarea accesible', status: 'pending' as const };
    await render(<TaskCard task={task} onDelete={mockOnDelete} />);
    expect(screen.getByLabelText('Eliminar tarea Tarea accesible')).toBeTruthy();
  });
});
