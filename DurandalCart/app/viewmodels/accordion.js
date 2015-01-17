define(
    ['plugins/http', 'durandal/app', 'knockout'], 
    function (http, app, ko) {
        return {
            title: 'Accordion',
            projects: ko.observableArray([]),
            activate: function () {
                this.projects.push({ name: 'Project 1', description: "Description 1" });
                this.projects.push({ name: 'Project 2', description: "Description 2" });
                this.projects.push({ name: 'Project 3', description: "Description 3" });
            },
            add: function () {
                app.trigger('accordion:add', { name: 'New Project', description: "New Description" });
            }
        };
    });