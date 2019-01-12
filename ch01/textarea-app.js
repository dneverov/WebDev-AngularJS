 var TextAreaWithLimitCtrl = function($scope){
  var MAX_LEN = 25;
  var WARN_THRESHOLD = 10;

  $scope.message = '';
  
  $scope.remaining = function () {
    return MAX_LEN - $scope.message.length;
  };
  $scope.shouldWarn = function () {
    return $scope.remaining() < WARN_THRESHOLD;
  };
};