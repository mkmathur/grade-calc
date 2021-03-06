// Generated by CoffeeScript 1.7.1
(function() {
  var CalculatorViewModel, Category, Score;

  Score = (function() {
    function Score() {
      this.points = ko.observable(10);
      this.possible = ko.observable(10);
      this.value = ko.computed((function(_this) {
        return function() {
          return _this.points / _this.possible;
        };
      })(this));
      this.drop = ko.observable(false);
    }

    return Score;

  })();

  Category = (function() {
    function Category(name, weight, edit) {
      if (edit == null) {
        edit = false;
      }
      this.name = ko.observable(name);
      this.scores = ko.observableArray([new Score]);
      this.edit = ko.observable(edit);
      this.dropLowest = ko.observable(false);
      this.weight = ko.observable(weight);
      this.counted = ko.computed((function(_this) {
        return function() {
          var initial, min, score, sorted, _i, _len;
          if (!_this.dropLowest()) {
            return _this.scores();
          }
          sorted = _.sortBy(_this.scores(), function(score) {
            return score.value();
          });
          min = _.last(sorted);
          min.drop(true);
          initial = _.initial(sorted);
          for (_i = 0, _len = initial.length; _i < _len; _i++) {
            score = initial[_i];
            score.drop(false);
          }
          return initial;
        };
      })(this));
      this.percent = ko.computed((function(_this) {
        return function() {
          var arr, score, totalPoints, totalPossible, _i, _j, _len, _len1;
          arr = _this.counted();
          totalPoints = 0;
          totalPossible = 0;
          for (_i = 0, _len = arr.length; _i < _len; _i++) {
            score = arr[_i];
            totalPoints += Number(score.points());
          }
          for (_j = 0, _len1 = arr.length; _j < _len1; _j++) {
            score = arr[_j];
            totalPossible += Number(score.possible());
          }
          return totalPoints / totalPossible * 100;
        };
      })(this));
      this.add = (function(_this) {
        return function() {
          return _this.scores.push(new Score);
        };
      })(this);
      this.remove = (function(_this) {
        return function(score) {
          return _this.scores.remove(score);
        };
      })(this);
      this.view = ko.computed((function(_this) {
        return function() {
          return !_this.edit();
        };
      })(this));
      this.toggleEdit = (function(_this) {
        return function() {
          return _this.edit(!_this.edit());
        };
      })(this);
    }

    return Category;

  })();

  CalculatorViewModel = (function() {
    function CalculatorViewModel() {
      this.categories = ko.observableArray([new Category("Homework", 50), new Category("Quiz", 20), new Category("Exam", 30)]);
      this.add = (function(_this) {
        return function() {
          return _this.categories.push(new Category("New category", 0, true));
        };
      })(this);
      this.remove = (function(_this) {
        return function(cat) {
          return _this.categories.remove(cat);
        };
      })(this);
      this.grade = ko.computed((function(_this) {
        return function() {
          var cat, grade, _i, _len, _ref;
          grade = 0;
          _ref = _this.categories();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cat = _ref[_i];
            grade += Number(cat.weight() * cat.percent() / 100);
          }
          return grade;
        };
      })(this));
      this.totalWeight = ko.computed((function(_this) {
        return function() {
          var cat, total, _i, _len, _ref;
          total = 0;
          _ref = _this.categories();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cat = _ref[_i];
            total += Number(cat.weight());
          }
          return total;
        };
      })(this));
    }

    return CalculatorViewModel;

  })();

  ko.applyBindings(new CalculatorViewModel);

}).call(this);
