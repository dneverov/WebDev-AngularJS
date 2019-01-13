angular.module('notificationsApp', [])
  .controller('NotificationsCtrl', function ($scope, notificationsService) {

    $scope.addNotification = function () {
      notificationsService.push($scope.notification);
      $scope.notification = '';
    };

    $scope.getNotifications = function () {
      return notificationsService.getCurrent();
    };

  })
  .factory('notificationsService', function (notificationsArchive) {
    var MAX_LEN = 3;
    var notifications = [];
    this.notificationsArchive = notificationsArchive;

    return {
      push:function (notification) {
        var notificationToArchive;
        var newLen = notifications.unshift(notification);
        if (newLen > MAX_LEN) {
          notificationToArchive = notifications.pop();
          this.notificationsArchive.archive(notificationToArchive);
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
        archivedNotifications.push(notification);
      },
      getArchived:function () {
        return archivedNotifications;
      }};
  });