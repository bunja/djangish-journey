from django.shortcuts import render
from django.http import HttpResponse

projectsList = [
    {
        'id': '1',
        'title': "Ecommerce Website",
        'description': 'Fully functional ecommerce website'
    },
    {
        'id': '2',
        'title': "Portfolio Website",
        'description': 'This was the project where I built my own portfolio'
    },
    {
        'id': '3',
        'title': "Social Network",
        'description': 'Open Source Project'
    },
]

def projects(request):
    page = "progect's"
    number = 11
    context = {'page': page, 'number': number, 'projects': projectsList}
    return render(request, 'projects/projects.html', context )

def project(request, pk):
    projectObj = None 
    for i in projectsList:
        if i['id'] == pk:
            projectObj = i
    return render(request, 'projects/project.html', {'project': projectObj})
