import 'angular-material/angular-material.min.css';
import 'normalize.css';

import angular from 'angular';
import angularMaterial from 'angular-material';
import angularAnimate from 'angular-animate';
import angularResource from 'angular-resource';
import angularMaterialIcons from 'angular-material-icons';

import app from './components/app/app.component';
import components from './components/components';
import services from './services/services';

angular.module('app', [
  angularMaterial,
  angularAnimate,
  angularResource,
  angularMaterialIcons,

  components.name,
  services.name
])
.component('app', app);

angular.bootstrap(document.body, ['app'])
