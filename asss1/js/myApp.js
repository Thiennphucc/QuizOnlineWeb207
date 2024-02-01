var app = angular.module('myApp', ['ngRoute']);

app.run(function ($rootScope, $http) {
    $http.get("db/Subjects.js").then(function (response) {
        $rootScope.subjects = response.data; //dùng cho các chỗ cần thay đổi
      });
      $http.get("db/Students.js").then(function(response) {
        $rootScope.students = response.data;
    });

});

app.config(function ($routeProvider) {
    $routeProvider

        .when('/index', {
            templateUrl: 'layout/index.html',
            
        })
        .when('/login', {
            templateUrl: 'layout/login.html',
            controller: 'LoginController'
        })
        .when('/CreateUser', {
            templateUrl: 'layout/CreateUser.html',
            controller: 'CreateUserController'
        })
        .when('/forgotpassword', {
            templateUrl: 'layout/forgotpassword.html',
            controller: 'FogotPassword'
        })
        .when('/ChangePass', {
          templateUrl: 'layout/ChangePass.html',
          controller: 'ChangePass'
      })
        .when('/AboutUs', {
            templateUrl: 'layout/AboutUs.html',
            controller: 'View1Controller'
        })
        .when('/Contact', {
            templateUrl: 'layout/Contact.html',
            controller: 'View1Controller'
        })
        .when('/Feedback', {
            templateUrl: 'layout/Feedback.html',
            controller: 'View1Controller'
        })
        .when('/Category', {
            templateUrl: 'layout/Category.html',
            controller: 'CategoryController'
        })
        .otherwise({ redirectTo: '/index' });

});
app.directive('rePass', function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, mCtrl) {
        function rePas(value) {
          var pass = scope.studentR.password;
          if (pass == value) {
            mCtrl.$setValidity('charE', true);
          } else {
            mCtrl.$setValidity('charE', false);
          }
          return value;
        }
        mCtrl.$parsers.push(rePas);
      }
    }
  });

  app.directive('checkOldPassword', function ($rootScope) {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        ngModelCtrl.$validators.customValidation = function (modelValue, viewValue) {
          // Kiểm tra xem $rootScope.student có tồn tại và có thuộc tính 'password' không
          if ($rootScope.student && angular.isDefined($rootScope.student.password)) {
            // Kiểm tra xem giá trị mật khẩu cũ có khớp với giá trị trong $rootScope.student không
            var isValid = modelValue === $rootScope.student.password;
  
            // Cập nhật trạng thái validation
            ngModelCtrl.$setValidity('customValidation', isValid);
            return isValid;
          } else {
            // Nếu không có student hoặc không có thuộc tính 'password', coi như không hợp lệ
            ngModelCtrl.$setValidity('customValidation', false);
            return false;
          }
        };
      }
    };
  });