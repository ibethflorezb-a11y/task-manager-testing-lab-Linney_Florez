import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { TaskForm } from '../../src/components/TaskForm';

describe('TaskForm', () => {
  it('llama a onSubmit con el título ingresado al presionar "Guardar"', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.changeText(
      screen.getByPlaceholderText('Escribe el título de la tarea'),
      'Mi nueva tarea'
    );
    await fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).toHaveBeenCalledWith('Mi nueva tarea');
  });

  it('no llama a onSubmit si el campo está vacío', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);

    await fireEvent.press(screen.getByText('Guardar'));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});

// ─── PRUEBAS NUEVAS AGREGADAS (Actividad 2) ──────────────────────────────────
describe('TaskForm - Pruebas Nuevas con fireEvent', () => {
  it('debe renderizar el input de texto y el botón Guardar', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByPlaceholderText('Escribe el título de la tarea')).toBeTruthy();
    expect(screen.getByText('Guardar')).toBeTruthy();
  });

  it('debe actualizar el valor del input cuando el usuario escribe', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText('Escribe el título de la tarea');
    await fireEvent.changeText(input, 'Nueva tarea de prueba');
    
    expect(input.props.value).toBe('Nueva tarea de prueba');
  });

  it('no debe invocar onSubmit si el input contiene únicamente espacios en blanco', async () => {
    const mockOnSubmit = jest.fn();
    await render(<TaskForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByPlaceholderText('Escribe el título de la tarea');
    await fireEvent.changeText(input, '      ');
    
    const submitButton = screen.getByText('Guardar');
    await fireEvent.press(submitButton);
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
