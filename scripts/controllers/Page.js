angular.module('appPage', [{
    name: "PageService",
    files: [
        "scripts/services/PageService.js",
    ]
}])
    .controller('PageCtrl', function ($scope, PageResource, $uiRouterGlobals) {
        $scope.Page = PageResource.get({id: $uiRouterGlobals.params.id});
    });