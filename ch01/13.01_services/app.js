angular.module('notificationsApp', [])
  .controller('NotificationsCtrl', function($scope, NotificationsService, ArchiveService){
    $scope.addNotification = function () {
      NotificationsService.push($scope.notification);
      $scope.notification = '';
    };

    $scope.getNotifications = function () {
      return NotificationsService.getCurrent();
    };

    $scope.getArchivedNotifications = function () {
      return ArchiveService.getArchived();
    };
  })

  .service('ArchiveService', ArchiveService)
  .service('NotificationsService', NotificationsService)
