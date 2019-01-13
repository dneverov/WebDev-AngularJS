angular.module('notificationsApp', [])
  .controller('NotificationsCtrl', function ($scope, notificationsService, notificationsArchive) {

    $scope.addNotification = function () {
      notificationsService.push($scope.notification);
      $scope.notification = '';
    };

    $scope.getNotifications = function () {
      return notificationsService.getCurrent();
    };

    // Archived Notifications
    $scope.getArchivedNotifications = function () {
      return notificationsArchive.getArchived();
    };

  })
  .factory('notificationsService', function (notificationsArchive) {
    var MAX_LEN = 3;
    var notifications = [];

    return {
      push:function (notification) {
        var notificationToArchive;
        var newLen = notifications.unshift(notification);
        if (newLen > MAX_LEN) {
          notificationToArchive = notifications.pop();
          notificationsArchive.archive(notificationToArchive);
        }
      },
      getCurrent:function () {
        return notifications;
      }
    };
  })
  .factory('notificationsArchive', function () {
    var archivedNotifications = [];

    return {
      archive:function (notification) {
        archivedNotifications.unshift(notification);
      },
      getArchived:function () {
        return archivedNotifications;
      }};
  });