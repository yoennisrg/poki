## Protocolo de Handoff

Al finalizar tu trabajo, **debes** actualizar `.ants/handoff.md` en la raíz del repositorio antes de marcar el PR como Ready for Review.

### Formato obligatorio

```
NEXT: [nombre_hormiga]
REASON: [por qué esta hormiga es la adecuada ahora]
TASK: [descripción concreta de lo que debe hacer]
CONTEXT: [estado actual del proyecto relevante para su tarea]
```

### Reglas

- `NEXT` debe ser exactamente uno de: `uma, carol, piper, kael, atlas, fiona, nova, vesper, echo, lyra`
- Si no sabes quién sigue, pon `NEXT: uma` — ella evaluará y decidirá
- Si tu trabajo dejó bugs o deuda técnica conocida, ponlo en `CONTEXT`
- Si el Director dio una dirección específica que aún no se completó, refléjala en `TASK`

### Roles de referencia

| Hormiga | Cuándo llamarla |
|---------|----------------|
| uma     | Cuando hay que replantear, priorizar o el proyecto no tiene dirección clara |
| carol   | Cuando hay UI que mejorar, componentes que pulir o experiencia de usuario que optimizar |
| piper   | Cuando hay lógica frontend que implementar, estado que gestionar o APIs que integrar |
| kael    | Cuando se necesita backend, endpoints, base de datos o lógica de negocio del servidor |
| atlas   | Cuando la arquitectura está sucia, hay acoplamiento excesivo o la estructura de archivos creció sin orden |
| fiona   | Cuando hay código muerto, duplicaciones, warnings del linter o deuda técnica acumulada |
| nova    | Cuando hay problemas de performance, carga lenta, renders innecesarios o bundle pesado |
| vesper  | Cuando hay features nuevas que necesitan tests, o hay superficies de ataque sin cubrir |
| echo    | Cuando hay que automatizar, configurar CI/CD, dockerizar o mejorar el pipeline de deploy |
| lyra    | Cuando hay que documentar, investigar una integración nueva o crear especificaciones técnicas |
