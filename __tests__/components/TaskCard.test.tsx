import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskCard } from '../../src/components/TaskCard';
import { Task } from '../../src/types';

describe('Componente: TaskCard (Pruebas Nuevas)', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it('debe mostrar el título de la tarea correctamente', async () => {
    const task: Task = { id: 't1', title: 'Aprender React Native', status: 'pending' };
    await render(<TaskCard task={task} onDelete={mockOnDelete} />);

    expect(screen.getByText('Aprender React Native')).toBeTruthy();
  });

  it('debe mostrar "○ Pendiente" cuando el estado de la tarea es pending', async () => {
    const task: Task = { id: 't2', title: 'Tarea pendiente', status: 'pending' };
    await render(<TaskCard task={task} onDelete={mockOnDelete} />);

    expect(screen.getByText('○ Pendiente')).toBeTruthy();
  });

  it('debe mostrar "✓ Completada" cuando el estado de la tarea es completed', async () => {
    const task: Task = { id: 't3', title: 'Tarea completada', status: 'completed' };
    await render(<TaskCard task={task} onDelete={mockOnDelete} />);

    expect(screen.getByText('✓ Completada')).toBeTruthy();
  });

  it('debe invocar onDelete con el ID correcto al presionar el botón Eliminar', async () => {
    const task: Task = { id: 't4', title: 'Tarea a eliminar', status: 'pending' };
    await render(<TaskCard task={task} onDelete={mockOnDelete} />);

    await fireEvent.press(screen.getByText('Eliminar'));

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith('t4');
  });

  it('no debe invocar onDelete si no se presiona el botón', async () => {
    const task: Task = { id: 't5', title: 'Tarea sin acción', status: 'pending' };
    await render(<TaskCard task={task} onDelete={mockOnDelete} />);

    expect(mockOnDelete).not.toHaveBeenCalled();
  });
});
