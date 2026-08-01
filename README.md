# Task Manager Testing Lab - Actividad 2

Suite completa de pruebas unitarias, de hooks personalizados y de componentes de interfaz para la aplicación Task Manager.

## 📋 Descripción

Este proyecto implementa una suite de pruebas automatizadas utilizando **Jest** y **React Native Testing Library** para validar:

- **Pruebas Unitarias:** Funciones puras de utilidad (validateTaskTitle, filterTasksByStatus)
- **Pruebas de Hooks:** Lógica de estado con renderHook y act()
- **Pruebas de Componentes:** Interacciones de interfaz con render, screen y fireEvent

## ✅ Resultados de Pruebas

- **Test Suites:** 13 passed, 13 total
- **Tests:** 49 passed, 49 total
- **Cobertura:** 90.9% en sentencias, 83.78% en ramas, 88.88% en funciones, 91.54% en líneas

## 📊 Desglose de Pruebas

### Pruebas Unitarias (11 pruebas)
- `validateTaskTitle`: 7 pruebas (casos válidos, límite y error)
- `filterTasksByStatus`: 4 pruebas (filtrado, arreglos vacíos, excepciones)

### Pruebas de Hooks (17 pruebas)
- `useCreateTask`: 4 pruebas (estado inicial, success, error, eliminación)
- `useTaskList`: 5 pruebas (estado inicial, agregar, error, limpieza)
- `useCounter`: 5 pruebas (incremento, decremento, reset)
- Otras: 3 pruebas

### Pruebas de Componentes (14 pruebas)
- `TaskList`: 4 pruebas (lista vacía, contador singular/plural, consultas accesibles)
- `ConfirmDeleteDialog`: 4 pruebas (con fireEvent para simular eventos)
- `TaskCard`: 3 pruebas (renderizado, estado, callbacks)
- `TaskForm`: 2 pruebas (envío, validación)
- Otras: 1 prueba

## 🚀 Instalación y Ejecución

### Requisitos
- Node.js 18+
- npm

### Instalación
```bash
git clone https://github.com/ibethflorezb-a11y/task-manager-testing-lab-Linney_Florez.git
cd task-manager-testing-lab-Linney_Florez
npm install --legacy-peer-deps
```

### Ejecutar Pruebas
```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con reporte de cobertura
npm run test:coverage
```

## 📁 Estructura del Proyecto

```
.
├── src/
│   ├── components/          # Componentes React Native
│   ├── hooks/               # Hooks personalizados
│   ├── utils/               # Funciones de utilidad
│   ├── services/            # Servicios
│   ├── screens/             # Pantallas
│   └── types.ts             # Tipos TypeScript
├── __tests__/
│   ├── components/          # Pruebas de componentes
│   ├── hooks/               # Pruebas de hooks
│   ├── utils/               # Pruebas unitarias
│   ├── integration/         # Pruebas de integración
│   └── accessibility/       # Pruebas de accesibilidad
├── coverage/                # Reporte de cobertura
├── jest.config.js           # Configuración de Jest
├── package.json             # Dependencias
└── README.md                # Este archivo
```

## 🔧 Tecnologías Utilizadas

- **Jest:** Framework de pruebas
- **React Native Testing Library:** Librería para pruebas de componentes
- **TypeScript:** Lenguaje tipado
- **React Native:** Framework para aplicaciones móviles

## 📊 Mocking

Se aplicó mocking a la dependencia `taskService` utilizando `jest.mock()` para aislar la lógica del hook de factores externos como latencia de red o disponibilidad del servidor.

## 🔄 GitHub Actions

Las pruebas se ejecutan automáticamente en cada push a la rama `main` mediante GitHub Actions. Consulta el estado de las pruebas en la pestaña "Actions" del repositorio.

## 📝 Decisiones de Diseño

Para más información sobre las decisiones de diseño de las pruebas, consulta el documento `decisiones_diseno.docx`.

## 👤 Autor

Linney Florez

## 📅 Fecha

31 de julio de 2026

---

**Estado:** ✅ Todas las pruebas pasando | Cobertura: 90.9%
