import { validateTaskTitle } from '../../src/utils/validateTask';

describe('Utilidad: validateTaskTitle (Pruebas Nuevas)', () => {
  // Pruebas de comportamiento esperado (Caminos felices)
  describe('Validación de títulos correctos', () => {
    it('debe aceptar un título con caracteres alfanuméricos comunes', () => {
      const validTitle = 'Comprar 5 manzanas';
      const result = validateTaskTitle(validTitle);
      expect(result).toBeNull();
    });

    it('debe aceptar un título que tenga exactamente el límite inferior (3 caracteres)', () => {
      const minLengthTitle = 'Pan';
      const result = validateTaskTitle(minLengthTitle);
      expect(result).toBeNull();
    });

    it('debe aceptar un título que tenga exactamente el límite superior (100 caracteres)', () => {
      const maxLengthTitle = 'a'.repeat(100);
      const result = validateTaskTitle(maxLengthTitle);
      expect(result).toBeNull();
    });

    it('debe ignorar los espacios en blanco al principio y al final para un título válido', () => {
      const titleWithSpaces = '   Ir al gimnasio   ';
      const result = validateTaskTitle(titleWithSpaces);
      expect(result).toBeNull();
    });
  });

  // Pruebas de casos de error (Caminos tristes)
  describe('Validación de títulos incorrectos', () => {
    it('debe rechazar un título que esté completamente vacío', () => {
      const result = validateTaskTitle('');
      expect(result).toBe('El título es obligatorio');
    });

    it('debe rechazar un título que contenga únicamente espacios en blanco', () => {
      const result = validateTaskTitle('       ');
      expect(result).toBe('El título es obligatorio');
    });

    it('debe rechazar un título que sea demasiado corto (1 o 2 caracteres)', () => {
      expect(validateTaskTitle('A')).toBe('El título debe tener al menos 3 caracteres');
      expect(validateTaskTitle('Ir')).toBe('El título debe tener al menos 3 caracteres');
    });

    it('debe rechazar un título que exceda el límite máximo (101 caracteres)', () => {
      const tooLongTitle = 'a'.repeat(101);
      const result = validateTaskTitle(tooLongTitle);
      expect(result).toBe('El título no puede exceder los 100 caracteres');
    });

    it('debe rechazar un título que parezca válido pero que solo tenga espacios extra (ej: "A  ")', () => {
      const deceptiveTitle = 'A  ';
      const result = validateTaskTitle(deceptiveTitle);
      expect(result).toBe('El título debe tener al menos 3 caracteres');
    });
  });
});
