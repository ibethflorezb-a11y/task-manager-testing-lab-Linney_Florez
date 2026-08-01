import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskList } from '../../src/components/TaskList';
import { Task } from '../../src/types';

const mockTask: Task = { id: '1', title: 'Tarea 1', status: 'pending' };
const anotherTask: Task = { id: '2', title: 'Tarea 2', status: 'completed' };

describe('TaskList', () => {
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it('muestra un mensaje cuando la lista está vacía', async () => {
    await render(<TaskList tasks={[]} onDelete={mockOnDelete} />);
    expect(screen.getByText('No hay tareas aún')).toBeTruthy();
  });

  it('no muestra el mensaje de lista vacía cuando hay tareas', async () => {
    await render(<TaskList tasks={[mockTask]} onDelete={mockOnDelete} />);
    expect(screen.queryByText('No hay tareas aún')).toBeNull();
  });

  it('muestra el contador de tareas en plural correctamente', async () => {
    await render(<TaskList tasks={[mockTask, anotherTask]} onDelete={mockOnDelete} />);
    expect(screen.getByText('2 tareas')).toBeTruthy();
  });
  
  it('muestra el contador de tareas en singular correctamente', async () => {
    await render(<TaskList tasks={[mockTask]} onDelete={mockOnDelete} />);
    expect(screen.getByText('1 tarea')).toBeTruthy();
  });
});
