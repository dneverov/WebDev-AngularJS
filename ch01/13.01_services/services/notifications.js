var NotificationsService = function(ArchiveService){
  this.MAX_LEN = 3;
  this.Archive = ArchiveService;
  this.notifications = [];
}

NotificationsService.prototype.push = function(notification){
  var notificationToArchive;
  var newLen = this.notifications.unshift(notification);
  if (newLen > this.MAX_LEN){
    notificationToArchive = this.notifications.pop();
    this.Archive.archive(notificationToArchive);
  }
}

NotificationsService.prototype.getCurrent = function(){
  return this.notifications;
}