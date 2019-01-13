angular.module('notificationsApp', [])
  .controller('NotificationsCtrl', function($scope, notificationsService, notificationsArchive){

    $scope.addNotification = function(){
      notificationsService.push($scope.notification);
      $scope.notification = '';
    }

    $scope.getNotifications = function(){
      return notificationsService.getCurrent();
    }
  })

  .provider('notificationsService', function () {
    var config = {
      maxLen : 10
    };
    var notifications = [];
  
    return {
      setMaxLen : function(maxLen) {
        config.maxLen = maxLen || config.maxLen;
      },
      /*
        В первую очередь провайдер – это функция, которая должна вер-
        нуть объект, обладающий свойством $get . Свойство $get – это фаб-
        ричная функция, возвращающая экземпляр службы. Провайдеры
        можно считать объектами, встраивающими фабричные функции в
        свое свойство $get .
      */
      $get : function(notificationsArchive) {
        return {
          push : function (notification) {
            var notificationToArchive;
            var newLen = notifications.unshift(notification);
            if (newLen > config.maxLen) {
              notificationToArchive = notifications.pop();
              notificationsArchive.archive(notificationToArchive);
            }
          },
          getCurrent:function () {
            return notifications;
          }
        };
      }
    };
  })

  .config(function(notificationsServiceProvider){
    notificationsServiceProvider.setMaxLen(5);
  })

  .factory('notificationsArchive', function(){
    var archivedNotifications = [];

    return {
      archive : function(notification){
        archivedNotifications.pop(notification);
      },
      getArchived : function(){
        return archivedNotifications;
      }
    }
  });