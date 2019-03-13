angular.module('appPost', [{
    name: "PostService",
    files: [
        "scripts/services/PostService.js",
    ]
}, {
    name: "CategoryService",
    files: [
        "scripts/services/CategoryService.js",
    ]
}, {
    name: "AuthorService",
    files: [
        "scripts/services/AuthorService.js",
    ]
}])
    .controller('PostCtrl', function ($scope, PostResource, CategoryResource, AuthorResource, $uiRouterGlobals) {

        // Se toma el estado de conexion por defecto.
        $scope.offLine = !navigator.onLine;
        $scope.ready = false;
        params = $uiRouterGlobals.params;

        $scope.Author = AuthorResource.get({id: params.author});
        $scope.Categories = CategoryResource.query(100, 1);
        $scope.Post = PostResource.get({id: params.id});
        link = $uiRouterGlobals.params.link;
        $scope.disqusConfig = {
            disqus_shortname: 'tecnolikecuba',
            disqus_identifier: params.id + ' https://tecnolikecuba.com/?p=' + params.id,
            disqus_url: link
        };
        $scope.Post.$promise
            .then(function () {
                $scope.offLine = false; // Notificarle a la vista que ya se encuentra en linea.
                fecha = new Date($scope.Post.date);
                $scope.Post.date = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();
                jQuery('.tecno-contenido').remove();
                $scope.ready = true;
            })
            .catch(function (err) {
                $scope.offLine = true; // Notificarle a la vista que  se encuentra fuera de linea.
            });

    });