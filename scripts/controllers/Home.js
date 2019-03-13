angular.module('appHome', [{
    name: "HomeService",
    files: [
        "scripts/services/HomeService.js",
    ]
}, {
    name: "CategoryService",
    files: [
        "scripts/services/CategoryService.js",
    ]
}])
    .controller('HomeCtrl', function ($scope, HomeResource, CategoryResource) {
    	// Se toma el estado de conexion por defecto.
    	$scope.offLine = !navigator.onLine; 
        $scope.Categories = CategoryResource.query(100, 1);
        $scope.page = 0;
        $scope.per_page = 10;
        $scope.Posts = [];
        var loading = false;
        $scope.loadMore = function () {
            $scope.page++;
            more_posts = HomeResource.query($scope.per_page, $scope.page);
            console.log('Cargando la pagina ' + $scope.page + ' con un maximo de ' + $scope.per_page + ' elementos.');
            more_posts.$promise
                .then(function () {
                	$scope.offLine = false; // Notificarle a la vista que ya se encuentra en linea.
                    // TODO: Ocultar boton de cargar manualmente.
                    more_posts.forEach(function (value) {
                        value.excerpt.rendered = value.excerpt.rendered.split('<span class="read-more"><a href=')[0];
                        fecha = new Date(value.date);
                        value.date = fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear();

                        $scope.Posts.push(value);
                    });
                    loading = false;
                })
                .catch(function (err) {
                    //TODO: Agregar notificacion de error al cargar.
                    //TODO: Agregar boton para cargar manualmente al dar error.
                    $scope.offLine = true; // Notificarle a la vista que  se encuentra fuera de linea.
                    $scope.page--;
                    loading = false;
                });
        };

        $scope.loadMore();
        mdContent = jQuery('#md-content');
        uiView = jQuery('#ui-view');
        mdContent.scroll(function () {
            if (!loading && location.href.split(location.origin)[1] === "/#!/" && mdContent.scrollTop() >= uiView.height() - mdContent.height() - 1000) {
                loading = true;
                $scope.loadMore();
            }
        });
    });