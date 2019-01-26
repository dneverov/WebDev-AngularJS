var ArchiveService = function(){
  this.archivedNotifications =[];
}

ArchiveService.prototype.archive = function(notification){
  this.archivedNotifications.push(notification);
}

ArchiveService.prototype.getArchived = function(){
  return this.archivedNotifications;
}