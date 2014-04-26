(function(slidr){
	slidr.create('slides-container',{
		  after: function(e) { console.log('in: ' + e.in.slidr); },
		  before: function(e) { console.log('out: ' + e.out.slidr); },
		  breadcrumbs: true,
		  controls: 'none',
		  direction: 'horizontal',
		  fade: false,
		  keyboard: true,
		  overflow: true,
		  theme: '#222',
		  timing: { 'fade': '0.5s ease-in' },
		  touch: true,
		  transition: 'fade'
	}).auto()

})(window.slidr)