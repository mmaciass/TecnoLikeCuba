angular.module('appAbout', [])
    .controller('AboutCtrl', function ($scope) {
        $scope.author = {};
        $scope.author.name = 'Marcos Macias Sánchez';
        $scope.author.email = 'mmaciass940412@gmail.com';
    });