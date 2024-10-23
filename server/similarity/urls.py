from django.urls import path
from .views import SimilarProductsView

app_name = 'similarity'

urlpatterns = [
    path('similar-products/', SimilarProductsView.as_view(), name='similar-products'),
]
