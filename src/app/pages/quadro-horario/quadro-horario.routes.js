export default function($routeProvider) {
  'ngInject'
  $routeProvider

    .when(
      '/quadro-horario',
      { template: '<quadro-horario></quadro-horario>' }
    )
    .when(
      '/quadro-horario/:diaSemana',
      { template: '<quadro-horario></quadro-horario>' }
    )
    .when(
      '/quadro-horario-painel',
      { template: '<quadro-horario-painel></quadro-horario-painel>' }
    )

    .otherwise({ redirectTo: '/' });
}
