export default function($routeProvider) {
  'ngInject'
  $routeProvider

    .when(
      '/quadro-horario',
      { template: '<quadro-horario></quadro-horario>' }
    )
    .when(
      '/quadro-horario/dia/:diaSemana',
      { template: '<quadro-horario></quadro-horario>' }
    )

    .otherwise({ redirectTo: '/' });
}
