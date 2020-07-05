const juros = require('./juros');

test('jurosSimples', () => {
  const C = 100;
  const i = 0.1;
  const t = 1;
  const jurosEsperados = 10;
  const jurosCalc = juros.jurosSimples(C, i, t);
  expect(jurosCalc).toBe(jurosEsperados);
});

test('montanteSimples', () => {
  const C = 100;
  const i = 0.1;
  const t = 1;
  const montanteEsperado = 110;
  const jurosSimples = jest.fn();
  jurosSimples.mockImplementation(() => 10);
  const montanteSimples = juros.pure.montanteSimples({ jurosSimples });
  const montante = montanteSimples(C, t, i);
  expect(jurosSimples.mock.calls[0]).toEqual([C, t, i]);
  expect(montante).toBe(montanteEsperado);
});

test('montanteJurosCompostos', () => {
  const C = 1000;
  const i = 0.1;
  const t = 1;
  const montanteEsperado = 1100;
  const jurosCalc = juros.montanteJurosCompostos(C, i, t);
  expect(jurosCalc).toBe(montanteEsperado);
});

test('jurosCompostos', () => {
  const C = 1000;
  const i = 0.1;
  const t = 1;
  const jurosEsperados = 100;
  const montanteJurosCompostos = jest.fn();
  montanteJurosCompostos.mockImplementation(() => 1100);

  const jurosCompostos = juros.pure.jurosCompostos({ montanteJurosCompostos });
  const jurosCalc = jurosCompostos(C, i, t);

  expect(montanteJurosCompostos.mock.calls[0]).toEqual([C, i, t]);
  expect(jurosCalc).toBe(jurosEsperados);
});
