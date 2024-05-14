from django.urls import path
from .views import *
from django.urls import path, include
from .views import code_snippets
# from .views import test_results_view



urlpatterns = [

    path('', home),
    path('api/', include('exercises.urls')),
    path('api/code-snippets/', code_snippets, name='code_snippets'),
    # path('api/test-results/', test_results_view, name='test-results')

]
