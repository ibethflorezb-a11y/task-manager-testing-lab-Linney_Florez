import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskCard } from '../../src/components/TaskCard';

const mockTask = {
  id: '1',
  title: 'Estudiar React Native con Testing Library',
  status: 'pending' as const,
};

const mockOnDelete = jest.fn();

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

// ─── PRUEBAS NUEVAS AGREGADAS (Actividad 2) ──────────────────────────────────
describe('TaskCard - Pruebas Nuevas con fireEvent', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it('debe invocar onDelete con el ID correcto cuando hay múltiples tareas y se presiona Eliminar', async () => {
    const task = { id: 'xyz-99', title: 'Tarea con ID único', status: 'pending' as const };
    await render(<TaskCard task={task} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByText('Eliminar');
    await fireEvent.press(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith('xyz-99');
  });

  it('no debe invocar onDelete si el botón de Eliminar no fue presionado', async () => {
    const task = { id: 'abc-123', title: 'Tarea sin acción', status: 'pending' as const };
    await render(<TaskCard task={task} onDelete={mockOnDelete} />);
    
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('debe mostrar el botón de eliminar con el label de accesibilidad dinámico correcto', async () => {
    const task = { id: '2', title: 'Tarea accesible', status: 'pending' as const };
    await render(<TaskCard task={task} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByLabelText('Eliminar tarea Tarea accesible');
    expect(deleteButton).toBeTruthy();
  });
});
