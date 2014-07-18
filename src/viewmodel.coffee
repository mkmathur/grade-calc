class Score
	constructor: ->
		@points = ko.observable 10
		@possible = ko.observable 10
		@value = ko.computed =>
			@points / @possible
		@drop = ko.observable false

class Category
	constructor: (name, weight, edit=false) ->
		@name = ko.observable name
		@scores = ko.observableArray [new Score]
		@edit = ko.observable edit
		@dropLowest = ko.observable false
		@weight = ko.observable weight

		@counted = ko.computed =>
			return @scores() unless @dropLowest()
			sorted = _.sortBy(@scores(), (score) -> score.value())
			min = _.last(sorted)
			min.drop(true)
			initial = _.initial(sorted)
			score.drop(false) for score in initial
			initial
		@percent = ko.computed =>
			arr = @counted()
			totalPoints = 0
			totalPossible = 0
			totalPoints += Number score.points() for score in arr
			totalPossible += Number score.possible() for score in arr 
			totalPoints / totalPossible * 100
		@add = => 
			@scores.push new Score
		@remove = (score) => 
			@scores.remove score
		@view = ko.computed => 
			!@edit()
		@toggleEdit = =>
			@edit !@edit()

class CalculatorViewModel
	constructor: ->
		@categories = ko.observableArray [new Category("Homework", 50)
							new Category("Quiz", 20)
							new Category("Exam", 30)]
		@add = =>
			@categories.push new Category("New category", 0, true)
		@remove = (cat) =>
			@categories.remove cat
		@grade = ko.computed =>
			grade = 0
			for cat in @categories()
				grade += cat.weight() * cat.percent() / 100
			grade
		@totalWeight = ko.computed =>
			total = 0
			for cat in @categories()
				total += cat.weight()
			total

ko.applyBindings new CalculatorViewModel