## Dont Freeze My Beer

Aplicação web para estimar o tempo de resfriamento de bebidas sem passar do ponto. O projeto usa um modelo simplificado da Lei do Resfriamento de Newton, mostrando a evolução da temperatura ao longo do tempo e o tempo estimado para atingir a temperatura ideal de cada bebida.

## Funcionalidades

- Calcula tempo estimado para a temperatura ideal de cerveja, vinho e destilados.
- Considera tipo de recipiente, tamanho e método de resfriamento.
- Exibe gráfico de resfriamento e estatísticas do resultado.
- Suporte a idiomas via rotas por idioma.

## Tecnologias

- Next.js (App Router) + React 19
- TypeScript
- Tailwind CSS
- Recharts
- React Hook Form + Zod

## Como rodar

```bash
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Calculo de temperatura

O calculo usa a Lei do Resfriamento de Newton:

$$
T(t) = T_s + (T_0 - T_s) \cdot e^{-k t}
$$

Onde:

- $T_s$ e a temperatura ambiente do método (geladeira ou freezer).
- $T_0$ e a temperatura inicial da bebida.
- $t$ e o tempo em minutos.
- $k$ e a constante de resfriamento efetiva.

No projeto, $k$ e calculado a partir de um valor base por tipo de bebida e multiplicadores de material e tamanho do recipiente:

$$
k = k_{base} \cdot m_{material} \cdot m_{tamanho}
$$

Com isso, recipientes menores e materiais mais condutivos (ex: alumínio) resultam em resfriamento mais rápido. O tempo para atingir uma temperatura alvo e calculado isolando $t$ na equação:

$$
t = -\frac{\ln\left(\frac{T - T_s}{T_0 - T_s}\right)}{k}
$$

Caso a temperatura alvo seja menor ou igual a $T_s$, o tempo tende ao infinito, pois a bebida nao atinge essa temperatura no método escolhido.

## Scripts

- `pnpm dev` inicia o servidor de desenvolvimento.
- `pnpm build` gera o build de produção.
- `pnpm start` inicia o servidor de produção.
