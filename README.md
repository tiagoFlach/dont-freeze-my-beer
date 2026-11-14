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

## Cálculo de temperatura

O cálculo usa a [Lei do Resfriamento de Newton (OpenStax, em inglês)](https://openstax.org/books/calculus-volume-2/pages/4-3-separable-equations#fs-id1170571198014):

$$
T(t) = T_s + (T_0 - T_s) \cdot e^{-k t}
$$

Onde:

- $T_s$ é a temperatura ambiente do método (geladeira, freezer ou congelador).
- $T_0$ é a temperatura inicial da bebida.
- $t$ é o tempo em minutos.
- $k$ é a constante de resfriamento efetiva, em min⁻¹.

Os três métodos usam o mesmo cálculo de $k$, variando apenas a temperatura ambiente. A taxa e a variação com o tamanho partem de um [experimento da SINTEF](https://blog.sintef.com/energy/efficient-way-to-cool-a-drink/): água a 21°C chegou a 5°C em aproximadamente 60 minutos numa lata de 330 ml e 90 minutos numa garrafa plástica de 1,5 L, em um freezer a -20°C. O aplicativo supõe 4°C na geladeira, -6°C no congelador e -18°C no freezer:

$$
k = k_{\text{ref}} \frac{k_{\text{bebida}}}{k_{\text{cerveja}}} \frac{m_{\text{material}}}{m_{\text{alumínio}}} \left(\frac{330}{V}\right)^{\alpha} c
$$

Aqui, $V$ é o volume em ml, $k_{\text{ref}} = \ln(41/25)/60 \approx 0{,}008245$ min⁻¹ e $\alpha \approx 0{,}234$ foi ajustado aos dois recipientes e aos fatores de material adotados: 1 para alumínio e 0,95 para vidro e plástico. Esses fatores de material são hipóteses, pois os dois testes não isolam o efeito do material; os fatores de bebida também são aproximações.

O fator comum $c \approx 2{,}74692$ ajusta a estimativa à referência prática indicada de 30 minutos para uma lata de alumínio de 350 ml, de 25°C a 4°C no freezer. Essa duração foi informada sem medição com termômetro: atingir 4°C nesse prazo é uma hipótese, não uma medição adicional da SINTEF. Para esse recipiente e bebida, $k \approx 0{,}0223386$ min⁻¹ em todos os métodos, o dobro da taxa anterior; os tempos estimados caem pela metade. O cálculo não reproduz exatamente os tempos do experimento. As estimativas para geladeira e congelador são extrapolações não validadas dessa referência.

O modelo supõe temperatura ambiente constante e temperatura uniforme na bebida. Os tempos não são calibrados para sua bebida ou equipamento e podem variar bastante. A bebida pode congelar antes da estimativa de 0°C: confira-a regularmente e não use esse tempo como limite seguro.

Na página, as equações são renderizadas em notação matemática com MathML nativo do navegador. O cálculo de $k$ mostra os fatores e o resultado para as opções selecionadas.

O tempo para atingir uma temperatura alvo é calculado isolando $t$ na equação:

$$
t = -\frac{\ln\left(\frac{T - T_s}{T_0 - T_s}\right)}{k}
$$

Se a bebida já estiver na temperatura alvo ou abaixo dela, o tempo de resfriamento adicional é zero. Caso contrário, se a temperatura alvo for menor ou igual a $T_s$, o modelo não a atinge em tempo finito.

Na geladeira, a referência prática mostrada é 4,5°C, acima da temperatura ambiente assumida. Quando o alvo não é atingível, o gráfico abrange o tempo estimado para essa referência.

O alerta de congelamento usa 0°C como referência. O ponto de congelamento real varia conforme a composição da bebida.

## Scripts

- `pnpm dev` inicia o servidor de desenvolvimento.
- `pnpm build` gera o build de produção.
- `pnpm start` inicia o servidor de produção.
- `pnpm test` executa os testes do modelo de resfriamento.
