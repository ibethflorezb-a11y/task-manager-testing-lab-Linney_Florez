import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';

describe('Componente: TaskForm (Pruebas Nuevas)', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('debe renderizar el input de texto y el botón de guardar', async () => {
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('Escribe el título de la tarea')).toBeTruthy();
    expect(screen.getByText('Guardar')).toBeTruthy();
  });

  it('debe actualizar el valor del input cuando el usuario escribe', async () => {
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText('Escribe el título de la tarea');
    await fireEvent.changeText(input, 'Nueva tarea de prueba');

    expect(input.props.value).toBe('Nueva tarea de prueba');
  });

  it('debe invocar onSubmit con el título correcto cuando se presiona el botón Guardar', async () => {
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText('Escribe el título de la tarea');
    const submitButton = screen.getByText('Guardar');

    await fireEvent.changeText(input, 'Comprar pan');
    await fireEvent.press(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith('Comprar pan');
  });

  it('no debe invocar onSubmit si el input está vacío al presionar Guardar', async () => {
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByText('Guardar');
    await fireEvent.press(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('no debe invocar onSubmit si el input contiene únicamente espacios en blanco', async () => {
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    const input = screen.getByPlaceholderText('Escribe el título de la tarea');
    const submitButton = screen.getByText('Guardar');

    await fireEvent.changeText(input, '      ');
    await fireEvent.press(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
