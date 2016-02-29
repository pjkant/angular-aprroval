var app = angular.module("pendingApprovals", []);

var approvalController = function ($scope, $http) {
    

    $scope.denyApproval = function (aprroval) {
        aprroval.authorize = "N";
    }

    $scope.grantApproval = function (aprroval) {
        aprroval.authorize = "Y";
    }
    
    $scope.sortColumn = "customerId";
    $scope.reverseSort = "false";
    
    
    // flipping the on and off sort switch
    $scope.columnToSort = function(columnName){
        $scope.reverseSort = ($scope.sortColumn == columnName) ? !$scope.reverseSort : false;
        $scope.sortColumn = columnName;
    }
        
    $scope.sortClass = function(columnName){
        if($scope.sortColumn == columnName) {
          return  $scope.reverseSort ? 'glyphicon glyphicon-arrow-down' : 'glyphicon glyphicon-arrow-up';
    }
        else {
        return "";
    }
    }

    $scope.loadData = function () {
        $http({
            method: 'GET',
            url: 'http://10.1.193.104:8080/user/loadApprovals',
            params: 'limit=10, sort_by=created:desc',
            headers: {
                //'Authorization': 'Token token=xxxxYYYYZzzz'
                    'Content-Type': 'application/json'
            }
        }).success(function (data) {
            $scope.approvalList = data;
        }).catch(function (data,status) {
            alert("error");
        });

    }

    $scope.sendData = function () {

        $http({
                method: 'POST',
                data: $scope.approvalList, //forms user object
                //url: 'http://10.1.198.89:8080/user/post',
                url: 'http://10.1.193.104:8080/user/post',
                headers: {
                    'Content-Type': 'application/json'
                }

            })
            .success(function (data, status) {
                if (data.errors) {
                    // Showing errors.
                    $scope.errorName = data.errors.name;
                    $scope.errorUserName = data.errors.username;
                    $scope.errorEmail = data.errors.email;
                } else {
                    $scope.successCode = data.errorCode;
                    $scope.message = data.message;
                }
            })
            .catch(function (data, status, headers, config) {
                $scope.errorName = data.errorCode;
                $scope.message = data.message;
            });

    }
};

app.controller("approvalController", approvalController);