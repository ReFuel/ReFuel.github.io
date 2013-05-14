var app;
Refuel.define('DemoApp',{require: ['GenericModule', 'DataSource']},
function DemoApp() {    
	app = Refuel.newModule('GenericModule', { 
		root: document.querySelector('#example-app'), 
		autoload: true,
		data: {
			'app_title' : 'Refuel Example',
			'items': Refuel.newModule('DataSource', {key: 'items-refuel', defaultDataType: 'Array'})
		} 
	});
	
	app.defineAction('add', function(e) {
        var textContent = e.target.value.trim();
        if (e.keyIdentifier === 'Enter' && textContent !== '') {
        	e.module.add({ title: textContent});
            e.target.value = '';
			e.target.blur();
            app.saveData();
        }
    });

    app.defineAction('delete', function(e) {
        app.getModule('items').remove(e.module);
        app.saveData();
    });

}); 
