from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet

app_name = 'products'

router = DefaultRouter()
router.register(r"catergories", CategoryViewSet, basename='category')
router.register(r"products", ProductViewSet, basename='product')

urlpatterns = router.urls
